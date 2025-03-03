const { Schema } = require("mongoose");

const giveDeviceSchema = new Schema({
    deviceName: {
        type: String,
        required: true,
    },
    description: String,
    deviceType: String,
    dailyRate: String,
    location: String,
    availableFrom : String,
    availableTo: String,
    termsAgreed: Boolean,
    deviceImages: Array
});

module.exports = giveDeviceSchema;