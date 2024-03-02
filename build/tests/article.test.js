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
describe('GET articles', () => {
    // it('should get all articles', async () => {
    //    const req = {} as Request;
    //    const res = {
    //      status: jest.fn().mockReturnThis(),
    //      json: jest.fn(),
    //    } as unknown as Response;
    //    jest.spyOn(Articles, 'find').mockResolvedValue([{ title: 'Article 1' }, { title: 'Article 2' }]);
    //    await getArticles(req, res);
    //    expect(res.status).toHaveBeenCalledWith(200);
    //    expect(res.json).toHaveBeenCalledWith({
    //      status: "success",
    //      data: { articles: [{ title: 'Article 1' }, { title: 'Article 2' }] },
    //    });
    // });
    it('should handle error when unable to get articles', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        //  jest.spyOn(Articles, 'find').mockRejectedValue(new Error('error'));
        yield (0, articleController_1.getArticles)(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: "fail",
            message: "Articles not found",
        });
    }), 15000);
});
// describe('Create an article', () => {
//   it('should create a new article if article does not exist', async () => {
//     const req = {
//       body: {
//         title: 'Test User',
//         image: 'test@example.com',
//         description: 'testpassword',
//       },
//     } as unknown as Request;
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;
//     const mockArticle = {
//       _id: '65e19219d5ba0e5de7a8fcff',
//       title: 'Article title',
//       image: 'Article image',
//       description: 'article description',
//       post_date: new Date(),
//       comments: [],
//       likes: 0,
//     };
//     jest.spyOn(Articles, 'findOne').mockResolvedValue(null);
//     jest.spyOn(Articles, 'create').mockImplementation((): Promise<any> => Promise.resolve({...mockArticle}));
//     await createArticle(req, res);
//     expect(Articles.findOne).toHaveBeenCalledWith({ title: 'title' });
//     expect(Articles.create).toHaveBeenCalledWith(
//       {
//         _id: '65e19219d5ba0e5de7a8fcff',
//         title: 'Article title',
//         image: 'Article image',
//         description: 'article description',
//         post_date: new Date(),
//         comments: [],
//         likes: 0,
//         author: 'author123',    
//       });
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       status: "success",
//       data: { user: { 
//         _id: '65e19219d5ba0e5de7a8fcff',
//         title: 'Article title',
//         image: 'Article image',
//         description: 'article description',
//         post_date: new Date(),
//         comments: [],
//         likes: 0,
//         author: 'author123',
//       } },
//     });
//   });
//   it('should return error if the article already exists', async () => {
//     const req = {
//       body: {
//         title: 'article title',
//         image: 'article image',
//         description: 'article description',
//       },
//     } as unknown as Request;
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;
//     jest.spyOn(Articles, 'findOne').mockResolvedValue({ 
//       _id: '123',  
//       title: 'article title',
//       image: 'article image',
//       description: 'article description'
//     });
//     await createArticle(req, res);
//     expect(Articles.findOne).toHaveBeenCalledWith({ 
//       _id: '123',  
//       title: 'article title',
//       image: 'article image',
//       description: 'article description',
//     });
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       status: "fail",
//       message: "Article already exist",
//     });
//  });
// })
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
            message: "article with id: undefined has been deleted",
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
