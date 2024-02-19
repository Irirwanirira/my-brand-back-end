import express, { Application, Request, Response} from 'express';
import Routes from './routes/routes.js'

const myServer = ():Application=> {
    const app:Application = express()
    app.use(express.json)
    // app.use(express.urlencoded({extended: true}))
    app.use("/api", Routes)
    // app.get("/", (req: Request, res: Response) => {
    //     res.status(200).json({
    //         status: "success",
    //         Message: "Welcome to my brand new API, I hope you enjoy it."})
    // })
    return app
}

export default myServer

// const options = {
    //   definition: {
    //     openapi: "3.1.0",
    //     info: {
    //       title: " Express API with Swagger",
    //       version: "0.1.0",
    //       description:
    //         "my brand API application made with Express and documented with Swagger",
    //       license: {
    //         name: "MIT",
    //         url: "https://spdx.org/licenses/MIT.html",
    //       },
    //     },
    //     servers: [
    //       {
    //         url: "http://localhost:3000/api",
    //       },
    //     ],
    //   },
    //   apis: ["./routes/*.js"],
    // };

    // const specs = swaggerJsdoc(options);
    // app.use(
    //   "/api-docs",
    //   swaggerUi.serve,
    //   swaggerUi.setup(specs, {
    //     explorer: true,
    //     customCssUrl:
    //       "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
    //   }),
    //   swaggerUi.setup(specs, { explorer: true })
    // );

