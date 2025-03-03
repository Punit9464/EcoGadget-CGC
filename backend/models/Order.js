const { model } = require("mongoose");
const orderSchema = require("../schemas/orderSchema");

const OrderModel = new model("order", orderSchema);

module.exports = OrderModel;