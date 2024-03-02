import { Request, Response, NextFunction } from "express";
import joi from "joi";

const validArticle = joi.object({
    title: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    author: joi.string().required()
});

const articleValidator = (req: Request, res: Response, next: NextFunction) => {
    const payload = { title: req.body.title, image: req.body.image, description: req.body.description, author: req.body.userId} 
    const { error } = validArticle.validate(payload);
    if (error) {
        return res.status(400).json({
        status: 'fail',
        message: error.details[0].message,
        });
    }
    next();
}

export default articleValidator;