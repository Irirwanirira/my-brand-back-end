import { Request, Response } from "express";
import Articles from "../models/articleModel";
import Comments from "../models/commentModel";
import { addComment } from "../controllers/comment/commentController";

describe('Add a comment', () => {
  it('should add a comment to an existing article', async () => {
    const req = {
      body: {
        content: 'This is a comment content',
        userId: 'user123',
      },
      params: {
        articleId: 'article456',
      },
    } as unknown as Request; 
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response; 

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

    Articles.findById = jest.fn().mockResolvedValue(mockArticle);

    Comments.create = jest.fn().mockResolvedValue(mockComment);

    await addComment(req, res);

    expect(Articles.findById).toHaveBeenCalledWith(req.params.articleId);
    expect(Comments.create).toHaveBeenCalledWith({
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
  });

  it('should return error if article does not exist', async () => {
    const req = {
      body: {
        content: 'This is a comment content',
        userId: 'user123',
      },
      params: {
        articleId: 'article456',
      },
    } as unknown as Request; 
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response; 

    Articles.findById = jest.fn().mockResolvedValue(null);

    await addComment(req, res);

    expect(Articles.findById).toHaveBeenCalledWith(req.params.articleId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'article not found',
    });
  });

  it('should return error if unable to add comment', async () => {
    const req = {
      body: {
        content: 'This is a comment content',
        userId: 'user123',
      },
      params: {
        articleId: 'article456',
      },
    } as unknown as Request; 
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response; 


    const mockArticle = {
      _id: 'article456',
    };

    Articles.findById = jest.fn().mockResolvedValue(mockArticle);

    Comments.create = jest.fn().mockRejectedValue(new Error('Some error'));

    await addComment(req, res);

    expect(Articles.findById).toHaveBeenCalledWith(req.params.articleId);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'unable to add comment',
    });
  });
});