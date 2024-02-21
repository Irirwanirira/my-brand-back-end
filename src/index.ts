import express, { Application, json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// import swaggerUi from "swagger-ui-express";
// import swaggerSpecs from "./apiDoc/swagger.js";

// import swaggerDocument from './swaggerDoc/swagger-output.json' assert { type: 'json' } ;
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
    // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen(process.env.PORT, ()=> {
        console.log("Wakanda forever on Atlas port " + PORT)
    })
})
.catch((err) => {console.log(err, `unable to connect database`,  process.env.MONGODB_URL)})




