const { model } = require("mongoose");

const sellDeviceSchema = require('../schemas/SellDevice');

const sellDeviceModel = model("selldevice", sellDeviceSchema);

module.exports = sellDeviceModel;

