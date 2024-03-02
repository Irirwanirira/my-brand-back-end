import { Request, Response } from 'express';
import {addLike}  from '../controllers/like/likeController';
import Articles from '../models/articleModel';
import Likes from '../models/likeModels';

describe('addLike function', () => {
  it('should add a like to an existing article', async () => {
    const req = {
      params: {
        articleId: 'article123',
      },
      body: {
        userId: 'user456',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockArticle = {
      _id: 'article123',
      likes: [],
      save: jest.fn(),
    };

    const spyFindById = jest.spyOn(Articles, 'findById');
    spyFindById.mockResolvedValue(mockArticle);

    await addLike(req, res);

    expect(Articles.findById).toHaveBeenCalledWith(req.params.articleId);
    expect(mockArticle.likes).toContain(req.body.userId);
    expect(mockArticle.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Your like counts',
    });
  });

  it('should return 404 status if article is not found', async () => {
    const req = {
      params: {
        articleId: 'nonexistentArticle',
      },
      body: {
        userId: 'user456',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const spyFindById = jest.spyOn(Articles, 'findById');
    spyFindById.mockResolvedValue(null);

    await addLike(req, res);

    expect(Articles.findById).toHaveBeenCalledWith(req.params.articleId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'article not found',
    });
  });

  it('should return 400 status if user has already liked the article', async () => {
    const req = {
      params: {
        articleId: 'article123',
      },
      body: {
        userId: 'user456',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockArticle = {
      _id: 'article123',
      likes: ['user456'], 
    };


    const spyFindById = jest.spyOn(Articles, 'findById');
    spyFindById.mockRejectedValue(new Error('Some error'));

    await addLike(req, res);

    expect(Articles.findById).toHaveBeenCalledWith(req.params.articleId);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'unable to like article',
    });
  });

  it('should return 400 status if unable to like article', async () => {
    const req = {
      params: {
        articleId: 'article123',
      },
      body: {
        userId: 'user456',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockArticlesFindById = Articles.findById as jest.Mock;
    mockArticlesFindById.mockRejectedValue(new Error('Some error'));

    await addLike(req, res);

    expect(Articles.findById).toHaveBeenCalledWith(req.params.articleId);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'unable to like article',
    });
  });
});
