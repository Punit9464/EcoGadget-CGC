const { model } = require("mongoose");
const productSchema = require("../schemas/productsSchema");

const productModel = new model("product", productSchema);

module.exports = productModel;