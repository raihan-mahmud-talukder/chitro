const express = require('express')

const app = express()

const cors = require('cors')

app.use(express.urlencoded({ extended: true }))

const dbConfig = require('./db')

app.use(express.json())

app.use(cors())

const photoRoute = require('./routes/photo')
const usersRoute = require('./routes/user')
const reviewRoute = require('./routes/review')

app.use('/api/photos', photoRoute)
app.use('/api/users', usersRoute)
app.use('/api/reviews', reviewRoute)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))