import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_DB_URI = process.env.MONGO_DB_URI


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI)
        console.log(`DB connected successfully ✅ `)
    } 
    catch (err) {
        console.error(`MangoDB connection error : ${err}`)
        process.exit(1)
    }
}

export default connectDB