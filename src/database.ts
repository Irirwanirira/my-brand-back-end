import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Unable to connect to the database', error)
    }
}

export default connectDb