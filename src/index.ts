import express, { Application, json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv';
dotenv.config();
import myServer from './server.js';
import allRoutes from './routes/routes.js';

mongoose
.connect(process.env.MONGODB_URL!)
.then(() => {

    const app: Application  = myServer()
    app.use(
        cors({
            origin: ["*"],
            credentials: true, 
          })
    );
    app.use(helmet());
    app.use("/api", allRoutes)
})
.catch((err) => {console.log(err, `unable to connect database`,  process.env.MONGODB_URL)})

export default myServer
