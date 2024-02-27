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
const articleController_1 = require("../controllers/article/articleController");
describe("Get all articles ", () => {
    it("should get all articles", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.spyOn(articleModel_1.default, "find").mockResolvedValue([]);
        yield (0, articleController_1.getArticles)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: { articles: [] },
        });
    }));
});
describe('Create an article', () => {
    it('should create a new article', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                title: 'Hello everyone',
                image: 'https://example.com/image.jpg',
                description: 'Let us have our first first article',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        const mockNewArticle = {
            _id: '1',
            title: 'Hello World',
            image: 'https://example.com/image.jpg',
            description: 'This is a test article',
            post_date: new Date(),
            comments: [],
        };
        articleModel_1.default.create = jest.fn().mockResolvedValue(mockNewArticle);
        yield (0, articleController_1.createArticle)(req, res);
        expect(res.status).toBeTruthy();
        expect(res.json).toBeTruthy();
    }), 20000);
});
describe('Get a unique article', () => {
    it('should get a located article', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockArticle = {
            _id: '1',
            title: 'Hello World',
            image: 'https://example.com/image.jpg',
            description: 'This is a test article',
            post_date: new Date(),
            comments: [],
        };
        articleModel_1.default.findById = jest.fn().mockResolvedValue(mockArticle);
        yield (0, articleController_1.getUniqueArticle)(req, res);
        expect(res.status).toBeTruthy();
        expect(res.json).toBeTruthy();
    }));
});
describe('Delete an article', () => {
    it('should delete a located article', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockArticle = {
            _id: '1',
            title: 'Hello World',
            image: 'https://example.com/image.jpg',
            description: 'This is a test article',
            post_date: new Date(),
            comments: [],
        };
        articleModel_1.default.findByIdAndDelete = jest.fn().mockResolvedValue(mockArticle);
        yield (0, articleController_1.deleteArticle)(req, res);
        expect(res.status).toBeTruthy();
        expect(res.json).toBeTruthy();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: null,
        });
    }));
});
describe('Update a article', () => {
    it('should update a article', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: '1',
            },
            body: {
                title: 'Hey Trojans',
                image: 'https://example.com/image.jpg',
                description: 'This is a test article',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const initialArticle = {
            _id: '1',
            title: 'Hey Trojans',
            image: 'https://example.com/image.jpg',
            description: 'This is a test article',
            post_date: new Date(),
            comments: [],
        };
        const mockArticle = Object.assign(Object.assign({}, initialArticle), { save: jest.fn().mockResolvedValue(initialArticle) });
        articleModel_1.default.findById = jest.fn().mockResolvedValue(mockArticle);
        yield (0, articleController_1.updateArticle)(req, res);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);
        expect(mockArticle.title).toEqual('Hey Trojans');
        expect(mockArticle.image).toEqual('https://example.com/image.jpg');
        expect(mockArticle.description).toEqual('This is a test article');
    }));
});
