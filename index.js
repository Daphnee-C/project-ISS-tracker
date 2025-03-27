import express from 'express'
import 'dotenv/config'
import connectDB from './database/client.js'
import authRouter from './routes/auth.js'
import cors from 'cors'


const PORT = process.env.PORT || 8000

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api', authRouter)

connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})