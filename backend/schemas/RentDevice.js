const { Types, Schema } = require("mongoose");

const RentDeviceSchema = new Schema({
    deviceName: {
        type : String
    },
    deviceType: {
        type: String,
        enum: ["smartphone", "laptop", "tablet", "desktop", "camera", "other"],
        required: true,
    },
    deviceDescription:{
        type: String,
        required : true
    },
    dailyRate: {
        type: Number,
        required: true,
    },
    location:{
        type : String,
        required : true
    },
    availableFrom : {
        type : Date,
        required : true
    },
    availableTo : {
        type : Date,
        required : true
    }
});


module.exports = RentDeviceSchema;