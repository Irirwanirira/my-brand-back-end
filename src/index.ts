import app from './app';
import connectDb from './database';
import allRoutes from './routes/routes';

connectDb();
app.use("/brand/api/v1", allRoutes)
const PORT = process.env.PORT || 3300
const server = app.listen(process.env.PORT, ()=> {
    console.log("Wakanda forever on Atlas port ", PORT )
})

export default server;