"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminPermission_1 = __importDefault(require("../middlewares/adminPermission"));
const http_status_1 = require("http-status");
describe('Permit Middleware', () => {
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
    it('should permit access for admin role', () => {
        req.body.role = 'admin';
        (0, adminPermission_1.default)('admin')(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
    it('should permit access for allowed roles', () => {
        req.body.role = 'user';
        (0, adminPermission_1.default)('user', 'editor')(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
    it('should not permit access for unauthorized roles', () => {
        req.body.role = 'guest';
        (0, adminPermission_1.default)('user', 'editor')(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_status_1.UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "Only admin can access this route",
        });
    });
    it('should return unauthorized if role is not provided in request body', () => {
        (0, adminPermission_1.default)('user', 'editor')(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_status_1.UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "Only admin can access this route",
        });
    });
});
