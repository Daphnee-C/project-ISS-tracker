import express from 'express'
import 'dotenv/config'
import connectDB from './database/client.js'

const app = express()

const PORT = process.env.PORT || 8000


connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})