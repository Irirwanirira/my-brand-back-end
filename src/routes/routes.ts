import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../swaggerDoc/swagger-output.json'
import messageRouter from "./messageRouter";
import articleRouter from "./articleRouter";
import authRouter from "./authRouter";
import commentRouter from "./commentRouter";
import likeRouter from "./likeRouter";


const router = express.Router();

router.use("/auth", authRouter);

router.use("/message", messageRouter);

router.use("/article", articleRouter);

router.use("/comment", commentRouter);

router.use("/like", likeRouter);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
