const mongoose = require('mongoose')
const db = require('../config/db');
const schema = mongoose.Schema;
const expanseschema = new schema({
    id: { type: String, required: true },
    category: { type: String, require: true },
    amount: { type: Number, require: true },
    type: { type: String, require: true },
    description: { type: String },
    date: { type: Date, default: Date.now() }
})
const expanse = mongoose.model('expanse', expanseschema);
module.exports = expanse;