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
const likeController_1 = require("../controllers/like/likeController");
const articleModel_1 = __importDefault(require("../models/articleModel"));
describe('addLike function', () => {
    it('should add a like to an existing article', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                articleId: 'article123',
            },
            body: {
                userId: 'user456',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockArticle = {
            _id: 'article123',
            likes: [],
            save: jest.fn(),
        };
        const spyFindById = jest.spyOn(articleModel_1.default, 'findById');
        spyFindById.mockResolvedValue(mockArticle);
        yield (0, likeController_1.addLike)(req, res);
        expect(articleModel_1.default.findById).toHaveBeenCalledWith(req.params.articleId);
        expect(mockArticle.likes).toContain(req.body.userId);
        expect(mockArticle.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Your like counts',
        });
    }));
    it('should return 404 status if article is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                articleId: 'nonexistentArticle',
            },
            body: {
                userId: 'user456',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const spyFindById = jest.spyOn(articleModel_1.default, 'findById');
        spyFindById.mockResolvedValue(null);
        yield (0, likeController_1.addLike)(req, res);
        expect(articleModel_1.default.findById).toHaveBeenCalledWith(req.params.articleId);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'fail',
            message: 'article not found',
        });
    }));
    it('should return 400 status if user has already liked the article', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                articleId: 'article123',
            },
            body: {
                userId: 'user456',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockArticle = {
            _id: 'article123',
            likes: ['user456'],
        };
        const spyFindById = jest.spyOn(articleModel_1.default, 'findById');
        spyFindById.mockRejectedValue(new Error('Some error'));
        yield (0, likeController_1.addLike)(req, res);
        expect(articleModel_1.default.findById).toHaveBeenCalledWith(req.params.articleId);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'fail',
            message: 'unable to like article',
        });
    }));
    it('should return 400 status if unable to like article', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                articleId: 'article123',
            },
            body: {
                userId: 'user456',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockArticlesFindById = articleModel_1.default.findById;
        mockArticlesFindById.mockRejectedValue(new Error('Some error'));
        yield (0, likeController_1.addLike)(req, res);
        expect(articleModel_1.default.findById).toHaveBeenCalledWith(req.params.articleId);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'fail',
            message: 'unable to like article',
        });
    }));
});
