const model = require('./textEmbeddingModel');

async function getEmbedding(content) {
    const embedding = await model.embedContent(content);
    return embedding.embedding.values;
}

module.exports = getEmbedding;