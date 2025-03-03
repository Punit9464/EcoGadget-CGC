const { Types, Schema } = require("mongoose");

const sellDeviceSchema = new Schema({
    deviceType: {
        type: String,
        enum: ["smartphone", "laptop", "tablet", "desktop", "other"],
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ["like-new", "excellent", "good", "fair", "poor"],
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    askingPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'refurbish', 'recycle'],
        default: 'pending'
    }
});

module.exports = sellDeviceSchema;