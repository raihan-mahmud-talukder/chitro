const mongoose = require('mongoose')

const photoSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('photos', photoSchema)