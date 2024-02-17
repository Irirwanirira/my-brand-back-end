import { Request, Response, NextFunction } from "express";
import joi from "joi";

const validator = joi.object({
    title: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
  });
  
  const articleValidator = (req: Request, res: Response, next: NextFunction) => {
      const payload = req.body;
      const { error } = validator.validate(payload);
      if (error) {
          return res.status(400).json({
          status: 'fail',
          message: error.details[0].message,
          });
      }
      next();
  }
  
  export default articleValidator;