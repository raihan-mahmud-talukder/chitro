const express = require('express')
const router = express.Router()
const Feedback = require('../models/feedback')

router.post('/feedbackphoto', async (req, res) => {
    const { photo, user } = req.body
    try {
        const newFeedback = new Feedback(
            {
                photo: photo.name,
                photoId: photo._id,
                user: user.name,
                userId: user._id,
                feedback: user.feedback
            })
        const feedback = await newFeedback.save()
        res.send('Feedback is submitted')
    } catch (error) { console.log(error) }
})

module.exports = router