const { Schema } = require("mongoose");

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: false
    },
    razorpaySignature: {
        type: String,
        required: true,
    },
    isDelivered: {
        type: Boolean,
        required: false,
        default: false,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
});

module.exports = orderSchema;