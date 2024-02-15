import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Routes from './routes/routes.js'

const PORT = process.env.PORT || 3300

mongoose
.connect(process.env.MONGODB_URL!)
.then(() => {
    const app: Application  = express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
   
    app.use("/api", Routes)
    app.get("/", (req, res) => {
        res.status(200).json({Message: "Welcome to my brand new API, I hope you enjoy it."})
    }) 
    app.listen(process.env.PORT, ()=> {
        console.log("Wakanda forever on Atlas port " + PORT)
    })
})
.catch((err) => {console.log(err, `unable to connect database`,  process.env.MONGODB_URL)})




