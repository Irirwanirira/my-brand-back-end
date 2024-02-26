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
// jest.mock("../models/articleModel", () => ({
//   findOne: jest.fn(),
//   create: jest.fn(),
// }));
// describe("Create article", () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let next: jest.Mock;
//   beforeEach(() => {
//     req = {
//       body: {
//         title: "welcome to software development",
//         image: "image",
//         description: "Say bye to your bed!",
//       },
//     } as Partial<Request>;
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//       send: jest.fn(),
//     };
//     next = jest.fn();
//   });
//   test("should create an article", async () => {
//     (Articles.findOne as jest.Mock).mockResolvedValue(null);
//     const mockArticle = {
//       _id: 1,
//       title: "welcome to software development",
//       image: "image",
//       description: "Say bye to your bed!",
//     };
//     (Articles.create as jest.Mock).mockResolvedValue(mockArticle);
//     await createArticle(req as Request, res as Response);
//     expect(Articles.findOne).toHaveBeenCalledWith({
//       title: req.body.title,
//       description: req.body.description,
//     });
//     expect(Articles.create).toHaveBeenCalledWith({
//       title: req.body.title,
//       image: req.body.image,
//       description: req.body.description,
//       date: expect.any(Date),
//       comments: [],
//     });
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json)?.toHaveBeenCalledWith({
//       status: "success",
//       data: { article: mockArticle },
//     });
//   });
// });
