import {Request, Response, NextFunction } from "express";
import Joi from "joi";

const validator = Joi.object({
    content: Joi.string().required(),
    author: Joi.string().required(),
});

const commentValidator = (req: Request, res: Response, next: NextFunction) => {
    const payload = {content: req.body.content, author: req.body.userId};
    const { error } = validator.validate(payload);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: error.details[0].message,
        });
    }
    next();
}

export default commentValidator;