var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Routes from './routes/routes.js';
const app = express();
const PORT = process.env.PORT || 3300;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
//Routes go here
app.use("/api", Routes);
app.get("/", (req, res) => {
    res.status(200).json({ Message: "Welcome to my brand new API, I hope you enjoy it." });
});
//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    });
});
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
