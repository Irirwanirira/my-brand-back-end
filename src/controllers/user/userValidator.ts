import { Response, Request, NextFunction } from 'express';
import joi from 'joi';

const registerValidator = joi.object({
  name: joi.string().alphanum().min(3).max(25).trim(true).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(7).trim(true).required(),
});

const login = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(7).trim(true).required(),
})

const userValidator = (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { error } = registerValidator.validate(payload);
    if (error) {
        return res.status(400).json({
        status: 'fail',
        message: error.details[0].message,
        });
    }
    next();
}

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { error } = login.validate(payload);
    if (error) {
        return res.status(400).json({
        status: 'fail',
        message: error.details[0].message,
        });
    }
    next();
}

export { userValidator, loginValidator };
