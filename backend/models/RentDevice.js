const { model } = require("mongoose");

const rentDeviceSchema = require('../schemas/RentDevice');

const rentDeviceModel = model("rentdevice", rentDeviceSchema);

module.exports = rentDeviceModel;

