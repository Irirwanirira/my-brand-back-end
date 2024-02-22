import express from "express";
import { Application } from "express";

const myServer =(app: Application  = express()): Application=> {
    app.get("/", (req, res) => {
        res.status(200).json({Message: "Welcome to my brand new API, I hope you enjoy it."})
    })
    return app
}

export default myServer
