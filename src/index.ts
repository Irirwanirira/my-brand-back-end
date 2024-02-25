import app from './app.js';
import connectDb from './database.js';
import allRoutes from './routes/routes.js';

connectDb();
app.use("/api", allRoutes)
const PORT = process.env.PORT || 3300
app.listen(process.env.PORT, ()=> {
    console.log("Wakanda forever on Atlas port ", PORT )
})
