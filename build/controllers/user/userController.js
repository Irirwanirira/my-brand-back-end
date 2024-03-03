"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUniqUser = exports.getUsers = exports.logout = exports.loginUser = exports.registerUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModels_1 = __importDefault(require("../../models/userModels"));
const { CREATED, OK, NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } = http_status_1.default;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const userExist = yield userModels_1.default.findOne({ email });
        if (userExist) {
            return res.status(BAD_REQUEST).json({
                status: "fail",
                message: "user already exist",
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModels_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.status(CREATED).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: "unable to register user, kindly use different email",
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModels_1.default.findOne({ email });
        if (!user) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "user not found, Please register",
            });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
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
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15d",
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
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
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
                accessToken,
            },
        });
    }
    catch (error) {
        return res.status(UNAUTHORIZED).json({
            status: "fail",
            message: "unable to login user",
        });
    }
});
exports.loginUser = loginUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwt");
    return res.status(OK).json({
        status: "success",
        data: "user logged out successfully",
    });
});
exports.logout = logout;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModels_1.default.find();
        return res.status(OK).json({
            status: "success",
            data: { users },
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).json({
            status: "fail",
            message: "unable to get Users",
        });
    }
});
exports.getUsers = getUsers;
const getUniqUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModels_1.default.findById({ _id: id });
        return res.status(OK).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).json({
            status: "fail",
            message: `user with id: ${id} is not found`,
        });
    }
});
exports.getUniqUser = getUniqUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModels_1.default.findByIdAndDelete({ _id: id });
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
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: `unable to delete user ${id}`,
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModels_1.default.findById({ _id: id });
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
        yield user.save();
        return res.status(OK).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: `unable to update user ${id}`,
        });
    }
});
exports.updateUser = updateUser;
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
