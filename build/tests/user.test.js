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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModels_1 = __importDefault(require("../models/userModels"));
const userController_1 = require("../controllers/user/userController");
describe("GET users", () => {
    it('Should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.spyOn(userModels_1.default, 'find').mockResolvedValue([{ name: "Joseph" }, { name: "henry" }]);
        yield (0, userController_1.getUsers)(req, res);
        expect(res.status).toHaveBeenLastCalledWith(200);
        expect(res.json).toHaveBeenLastCalledWith({
            status: "success",
            data: { users: [{ name: "Joseph" }, { name: "henry" }] }
        });
    }));
    it('Should return 404 error if no user found', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.spyOn(userModels_1.default, 'find').mockRejectedValue(new Error('error'));
        yield (0, userController_1.getUsers)(req, res);
        expect(res.status).toHaveBeenLastCalledWith(404);
        expect(res.json).toHaveBeenLastCalledWith({
            status: 'fail',
            message: 'unable to get Users'
        });
    }));
});
describe("Register a user", () => {
    it('should register a new user if the email does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'testpassword',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.spyOn(userModels_1.default, 'findOne').mockResolvedValue(null);
        jest.spyOn(bcrypt_1.default, 'genSalt').mockImplementation(() => Promise.resolve('salt'));
        jest.spyOn(bcrypt_1.default, 'hash').mockImplementation(() => Promise.resolve('hashedPassword'));
        jest.spyOn(userModels_1.default, 'create').mockImplementation(() => Promise.resolve({
            _id: '65e19219d5ba0e5de7a8fcff',
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashedPassword',
        }));
        yield (0, userController_1.registerUser)(req, res);
        expect(userModels_1.default.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(bcrypt_1.default.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt_1.default.hash).toHaveBeenCalledWith('testpassword', 'salt');
        expect(userModels_1.default.create).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com', password: 'hashedPassword' });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: { user: { _id: '65e19219d5ba0e5de7a8fcff', name: 'Test User', email: 'test@example.com', password: 'hashedPassword' } },
        });
    }));
    it('should return error if the email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'testpassword',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.spyOn(userModels_1.default, 'findOne').mockResolvedValue({ _id: '123', name: 'Test User', email: 'test@example.com' });
        yield (0, userController_1.registerUser)(req, res);
        expect(userModels_1.default.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "user already exist",
        });
    }));
});
describe('Delete a user', () => {
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockUser = {
            _id: '1',
            name: 'henry',
            email: 'henry@gmail.com',
            role: 'user',
            profilePhoto: 'https://example.com/image.jpg',
        };
        userModels_1.default.findByIdAndDelete = jest.fn().mockResolvedValue(mockUser);
        yield (0, userController_1.deleteUser)(req, res);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, { status: 'success', data: null });
    }));
});
describe('Update a user', () => {
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '1',
            },
            body: {
                name: 'henry',
                email: 'henry@gmail.com',
                profilePhoto: 'https://example.com/image.jpg',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const initialUserProps = {
            _id: '1',
            name: 'henry',
            email: 'henry@gmail.com',
            role: 'user',
            profilePhoto: 'https://example.com/image.jpg',
        };
        const mockUser = Object.assign(Object.assign({}, initialUserProps), { save: jest.fn().mockResolvedValue(initialUserProps) });
        userModels_1.default.findById = jest.fn().mockResolvedValue(mockUser);
        yield (0, userController_1.updateUser)(req, res);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, { status: 'success', data: { user: mockUser } });
    }));
    it('should return 404 if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '1',
            },
            body: {
                name: 'henry',
                email: 'henry@gmail.com',
                profilePhoto: 'https://example.com/image.jpg',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        userModels_1.default.findById = jest.fn().mockResolvedValue(null);
        yield (0, userController_1.updateUser)(req, res);
        expect(res.status).toHaveBeenNthCalledWith(1, 404);
        expect(res.json).toHaveBeenNthCalledWith(1, { status: 'fail', message: 'user with id: 1 is not found' });
    }));
});
const OK = 200;
const NOT_FOUND = 404;
const UNAUTHORIZED = 401;
describe('Login User', () => {
    const mockUser = {
        _id: 'user_id',
        email: 'test@example.com',
        password: 'hashed_password',
        name: 'Test User',
        role: 'user',
    };
    beforeEach(() => {
        jest.spyOn(userModels_1.default, 'findOne').mockReset();
        jest.spyOn(bcrypt_1.default, 'compare').mockReset();
        jest.spyOn(jsonwebtoken_1.default, 'sign').mockReset();
    });
    it('should return user not found if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: { email: 'nonexistent@example.com', password: 'password' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const findOneSpy = jest.spyOn(userModels_1.default, 'findOne');
        findOneSpy.mockResolvedValue(null);
        yield (0, userController_1.loginUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(NOT_FOUND);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "user not found, Please register",
        });
    }));
    it('should return incorrect password if password is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: { email: mockUser.email, password: 'wrong_password' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const findOneSpy = jest.spyOn(userModels_1.default, 'findOne');
        findOneSpy.mockResolvedValue(mockUser);
        const bcryptCompareSpy = jest.spyOn(bcrypt_1.default, 'compare');
        bcryptCompareSpy.mockResolvedValue(false);
        yield (0, userController_1.loginUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "Incorrect password",
        });
    }));
    it('should login user successfully and return access and refresh tokens', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: { email: mockUser.email, password: 'correct_password' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
        };
        const findOneSpy = jest.spyOn(userModels_1.default, 'findOne');
        findOneSpy.mockResolvedValue(mockUser);
        const bcryptCompareSpy = jest.spyOn(bcrypt_1.default, 'compare');
        bcryptCompareSpy.mockResolvedValue(true);
        const jwtSignSpy = jest.spyOn(jsonwebtoken_1.default, 'sign');
        jwtSignSpy.mockReturnValue('access_token');
        jwtSignSpy.mockReturnValueOnce('refresh_token');
        yield (0, userController_1.loginUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(OK);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: {
                user: mockUser.name,
                accessToken: 'refresh_token',
            },
        });
    }));
});
