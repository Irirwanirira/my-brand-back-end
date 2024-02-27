import Articles from "../models/articleModel";
import {
  getArticles,
  getUniqueArticle,
  createArticle,
  deleteArticle,
  updateArticle,
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


describe('Create an article', () => {
  it('should create a new article', async () => {
    const req = {
      body: {
        title: 'Hello everyone',
        image: 'https://example.com/image.jpg',
        description: 'Let us have our first first article',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    const mockNewArticle = {
      _id: '1',
      title: 'Hello World',
      image: 'https://example.com/image.jpg',
      description: 'This is a test article', 
      post_date: new Date(),
      comments: [],
    };
    Articles.create = jest.fn().mockResolvedValue(mockNewArticle);

    await createArticle(req, res);
    expect(res.status).toBeTruthy();
    expect(res.json).toBeTruthy();
  }, 20000);
})

describe('Get a unique article', () => {
  it('should get a located article', async () => {
    const req = {
      params: {
        id: '1',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockArticle = {
      _id: '1',
      title: 'Hello World',
      image: 'https://example.com/image.jpg',
      description: 'This is a test article', 
      post_date: new Date(),
      comments: [],
    };
    Articles.findById = jest.fn().mockResolvedValue(mockArticle);

    await getUniqueArticle(req, res);
    expect(res.status).toBeTruthy();
    expect(res.json).toBeTruthy();
  });
})

describe('Delete an article', () => {
  it('should delete a located article', async () => {
    const req = {
      params: {
        id: '1',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockArticle = {
      _id: '1',
      title: 'Hello World',
      image: 'https://example.com/image.jpg',
      description: 'This is a test article', 
      post_date: new Date(),
      comments: [],
    };
    Articles.findByIdAndDelete = jest.fn().mockResolvedValue(mockArticle);

    await deleteArticle(req, res);
    expect(res.status).toBeTruthy();
    expect(res.json).toBeTruthy();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: null,
    });
  });
})

describe('Update a article', () => {
  it('should update a article', async () => {

    const req = {
      params: {
        id: '1',
      },
      body: {
        title: 'Hey Trojans',
        image: 'https://example.com/image.jpg',
        description: 'This is a test article',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const initialArticle = {
      _id: '1',
      title: 'Hey Trojans',
      image: 'https://example.com/image.jpg',
      description: 'This is a test article', 
      post_date: new Date(),
      comments: [],
    };

    const mockArticle = {
      ...initialArticle,
    save: jest.fn().mockResolvedValue(initialArticle),
    };
    Articles.findById = jest.fn().mockResolvedValue(mockArticle);
    await updateArticle(req, res);

    expect(res.status).toHaveBeenNthCalledWith(1, 200);
    expect(mockArticle.title).toEqual('Hey Trojans');
    expect(mockArticle.image).toEqual('https://example.com/image.jpg');
    expect(mockArticle.description).toEqual('This is a test article');
  })
});