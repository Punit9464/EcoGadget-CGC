/*
fullName: '',
    email: '',
    phone: '',
    experience: '',
    specialties: [],
    availability: '',
    resume: null,*/


const { Schema } = require("mongoose");

const technicianSchema = new Schema({
    fullName: String,
    email: String,
    phone: String,
    experience: String,
    specialities: String,
    availability: String,
    resume: {
        type: Object
    }
});

module.exports = technicianSchema;