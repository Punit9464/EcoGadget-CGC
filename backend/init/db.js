require("dotenv").config();

const mongoose = require("mongoose");
const productModel = require("../models/ProductModel");
const sellDeviceModel = require("../models/SellDevice.js");
const model = require("../utils/textEmbeddingModel.js");
const getEmbedding = require("../utils/getEmbedding.js");
const giveDevice = require("../models/GiveDevice.js");

const sampleSellDeviceData = [
  {
    deviceType: "smartphone",
    brand: "Apple",
    model: "iPhone 13 Pro",
    condition: "excellent",
    description:
      "iPhone 13 Pro with 256GB storage. Minor scratches on the back but screen is perfect. Comes with original charger and box.",
    askingPrice: 649.99,
    status: "pending",
  },
  {
    deviceType: "laptop",
    brand: "Dell",
    model: "XPS 15",
    condition: "good",
    description:
      "2022 Dell XPS 15 with Intel i7, 16GB RAM, 512GB SSD. Has some wear on the keyboard but fully functional. Battery holds about 80% of original capacity.",
    askingPrice: 899.0,
    status: "refurbish",
  },
  {
    deviceType: "tablet",
    brand: "Samsung",
    model: "Galaxy Tab S7+",
    condition: "like-new",
    description:
      "Samsung Galaxy Tab S7+ 128GB WiFi model. Used for only 2 months, in perfect condition with no scratches. Includes S Pen and protective case.",
    askingPrice: 529.99,
    status: "pending",
  },
  {
    deviceType: "desktop",
    brand: "HP",
    model: "Pavilion Gaming Desktop",
    condition: "fair",
    description:
      "HP Gaming Desktop with AMD Ryzen 5, NVIDIA GTX 1660, 8GB RAM, 1TB HDD. Has some cosmetic damage on the case and missing one USB port cover.",
    askingPrice: 459.5,
    status: "refurbish",
  },
  {
    deviceType: "other",
    brand: "Sony",
    model: "PlayStation 5",
    condition: "poor",
    description:
      "PS5 Disc Edition with controller. Has significant cosmetic damage and the disc drive makes noise during operation, but games run fine. Selling as-is.",
    askingPrice: 199.99,
    status: "recycle",
  },
];

const sampleGiveDeviceData = [
  {
    deviceName: "Laptop",
    description: "This is an old hp laptop",
    deviceType: "laptop",
    dailyRate: "130",
    location: "Chandigarh",
    availableFrom: "2025-02-12",
    availableTo: "2025-02-03",
    termsAgreed: true,
    deviceImages: [ ]
  },
  {
    deviceName: "Laptop",
    description: "An old hp laptop",
    deviceType: "laptop",
    dailyRate: "140",
    location: "Chandigarh",
    availableFrom: "2025-02-05",
    availableTo: "2025-02-11",
    termsAgreed: true,
    deviceImages: []
  },
  {
    deviceName: "I Phone",
    description: "Hey this is a old device i phone from apple",
    deviceType: "smartphone",
    dailyRate: "900",
    location: "Chandigarh",
    availableFrom: "2025-02-11",
    availableTo: "2026-02-01",
    termsAgreed: true,
    deviceImages: []
  },
  {
    deviceName: "DSLR",
    description: "good quality",
    deviceType: "camera",
    dailyRate: "1500",
    location: "rohtak",
    availableFrom: "2025-02-26",
    availableTo: "2025-02-27",
    termsAgreed: true,
    deviceImages: []
  },
  {
    deviceName: "PS5",
    description: "A game station",
    deviceType: "laptop",
    dailyRate: "5000",
   location: "Chandigarh",
    availableFrom: "2025-03-19",
    availableTo: "2025-03-21",
    termsAgreed: true,
    deviceImages: [ ]
  }
];


const addProducts = async (data, sampleSellDeviceData, sampleGiveData) => {
  await productModel.deleteMany({});
  await sellDeviceModel.deleteMany({});
  await giveDevice.deleteMany({});

  await productModel.insertMany(data);

  await sellDeviceModel.insertMany(sampleSellDeviceData);

  await giveDevice.insertMany(sampleGiveData);

  console.log("Sample data added");
};

const addEmbeddings = async () => {
  const data = await productModel.find({});
  data.forEach(async (d, idx) => {
    const embedding = await getEmbedding(d.productName + "\n" + d.description + "\n" + d.price);
    const id = d._id;

    await productModel.updateOne(
      { _id: id },
      {
        $set: {
          embedding,
        },
      },
      { upsert: true }
    );
  });

  console.log("Embeddings are added");
};

async function createVectorSearchIndex() {
  const model = {
    name: "vector_index",
    type: "vectorSearch",
    definition: {
      fields: [
        {
          type: "vector",
          path: "embedding",
          numDimensions: 768,
          similarity: "cosine",
        },
      ],
    },
  };

  await productModel.createSearchIndex(model);
}

let vectorSearchIndex = async () => {
  await createVectorSearchIndex();
  console.log("Vector Search Index created");
};

async function performVectorSearch(userQuery, filter = {}) {
  let embedding = await getEmbedding(userQuery);

  const pipeline = [
    {
      $vectorSearch: {
        index: "vector_index",
        queryVector: embedding,
        path: "embedding",
        numCandidates: 50,
        filter: filter,
        limit: 5,
      },
    },
    {
      $project: {
        productName: 1,
        productType: 1,
        price: 1,
        condition: 1,
        warranty: 1,
        rating: 1,
        description: 1,
      },
    },
  ];

  return await productModel.aggregate(pipeline);
}

async function dbInitializer() {
  const arrData = require("./data.js");
  await addProducts(arrData, sampleSellDeviceData, sampleGiveDeviceData);
  await addEmbeddings();
  await vectorSearchIndex().then(() => {
    console.log("Vector Index Added");
  }).catch((e) => {
    if(e.code === 68) {
      console.log("Index already exists");
    } else {
      console.error(e);
    }
  });

  console.log("Database has been initialized");
}

module.exports = dbInitializer;