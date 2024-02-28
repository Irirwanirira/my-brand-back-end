import { Request, Response } from "express";
import Articles from "../models/articleModel";
import { addComment } from "../controllers/comment/commentController";

describe("addComment function", () => {
  
    it("should return 400 if the article is not found", async () => {
      const req = {
        params: { id: "non_existing_article_id" },
        body: { comment: "Test comment", author: "Test author" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      Articles.findById = jest.fn().mockResolvedValueOnce(null);

      await addComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        message: "unable to add comment",
      });
    });

    it("should return 400 if unable to add comment", async () => {
      const req = {
        params: { id: "article_id" },
        body: { comment: "Test comment", author: "Test author" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockedArticle = {
        _id: "article_id",
        comments: [],
        save: jest.fn().mockRejectedValueOnce(new Error("Database error")),
      };
      Articles.findById = jest.fn().mockResolvedValueOnce(mockedArticle);

      await addComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        message: "unable to add comment",
      });
    });
  });
