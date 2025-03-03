const productModel = require('../models/ProductModel');
const getEmbedding = require("./getEmbedding");

async function vectorSearch(q) {
    const embedding = await getEmbedding(q);
    const pipeline = require('./pipeline');
    return await productModel.aggregate(pipeline(embedding));
}

module.exports = vectorSearch;