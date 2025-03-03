require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const UserModel = require("./models/UserModel");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const morgan = require("morgan");
const sellDeviceModel = require("./models/SellDevice");
const rentDeviceModel = require("./models/RentDevice");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const RazorpayClient = require("./razorpay");
const JWT_TOKEN = process.env.JWT_TOKEN;
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const repairModel = require("./models/Repair");
const technician = require("./models/Technician");
const giveDevice = require("./models/GiveDevice");
const productModel = require("./models/ProductModel");
const vectorSearch = require("./utils/vectorsearch");
const dbInitializer = require("./init/db");

sgMail.setApiKey(process.env.SG_KEY);

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};

connectDb()
  .then(async () => {
    console.log("Mongo DB connected!");
    await dbInitializer();
  })
  .catch((e) => {
    console.log(`error: ${e}`);
  });

const app = express();

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (error) => {
  console.log("Error in Mongo Session store", error);
});

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
  expressSession({
    secret: process.env.SECRET,
    cookie: {
      expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.get("/products/vectorSearch", async (req, res) => {
  const { q } = req.query;
  if (!q) throw new Error("No params found");

  const products = await vectorSearch(q);

  return res.json({ products });
});

app.get("/", (req, res) => {
  res.send("Server is working fine");
});

app.post("/signup", async (req, res) => {
  let { email, username, password, address } = req.body;
  email = email.toLowerCase();

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res.json({
      msg: "User already Exists, Kindly Log In",
      sucess: false,
    });
  }

  const newUser = new UserModel({ email, username, password, address });
  await newUser.save();

  return res.json({
    msg: "Successfully Registered",
    success: true,
  });
});

app.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req["body"];
  if (!emailOrUsername || !password) {
    return res.json({ msg: "Credentials not Provided" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const user = emailRegex.test(emailOrUsername)
    ? await UserModel.findOne({ email: emailOrUsername })
    : await UserModel.findOne({ username: emailOrUsername });

  if (!user) {
    return res.json({
      msg: "User doesn't exists",
      success: false,
    });
  }

  const isSamePassword = await bcrypt.compare(password, user.password);

  if (isSamePassword) {
    const token = jwt.sign({ id: user._id }, JWT_TOKEN, { expiresIn: "1d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
  }

  isSamePassword
    ? res.json({
        msg: "Logged In Successfully",
        success: true,
      })
    : res.json({
        msg: "Incorrect Password",
        success: false,
      });
});

app.get("/user", async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.json({ msg: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    const user = await UserModel.findById(decoded.id);

    if (!user) return res.json({ error: "User not found" });
    return res.json({
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (e) {
    console.error(e);
    return res.json({ error: "Invalid token" });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  return res.json({ product });
});

app.post("/updateUser", async (req, res) => {
  try {
    const user = req.body;
    const response = await UserModel.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          email: user.email,
          username: user.username,
          phoneNumber: user.phone,
          address: user.address,
        },
      },
      { upsert: true }
    );

    return res.json(response);
  } catch (e) {
    return res.json({ msg: "error", success: false });
  }
});

app.post("/product/update", async (req, res) => {
  const { product } = req.body;
  const updatedProduct = await productModel.findByIdAndUpdate(
    { _id: product._id },
    product
  );
  return;
});

app.get("/products", async (req, res) => {
  const products = await productModel.find({});
  return res.json({
    products
  });
});

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  return res.json({ product });
});

app.post("/sell/device", async (req, res) => {
  const { deviceType, brand, model, condition, description, askingPrice } =
    req.body;

  if (
    !deviceType ||
    !brand ||
    !model ||
    !condition ||
    !description ||
    !askingPrice
  ) {
    return res.json({
      msg: "Incomplete Credentials",
      success: false,
    });
  }
  const newSellDevice = new sellDeviceModel({
    deviceType,
    brand,
    model,
    condition,
    description,
    askingPrice,
  });

  await newSellDevice.save();

  return res.json({
    msg: "Device is queued for examination",
    success: true,
  });
});

app.post("/rent/device", async (req, res) => {
  const {
    deviceName,
    deviceType,
    deviceDescription,
    dailyRate,
    location,
    availableFrom,
    availableTo,
  } = req.body;

  if (
    !deviceName ||
    !deviceType ||
    deviceDescription ||
    dailyRate ||
    location ||
    availableFrom ||
    availableTo
  ) {
    return res.json({
      msg: "Incomplete Credentials",
      success: false,
    });
  }
  const newRentDevice = new rentDeviceModel({
    deviceName,
    deviceType,
    deviceDescription,
    dailyRate,
    location,
    availableFrom,
    availableTo,
  });

  await newRentDevice.save();

  return res.json({
    msg: "Your device has been successfully listed for rent. We'll notify you as soon as someone is interested in renting your device. ",
    success: true,
  });
});

app.post("/logout", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ msg: "Unauthorized Session", success: false });
  const { user } = req.body;
  let user2 = await UserModel.findOne({ username: user.username });
  if (!user2) return res.json({ msg: "Unable to find User", success: false });
  res.clearCookie("token");
  return res.json({ msg: "Logged Out Successfully", success: true });
});

app.post("/contact", async (req, res) => {
  const { firstName, lastName, message, email, subject } = req.body;

  if (!firstName || !lastName || !message || !email || !subject) {
    return res.json({ msg: "Provide each of the Data", success: false });
  }

  const msg2 = {
    to: `${process.env.MAIL_SENDER}`,
    from: `${process.env.MAIL_SENDER}`,
    subject: "Query from Customer on EcoGadget",
    text: `You have got query from ${firstName} -->
    ${message}. Answer their query on ${email}`,
  };

  await sgMail.send(msg2).catch(() => {});

  const msg = {
    to: email, // Replace with recipient's email address
    from: `${process.env.MAIL_SENDER}`, // Replace with your verified sender email
    subject: "We’ve Received Your Message – We’ll Be in Touch Soon!",
    text: `Hi ${firstName} ${lastName},

Thank you for reaching out to us! We have received your message and appreciate you taking the time to contact us.

Our team is currently reviewing your request, and we will get back to you as soon as possible. If your inquiry is urgent, feel free to reply to this email, and we will prioritize your request accordingly.

In the meantime, if you have any additional details to share, please don't hesitate to let us know.

Best regards,
EcoGadget`,

    html: `
      <p>Hi ${firstName} ${lastName},</p>
      <p>Thank you for reaching out to us! We have received your message and appreciate you taking the time to contact us.</p>
      <p>Our team is currently reviewing your request, and we will get back to you as soon as possible. If your inquiry is urgent, feel free to reply to this email, and we will prioritize your request accordingly.</p>
      <p>In the meantime, if you have any additional details to share, please don't hesitate to let us know.</p>
      <p>Best regards,<br><strong>EcoGadget</strong></p>
    `,
  };

  await sgMail.send(msg).catch(() => {});

  return res.json({ msg: "Received Your Message", success: true });
});

app.post("/orders/create", async (req, res) => {
  const { amount, currency } = req.body;

  const response = await RazorpayClient.orders.create({
    amount,
    currency,
  });

  /*
    {
     key : 'process.env.key'
    }
   */

  response.key = process.env.RAZORPAY_KEY_ID;

  return res.json(response);
});

app.get("/sell", async (req, res) => {
  const products = await sellDeviceModel.find();

  return res.json({ products });
});

app.post("/sell", async (req, res) => {
  const { deviceType, brand, model, condition, description, askingPrice } =
    req.body;

  if (
    !deviceType ||
    !brand ||
    !model ||
    !condition ||
    !description ||
    !askingPrice
  ) {
    return res.json({ msg: "Invalid crendentials", success: false });
  }

  await sellDeviceModel.create(req.body);

  return res.json({ msg: "We'll reach out to you soon...", success: true });
});

app.post("/repair", async (req, res) => {
  const repair = req.body;

  await repairModel.create(repair);

  return res.json({
    msg: "Our technicians will reach to you out soon!",
    success: true,
  });
});

app.post("/repair/technician", async (req, res) => {
  const tech = req.body;

  const email = tech.email;

  const existingUser = await technician.findOne({ email });
  if (existingUser) {
    return res.json({
      msg: "This mail is already registered with Us!",
      success: false,
    });
  }

  await technician.create(tech);

  return res.json({
    msg: "We are reviewing your application...",
    success: true,
  });
});

app.get("/rent/devices", async (req, res) => {
  const devices = await giveDevice.find({});

  if (!devices.length)
    return res.json({
      data: null,
    });
  return res.json({ devices });
});

app.get("/rent/devices/:deviceId", async (req, res) => {
  const { deviceId } = req.params;
  const device = await giveDevice.findById(deviceId);

  if (!device) return res.json({ device: null });

  return res.json({ device });
});

app.post("/borrow/give", async (req, res) => {
  const device = req.body;

  const mod = await giveDevice.create(device);

  return res.json({
    msg: "Your device has been successfully listed.",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log("Server is Listening to the PORT:", PORT);
});

process.on("unhandledRejection", (e) => {
  console.log(e);
});
