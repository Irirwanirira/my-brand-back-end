import { Request, Response } from "express";
import pkg from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModels.js";

const { CREATED, OK, NOT_FOUND, BAD_REQUEST } = pkg;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password} = req.body;
    const userExist = await Users.findOne({ email });
    if (userExist) {
      return res.status(BAD_REQUEST).json({
        message: "user already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.create({
      name,
      email,
      password: hashedPassword
    });
    return res.status(CREATED).json({ message: "Registration successful" });
  } catch (error) {
    console.log(error)
    return res.status(BAD_REQUEST).json({
      message: "unable to register user, kindly use different email",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND).json({
        message: "user not found, Please register",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(BAD_REQUEST).json({ message: "Incorrect password" });
    }

    const payload = {
        userEmail: user.email,
        roles: user.role,
    }

    const accessToken  = jwt.sign(  
        payload,
        process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: '15min' 
        }
   );

    const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '1y'
    })

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        path: '/auth/refreshToken',
        maxAge: 7 * 24 * 60 * 60 * 1000

    })

    return res.status(OK).json({ Message: user.name + " logged in successful",accessToken });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      message: "unable to login user",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', { httpOnly: true, secure: true })
    res.json({ message: 'Logged out'})
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    return res.status(OK).json({
      users,
    });
  } catch (error) {
    return res.status(NOT_FOUND).send({
      Message: "unable to get Users",
    });
  }
};

export const getUniqUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findById({ _id: id });
    return res.status(OK).json({ user });
  } catch (error) {
    return res
      .status(NOT_FOUND)
      .json({ message: `user with id: ${id} is not found` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await Users.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(NOT_FOUND).json({
        message: `user with id: ${id} is not found`,
      });
    }
    if (user.role === "admin") {
      return res.status(BAD_REQUEST).json({
        message: "admin cannot be deleted",
      });
    }

    return res.status(OK).json({
      message: `user ${id} was deleted successfully `,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      message: `unable to delete user ${id}`,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(NOT_FOUND).json({
        message: `user with id: ${id} is not found`,
      });
    }
    return res.status(OK).json({
      user,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      message: `unable to update user ${id}`,
    });
  }
};
