import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Routes from './routes/routes.js'
const app: Application = express()
const PORT = process.env.PORT || 3300

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL!);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  
  //Routes go here
    app.use("/api", Routes)
    app.get("/", (req, res) => {
        res.status(200).json({Message: "Welcome to my brand new API, I hope you enjoy it."})
    }) 
  
  //Connect to the database before listening
  connectDB().then(() => {
      app.listen(PORT, () => {
          console.log("listening for requests");
      })
  })

// mongoose
// .connect(process.env.MONGODB_URL!)
// .then(() => {
//     const app: Application  = express()
//     app.use(express.json())
//     app.use(express.urlencoded({extended: true}))
   
//     app.use("/api", Routes)
//     app.get("/", (req, res) => {
//         res.status(200).json({Message: "Welcome to my brand new API, I hope you enjoy it."})
//     }) 
//     app.listen(process.env.PORT, ()=> {
//         console.log("Wakanda forever on Atlas port " + PORT)
//     })
// })
// .catch((err) => {console.log(err, `unable to connect database`,  process.env.MONGODB_URL)})




