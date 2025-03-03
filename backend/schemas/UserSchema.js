const { Schema } = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false,
    }
});

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = UserSchema;