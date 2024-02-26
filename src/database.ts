import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)

        
        return ('Database connected successfully')
    } catch (error) {
        return ({
            message: 'Unable to connect to the database', error})
    }
}

export default connectDb