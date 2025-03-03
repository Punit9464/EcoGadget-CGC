const { model } = require("mongoose");
const repairSchema = require("../schemas/repairSchema");

const repairModel = new model("repair", repairSchema);

module.exports = repairModel;