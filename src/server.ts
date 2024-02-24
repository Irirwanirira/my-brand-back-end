import express from "express";
import { Application } from "express";
const PORT = process.env.PORT || 3300

const myServer =(app: Application  = express()): Application=> {

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.get("/", (req, res) => {
        res.status(200).json({Message: "Welcome to my brand new API, I hope you enjoy it."})
    })
    app.listen(process.env.PORT, ()=> {
        console.log("Wakanda forever on Atlas port ", PORT )
    })
    return app
}

export default myServer
