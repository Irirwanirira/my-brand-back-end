import Articles from "../models/articleModel";
import {
  getArticles,
  getUniqueArticle,
  createArticle,
} from "../controllers/article/articleController";
import { Request, Response } from "express";

describe("Get all articles ", () => {
  it("should get all articles", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    jest.spyOn(Articles, "find").mockResolvedValue([]);
    await getArticles(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: { articles: [] },
    });
  });
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
