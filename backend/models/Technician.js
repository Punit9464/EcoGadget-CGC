const { model } = require("mongoose");
const technicianSchema = require("../schemas/technicianSchema");

const technician = new model('technician', technicianSchema);

module.exports = technician;