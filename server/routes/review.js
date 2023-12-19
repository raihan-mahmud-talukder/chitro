const express = require('express')
const router = express.Router()
const Review = require('../models/review')

router.post('/reviewphoto', async (req, res) => {
    const { photo, user } = req.body
    try {
        const newReview = new Review(
            {
                photo: photo.name,
                photoId: photo._id,
                user: user.name,
                userId: user._id,
                review: user.review
            })
        const review = await newReview.save()
        res.send('Review is submitted')
    } catch (error) { console.log(error) }
})

module.exports = router