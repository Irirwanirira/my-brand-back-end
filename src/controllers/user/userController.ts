import { Request, Response } from "express";
import pkg from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import Users from "../../models/userModels";

const { CREATED, OK, NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } = pkg;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await Users.findOne({ email });
    if (userExist) {
      return res.status(BAD_REQUEST).json({
        status: "fail",
        message: "user already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(CREATED).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: "fail",
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
        status: "fail",
        message: "user not found, Please register",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(UNAUTHORIZED).json({
        status: "fail",
        message: "Incorrect password",
      });
    }

    const payload = {
      userId: user._id,
      userEmail: user.email,
      roles: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15d",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "1y",
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/auth/refreshToken",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(OK).json({
      status: "success",
      data: {
        user: {id: user._id, name: user.name, email: user.email, role: user.role},
        accessToken,
      },
    });
  } catch (error) {
    return res.status(UNAUTHORIZED).json({
      status: "fail",
      message: "unable to login user",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  return res.status(OK).json({
    status: "success",
    data: "user logged out successfully",
  });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    return res.status(OK).json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    return res.status(NOT_FOUND).json({
      status: "fail",
      message: "unable to get Users",
    });
  }
};

export const getUniqUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findById({ _id: id });
    return res.status(OK).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return res.status(NOT_FOUND).json({
      status: "fail",
      message: `user with id: ${id} is not found`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await Users.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(NOT_FOUND).json({
        status: "fail",
        message: `user with id: ${id} is not found`,
      });
    }
    if (user.role === "admin") {
      return res.status(BAD_REQUEST).json({
        status: "fail",
        message: "admin cannot be deleted",
      });
    }

    return res.status(OK).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: "fail",
      message: `unable to delete user ${id}`,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findById({ _id: id });
    const { name, email, profilePhoto } = req.body;

    if (!user) {
      return res.status(NOT_FOUND).json({
        status: "fail",
        message: `user with id: ${id} is not found`,
      });
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (profilePhoto) {
      user.profilePhoto = profilePhoto;
    }
    await user.save();
    return res.status(OK).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: "fail",
      message: `unable to update user ${id}`,
    });
  }
};



// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/google/callback"
//   },
//   function(accessToken:any, refreshToken:any, profile:any, done:any, err: any) {
//     // Users.findOrCreate({ googleId: profile.id }, function (err:any, user:any) {
//       return done(err, profile);
//     // });
//   }
// ));
// passport.serializeUser(function(user, done){
//   done(null, user);
// });
// passport.deserializeUser(function(user:any, done){
//   done(null, user);
// });

// export const googleAuth = passport.authenticate('google', { scope: ['email','profile'] });