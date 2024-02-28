"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageValidator_1 = __importDefault(require("../controllers/message/messageValidator"));
const articleValidator_1 = __importDefault(require("../controllers/article/articleValidator"));
const userValidator_1 = require("../controllers/user/userValidator");
const commentValidator_1 = __importDefault(require("../controllers/comment/commentValidator"));
describe("Article Validator Middleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = { body: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should pass validation for valid article", () => {
        req.body = {
            title: "Test Title",
            image: "test.jpg",
            description: "Test Description",
        };
        (0, articleValidator_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
    it.each([
        ["title", "image", "description"],
        ["title", "description"],
        ["image", "description"],
        ["title", "image"],
    ])("should return 400 if %s is missing", (missingField, ...otherFields) => {
        const payload = {};
        for (const field of otherFields) {
            payload[field] = "Test";
        }
        req.body = payload;
        (0, articleValidator_1.default)(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
describe("User Validator Middleware", () => {
    it("should call next() if input is valid", () => {
        const req = {
            body: {
                name: "John",
                email: "john@example.com",
                password: "password123",
            },
        };
        const res = {};
        const next = jest.fn();
        (0, userValidator_1.userValidator)(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    it("should return 400 status with error message if required fields are missing", () => {
        const req = { body: { name: "John" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, userValidator_1.userValidator)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: expect.any(String),
        });
        expect(next).not.toHaveBeenCalled();
    });
    it("should return 400 status with error message if input is invalid", () => {
        const req = {
            body: { name: "John", email: "invalidemail", password: "short" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, userValidator_1.userValidator)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: expect.any(String),
        });
        expect(next).not.toHaveBeenCalled();
    });
    describe("loginValidator middleware", () => {
        it("should call next() if input is valid", () => {
            const req = {
                body: { email: "john@example.com", password: "password123" },
            };
            const res = {};
            const next = jest.fn();
            (0, userValidator_1.loginValidator)(req, res, next);
            expect(next).toHaveBeenCalled();
        });
        it("should return 400 status with error message if required fields are missing", () => {
            const req = { body: { email: "john@example.com" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();
            (0, userValidator_1.loginValidator)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: "fail",
                message: expect.any(String),
            });
            expect(next).not.toHaveBeenCalled();
        });
        it("should return 400 status with error message if input is invalid", () => {
            const req = {
                body: { email: "invalidemail", password: "short" },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();
            (0, userValidator_1.loginValidator)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: "fail",
                message: expect.any(String),
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe("Message Validator Middleware", () => {
        it("should call next() if input is valid", () => {
            const req = {
                body: { name: "John", email: "john@example.com", message: "Hello" },
            };
            const res = {};
            const next = jest.fn();
            (0, messageValidator_1.default)(req, res, next);
            expect(next).toHaveBeenCalled();
        });
        it("should return 400 status with error message if input is invalid", () => {
            const req = {
                body: { name: "John", email: "invalidemail", message: "Hello" },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();
            (0, messageValidator_1.default)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: "fail",
                message: expect.any(String),
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
describe('commentValidator middleware', () => {
    it('should call next() if input is valid', () => {
        const req = { body: { comment: 'Valid comment', author: 'Valid author' } };
        const res = {};
        const next = jest.fn();
        (0, commentValidator_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    it('should return 400 status with error message if required fields are missing', () => {
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, commentValidator_1.default)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'fail',
            message: expect.any(String),
        });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 400 status with error message if input is invalid', () => {
        const req = { body: { comment: '', author: '' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, commentValidator_1.default)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'fail',
            message: expect.any(String),
        });
        expect(next).not.toHaveBeenCalled();
    });
});
