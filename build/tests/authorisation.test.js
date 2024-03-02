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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const http_status_1 = require("http-status");
describe("Auth Middleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            headers: {},
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return unauthorized if authorization header is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, authorization_1.default)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(http_status_1.UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "Unauthorized",
        });
        expect(next).not.toHaveBeenCalled();
    }));
    it("should return unauthorized if token is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        req.headers.authorization = "Bearer";
        yield (0, authorization_1.default)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(http_status_1.UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "Unauthorized",
        });
        expect(next).not.toHaveBeenCalled();
    }));
    it("should return forbidden if token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        req.headers.authorization = "Bearer invalid_token";
        jsonwebtoken_1.default.verify = jest
            .fn()
            .mockImplementation((token, secretOrPublicKey, callback) => {
            if (typeof callback === "function") {
                callback(new Error("Invalid token"), null);
            }
        });
        yield (0, authorization_1.default)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(http_status_1.FORBIDDEN);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "Invalid token, Error",
        });
        expect(next).not.toHaveBeenCalled();
    }));
    it("should call next if token is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        req.headers.authorization = "Bearer valid_token";
        jsonwebtoken_1.default.verify = jest
            .fn()
            .mockImplementation((token, secretOrPublicKey, callback) => {
            if (typeof callback === "function") {
                callback(null, { id: "user_id" });
            }
        });
        yield (0, authorization_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    }));
    it("should call next if user is found", () => __awaiter(void 0, void 0, void 0, function* () {
        req.headers = { authorization: "Bearer valid_token" };
        jsonwebtoken_1.default.verify = jest
            .fn()
            .mockImplementation((token, secretOrPublicKey, callback) => {
            if (typeof callback === "function") {
                callback(null, { id: "user_id" });
            }
        });
        yield (0, authorization_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    }));
});
