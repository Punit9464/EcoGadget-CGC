const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const textEmbeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

module.exports = textEmbeddingModel;