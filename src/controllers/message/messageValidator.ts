import { Request, Response, NextFunction } from "express";
import joi from "joi";

const validator = joi.object({
    name: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    message: joi.string().required(),
});
  
const messageValidator = (req: Request, res: Response, next: NextFunction) => {
    const payload = {name: req.body.name, email: req.body.email, message: req.body.message};
    const { error } = validator.validate(payload);
    if (error) {
        return res.status(400).json({
        status: 'fail',
        message: error.details[0].message,
        });
    }
    next();
}

export default messageValidator;