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
const commentModel_1 = __importDefault(require("../models/commentModel"));
const commentController_1 = require("../controllers/comment/commentController");
describe('Add a comment', () => {
    it('should add a comment to an existing article', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                content: 'This is a comment content',
                userId: 'user123',
            },
            params: {
                articleId: 'article456',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockArticle = {
            _id: 'article456',
            comments: [],
            save: jest.fn(),
        };
        const mockComment = {
            _id: 'comment789',
            content: req.body.content,
            author: req.body.userId,
            post: req.params.articleId,
        };
        articleModel_1.default.findById = jest.fn().mockResolvedValue(mockArticle);
        commentModel_1.default.create = jest.fn().mockResolvedValue(mockComment);
        yield (0, commentController_1.addComment)(req, res);
        expect(articleModel_1.default.findById).toHaveBeenCalledWith(req.params.articleId);
        expect(commentModel_1.default.create).toHaveBeenCalledWith({
            content: req.body.content,
            author: req.body.userId,
            post: req.params.articleId,
        });
        expect(mockArticle.comments).toContain(mockComment._id);
        expect(mockArticle.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: { comment: mockComment },
        });
    }));
    it('should return error if article does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                content: 'This is a comment content',
                userId: 'user123',
            },
            params: {
                articleId: 'article456',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        articleModel_1.default.findById = jest.fn().mockResolvedValue(null);
        yield (0, commentController_1.addComment)(req, res);
        expect(articleModel_1.default.findById).toHaveBeenCalledWith(req.params.articleId);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'fail',
            message: 'article not found',
        });
    }));
    it('should return error if unable to add comment', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                content: 'This is a comment content',
                userId: 'user123',
            },
            params: {
                articleId: 'article456',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockArticle = {
            _id: 'article456',
        };
        articleModel_1.default.findById = jest.fn().mockResolvedValue(mockArticle);
        commentModel_1.default.create = jest.fn().mockRejectedValue(new Error('Some error'));
        yield (0, commentController_1.addComment)(req, res);
        expect(articleModel_1.default.findById).toHaveBeenCalledWith(req.params.articleId);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'fail',
            message: 'unable to add comment',
        });
    }));
});
