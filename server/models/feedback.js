const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    photo: { type: String, required: true },
    photoId: { type: String, required: true },
    user: { type: String, required: true },
    userId: { type: String, required: true },
    feedback: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('feedback', feedbackSchema)

