import express, {Application, Request, Response, NextFunction, Errback} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'

const app: Application = express()
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors());
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({Message: "Welcome to my brand new API, I hope you enjoy it."})
});

export default app;
