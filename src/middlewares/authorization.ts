import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import pkg from "http-status";

const {UNAUTHORIZED, FORBIDDEN} = pkg;

const auth = async (req: Request, res: Response, next: NextFunction) => {

    if(req.headers.authorization === undefined || req.headers.authorization === null){
        return res.status(UNAUTHORIZED).json({ 
            status: 'fail',
            message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    if(token === undefined || token === null){
        return res.status(UNAUTHORIZED).json({
            status: 'fail',
            message: 'Unauthorized' });
    }
    else {
        jwt.verify(token.substring(1, token.length - 1), 
        process.env.ACCESS_TOKEN_SECRET!, 
        (err: any, decoded: any) => {
            if (err) {
                return res.status(FORBIDDEN).json(
                    { status: 'fail',
                     message:  err.message + ", " + err.name 
                    });
            }
            else if(decoded){
                req.body.userId = decoded.userId;
                req.body.email = decoded.userEmail;
                req.body.role = decoded.roles;
                next();
            }else{
                res.status(UNAUTHORIZED).json({
                    status: 'fail',
                    message:"Token might be either expired or invalid, please login again to get a new token"})
            }
        });
    }
}

export default auth;