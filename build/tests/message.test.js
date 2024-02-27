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
const messageModel_1 = __importDefault(require("../models/messageModel"));
const messageController_1 = require("../controllers/message/messageController");
describe("Get all messages ", () => {
    it("should get all messages", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.spyOn(messageModel_1.default, "find").mockResolvedValue([]);
        yield (0, messageController_1.getMessages)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: { messages: [] },
        });
    }));
});
describe('Create a message', () => {
    it('should create a new message', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                message: 'Hello, this is a test message',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        const mockNewMessage = {
            _id: '1',
            name: 'John Doe',
            email: 'johndoe@example.com',
            message: 'Hello, this is a test message',
            date: '2024-02-26',
            time: '10:00 AM',
        };
        messageModel_1.default.create = jest.fn().mockResolvedValue(mockNewMessage);
        yield (0, messageController_1.createMessage)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: { message: mockNewMessage },
        });
    }));
});
describe('Get a unique message', () => {
    it('should get a located message', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockMessage = {
            _id: '1',
            name: 'kim',
            email: 'kim@gmail.com',
            message: 'Hello, this is a test message',
            date: '2024-02-26',
            time: '10:00 AM',
        };
        messageModel_1.default.findById = jest.fn().mockResolvedValue(mockMessage);
        yield (0, messageController_1.getUniqueMessage)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: { message: mockMessage },
        });
    }));
});
describe('Delete a message', () => {
    it('should delete a message', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockMessage = {
            _id: '1',
            name: 'kim',
            email: 'kim@gmail.com',
            message: 'Hello, this is a test message',
            date: '2024-02-26',
            time: '10:00 AM',
        };
        messageModel_1.default.findByIdAndDelete = jest.fn().mockResolvedValue(mockMessage);
        yield (0, messageController_1.deleteMessage)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: null,
        });
    }));
});
