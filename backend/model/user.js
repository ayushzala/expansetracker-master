const mongoose = require("mongoose");
const db = require('../config/db')
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now() }
})

const user = mongoose.model('user', usersSchema);
module.exports = user;