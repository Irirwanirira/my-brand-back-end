import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Routes from './routes/routes.js';
const PORT = process.env.PORT || 3300;
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api", Routes);
    app.listen(process.env.PORT, () => {
        console.log("Wakanda forever on Atlas port " + PORT);
    });
})
    .catch((err) => { console.log(err, `unable to connect database`, process.env.MONGODB_URL); });
