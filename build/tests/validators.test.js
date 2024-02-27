"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const articleValidator_1 = __importDefault(require("../controllers/article/articleValidator"));
const userValidator_1 = require("../controllers/user/userValidator");
describe('Article Validator Middleware', () => {
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
    it('should pass validation for valid article', () => {
        req.body = { title: 'Test Title', image: 'test.jpg', description: 'Test Description' };
        (0, articleValidator_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
    it.each([
        ['title', 'image', 'description'],
        ['title', 'description'],
        ['image', 'description'],
        ['title', 'image'],
    ])('should return 400 if %s is missing', (missingField, ...otherFields) => {
        const payload = {};
        for (const field of otherFields) {
            payload[field] = 'Test';
        }
        req.body = payload;
        (0, articleValidator_1.default)(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
describe('User Validator Middleware', () => {
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
    // it('should pass validation for valid user', () => {
    //     req.body = { email: 'henry@gmail.com', password: 'password' };
    //     userValidator(req as Request, res as Response, next);
    //     expect(next).toHaveBeenCalled();
    //     expect(res.status).not.toHaveBeenCalled();
    // });
    it.each([
        ['email', 'password'],
        ['email'],
        ['password'],
    ])('should return 400 if %s is missing', (missingField, ...otherFields) => {
        const payload = {};
        for (const field of otherFields) {
            payload[field] = 'Test';
        }
        req.body = payload;
        (0, userValidator_1.userValidator)(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
