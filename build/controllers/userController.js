var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pkg from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModels.js";
const { CREATED, OK, NOT_FOUND, BAD_REQUEST } = pkg;
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const userExist = yield Users.findOne({ email });
        if (userExist) {
            return res.status(BAD_REQUEST).json({
                message: "user already exist",
            });
        }
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const user = yield Users.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(CREATED).json({ message: "Registration successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(BAD_REQUEST).json({
            message: "unable to register user, kindly use different email",
        });
    }
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Users.findOne({ email });
        if (!user) {
            return res.status(NOT_FOUND).json({
                message: "user not found, Please register",
            });
        }
        const validPassword = yield bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(BAD_REQUEST).json({ message: "Incorrect password" });
        }
        const payload = {
            userEmail: user.email,
            roles: user.role,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15min'
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1y'
        });
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            path: '/auth/refreshToken',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(OK).json({ Message: user.name + " logged in successful", accessToken });
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            message: "unable to login user",
        });
    }
});
export const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204);
    res.clearCookie('jwt', { httpOnly: true, secure: true });
    res.json({ message: 'Logged out' });
});
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Users.find();
        return res.status(OK).json({
            users,
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).send({
            Message: "unable to get Users",
        });
    }
});
export const getUniqUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield Users.findById({ _id: id });
        return res.status(OK).json({ user });
    }
    catch (error) {
        return res
            .status(NOT_FOUND)
            .json({ message: `user with id: ${id} is not found` });
    }
});
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield Users.findByIdAndDelete({ _id: id });
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
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            message: `unable to delete user ${id}`,
        });
    }
});
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield Users.findByIdAndUpdate({ _id: id }, req.body, {
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
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            message: `unable to update user ${id}`,
        });
    }
});