import express from "express";
const myServer = () => {
    const app = express();
    app.get("/", (req, res) => {
        res.status(200).json({ Message: "Welcome to my brand new API, I hope you enjoy it." });
    });
    return app;
};
export default myServer;
