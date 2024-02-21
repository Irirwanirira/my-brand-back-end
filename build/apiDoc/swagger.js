import swaggerJsdoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: " My brand API Documentation",
            version: "0.1.0",
            description: "my brand API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
    },
    apis: ["../routes/*.js"]
};
const specs = swaggerJsdoc(options);
export default specs;
// /**
// * @swagger
// * components:
// *   schemas:
// *     Article:
// *       type: object
// *       required:
// *         - title
// *         - image
// *         - description
// *  
// *       properties:
// *         id:
// *           type: string
// *           description: The auto-generated id of the Post
// *         title:
// *           type: string
// *           description: The title of your Post
// *         image:
// *           type: string
// *           description: The content author
// *          description:
// *           type: string
// *           description: The content author
// *         date:   
// *           type: string
// *           description: The date of the article
// *         comments:
// *           type: array
// *           items:
// *             type: string
// *           description: The comments of the article
// *         example:
// *           id: d5fE_asz
// *           title: The New Turing Omnibus
// *           image: https://images-na.ssl-images-amazon.com/images/I/51J9Wc6YJjL._SX331_BO1,204,203,200_.jpg
// *           description: post 1
// *           date: 2022-09-01
// *           comments: ["comment1", "comment2"]
// * 
// */
/**
 * @swagger
 * * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
// import express from "express";
// import Articles from "../models/articleModel.js";
// const router = express.Router();
// router.get("/article", async(req, res) => {
//   try {
//     const articles = await Articles.find();
//     return res.status(200).json({
//       status: "success",
//       data: { articles },
//     });
//   } catch (error) {
//     return res.status(404).send({
//       status: "fail",
//       message: "Articles not found",
//     });
//   }
// })
// export default router;
