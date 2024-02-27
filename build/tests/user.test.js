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
const userModels_1 = __importDefault(require("../models/userModels"));
const userController_1 = require("../controllers/user/userController");
describe("GET users", () => {
    it('Should get al users', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.spyOn(userModels_1.default, 'find').mockResolvedValue([]);
        yield (0, userController_1.getUsers)(req, res);
        expect(res.status).toHaveBeenLastCalledWith(200);
        expect(res.json).toHaveBeenLastCalledWith({
            status: "success",
            data: { users: [] }
        });
    }));
});
describe('Create a user', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: 'henry',
                email: 'henry@example.com',
                password: 'henry123.',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        const mockNewUser = {
            _id: '1',
            name: 'henry',
            email: 'henry@example.com',
            password: 'henry123.',
            role: 'user',
            profilePhoto: 'https://example.com/image.jpg',
        };
        userModels_1.default.create = jest.fn().mockResolvedValue(mockNewUser);
        yield (0, userController_1.registerUser)(req, res);
        expect(res.status).toBeDefined();
        expect(res.json).toBeDefined();
    }), 20000);
});
describe('Get a unique user', () => {
    it('should get a located user', () => __awaiter(void 0, void 0, void 0, function* () {
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
        userModels_1.default.findById = jest.fn().mockResolvedValue(mockUser);
        yield (0, userController_1.getUniqUser)(req, res);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(res.json).toHaveBeenNthCalledWith(1, { status: 'success', data: { user: mockUser } });
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
});
