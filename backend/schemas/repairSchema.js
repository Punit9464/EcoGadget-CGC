/*
deviceType: '',
    brand: '',
    issue: '',
    partsRequired: '',
    date: '',
    time: '',
    address: '' */

const { Schema } = require("mongoose");

const repairSchema = new Schema({
    deviceType: String,
    brand: String,
    issue: String,
    partsRequired: {
        type: String,
        enum: ['need-parts', 'have-parts', 'unsure'],
    },
    date: String,
    time: String,
    address: String
});

module.exports = repairSchema;