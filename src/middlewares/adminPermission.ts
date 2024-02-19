import { NextFunction, Request, Response } from "express";
import pkg from "http-status";
const { UNAUTHORIZED } = pkg;

export default function permit(...allowed: string[]) {
  const isAllowed = (role: any) => allowed.indexOf(role) > -1;
  return (req: Request, res: Response, next: NextFunction) => {

    if (req.body) {
      if (req.body.role === "admin") {
        return next();
      }
      if (isAllowed(req.body.role)) {
        return next();
      }
    }
    return res.status(UNAUTHORIZED).json({
      status: "fail",
      message: "Only admin can access this route",
    });
  };
}
