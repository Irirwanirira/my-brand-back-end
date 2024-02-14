var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CREATED, OK, NOT_FOUND, BAD_REQUEST } from "http-status";
import bcrypt from 'bcrypt';
import Users from "src/models/userModels.js";
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Users.find();
        return res.status(OK).json({
            users
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).send({
            Message: "unable to get messages"
        });
    }
});
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role, profilePhoto } = req.body;
        const userExist = yield Users.findOne({ email, name });
        if (userExist) {
            return res.status(BAD_REQUEST).json({
                message: "user already exist"
            });
        }
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const user = yield Users.create({
            name,
            email,
            password: hashedPassword,
            role,
            profilePhoto
        });
        return res.status(CREATED).json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                profilePhoto: user.profilePhoto
            }
        });
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            message: "unable to register user"
        });
    }
});
