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
const articleModel_1 = __importDefault(require("../models/articleModel"));
const commentController_1 = require("../controllers/comment/commentController");
describe("addComment function", () => {
    it("should return 400 if the article is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { id: "non_existing_article_id" },
            body: { comment: "Test comment", author: "Test author" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        articleModel_1.default.findById = jest.fn().mockResolvedValueOnce(null);
        yield (0, commentController_1.addComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "unable to add comment",
        });
    }));
    it("should return 400 if unable to add comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { id: "article_id" },
            body: { comment: "Test comment", author: "Test author" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockedArticle = {
            _id: "article_id",
            comments: [],
            save: jest.fn().mockRejectedValueOnce(new Error("Database error")),
        };
        articleModel_1.default.findById = jest.fn().mockResolvedValueOnce(mockedArticle);
        yield (0, commentController_1.addComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "unable to add comment",
        });
    }));
});
