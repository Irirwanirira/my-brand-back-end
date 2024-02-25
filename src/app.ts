import express, {Application} from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app: Application = express()

app.use(cors({
    origin: ["*"],
    credentials: true
}))
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.status(200).json({Message: "Welcome to my brand new API, I hope you enjoy it."})
});

export default app;
