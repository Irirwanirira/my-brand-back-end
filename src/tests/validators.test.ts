import articleValidator from "../controllers/article/articleValidator";
import { userValidator } from "../controllers/user/userValidator";
import { Request, Response } from "express";

describe('Article Validator Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass validation for valid article', () => {
    req.body = { title: 'Test Title', image: 'test.jpg', description: 'Test Description' };
    articleValidator(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it.each([
    ['title', 'image', 'description'],
    ['title', 'description'],
    ['image', 'description'],
    ['title', 'image'],
  ])('should return 400 if %s is missing', (missingField: string, ...otherFields: string[]) => {
    const payload: any = {};
    for (const field of otherFields) {
      payload[field] = 'Test';
    }
    req.body = payload;
    articleValidator(req as Request, res as Response, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('User Validator Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;
    
    beforeEach(() => {
        req = { body: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    // it('should pass validation for valid user', () => {
    //     req.body = { email: 'henry@gmail.com', password: 'password' };
    //     userValidator(req as Request, res as Response, next);
    //     expect(next).toHaveBeenCalled();
    //     expect(res.status).not.toHaveBeenCalled();
    // });

    it.each([
        ['email', 'password'],
        ['email'],
        ['password'],
    ])('should return 400 if %s is missing', (missingField: string, ...otherFields: string[]) => {
        const payload: any = {};
        for (const field of otherFields){
            payload[field] = 'Test';
        }
        req.body = payload;
        userValidator(req as Request, res as Response, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
})

