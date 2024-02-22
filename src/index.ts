import express, { Application, json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import allRoutes from './routes/routes.js';
import myServer from './server.js';
const PORT = process.env.PORT || 3300



mongoose
.connect(process.env.MONGODB_URL!)
.then(() => {
    const app: Application  = myServer()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use("/api", allRoutes)
    app.listen(process.env.PORT, ()=> {
        console.log("Wakanda forever on Atlas port " + PORT)
    })
})
.catch((err) => {console.log(err, `unable to connect database`,  process.env.MONGODB_URL)})




