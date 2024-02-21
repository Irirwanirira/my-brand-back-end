import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../swaggerDoc/swagger-output.json' assert { type: 'json' } ;

import messageRouter from "./messageRouter.js";
import articleRouter from "./articleRouter.js";
import authRouter from "./authRouter.js";
import commentRouter from "./commentRouter.js";


const router = express.Router();

router.use("/auth", authRouter);

router.use("/message", messageRouter);

router.use("/article", articleRouter);

router.use("/comment", commentRouter);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default router;
