const express = require('express')

const router = express.Router()

const Photo = require('../models/photo')

router.get('/getallphotos', async (req, res) => {
    try {
        const photos = await Photo.find({})
        res.send(photos)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post('/getphotobyid', async (req, res) => {
    const { photoid } = req.body
    try {
        const photo = await Photo.findById(photoid)
        res.send(photo)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

module.exports = router