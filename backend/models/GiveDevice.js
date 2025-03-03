const { model } = require("mongoose");
const giveDeviceSchema = require("../schemas/giveDeviceSchema");

const giveDevice = new model("givedevice", giveDeviceSchema);

module.exports = giveDevice;