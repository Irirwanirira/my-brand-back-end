import messageValidator from "../controllers/message/messageValidator";
import articleValidator from "../controllers/article/articleValidator";
import {
  userValidator,
  loginValidator,
} from "../controllers/user/userValidator";
import { Request, Response, response } from "express";
import Joi, {ObjectSchema} from "joi";
import commentValidator from "../controllers/comment/commentValidator";

// describe("Article Validator Middleware", async() => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let next: jest.Mock;

//     // mockValidate.mockReturnValue({ error: null });

//     // await articleValidator(req as Request, res, nextFunction);

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should pass validation for valid article", () => {
//     req.body = {
//       title: "Test Title",
//       image: "test.jpg",
//       description: "Test Description",
//     };
//     articleValidator(req as Request, res as Response, next);
//     expect(next).toHaveBeenCalled();
//     expect(res.status).not.toHaveBeenCalled();
//   });

//   it.each([
//     ["title", "image", "description", "author"],
//     ["title", "description", "author"],
//     ["image", "description", "author"],
//     ["title", "image", "author"],
//   ])(
//     "should return 400 if %s is missing",
//     (missingField: string, ...otherFields: string[]) => {
//       const payload: any = {};
//       for (const field of otherFields) {
//         payload[field] = "Test";
//       }
//       req.body = payload;
//       articleValidator(req as Request, res as Response, next);
//       expect(next).not.toHaveBeenCalled();
//       expect(res.status).toHaveBeenCalledWith(400);
//     }
//   );
// });

describe("User Validator Middleware", () => {
  it("should call next() if input is valid", () => {
    const req = {
      body: {
        name: "John",
        email: "john@example.com",
        password: "password123",
      },
    } as Request;
    const res = {} as unknown as Response;
    const next = jest.fn();

    userValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 400 status with error message if required fields are missing", () => {
    const req = { body: { name: "John" } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 status with error message if input is invalid", () => {
    const req = {
      body: { name: "John", email: "invalidemail", password: "short" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    userValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
    expect(next).not.toHaveBeenCalled();
  });

  describe("loginValidator middleware", () => {
    it("should call next() if input is valid", () => {
      const req = {
        body: { email: "john@example.com", password: "password123" },
      } as Request;
      const res = {} as unknown as Response;
      const next = jest.fn();

      loginValidator(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should return 400 status with error message if required fields are missing", () => {
      const req = { body: { email: "john@example.com" } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const next = jest.fn();

      loginValidator(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        message: expect.any(String),
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 400 status with error message if input is invalid", () => {
      const req = {
        body: { email: "invalidemail", password: "short" },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      loginValidator(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        message: expect.any(String),
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("Comment Validator Middleware", () => {
    it("should call next() if input is valid", () => {
      const req = {
        body: { name: "John", email: "john@example.com", message: "Hello" },
      };
      const res = {} as Response;
      const next = jest.fn();

      messageValidator(req as Request, res, next);

      expect(next).toHaveBeenCalled();
    });
    it("should return 400 status with error message if input is invalid", () => {
      const req = {
        body: { name: "John", email: "invalidemail", message: "Hello" },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      messageValidator(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        message: expect.any(String),
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});

it("should return 400 status with error message if required fields are missing", () => {
  const req = { 
    body: { 
      content: "John",
      author: "123"
    } 
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  commentValidator(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    status: "fail",
    message: expect.any(String),
  });
  expect(next).not.toHaveBeenCalled();
});

it("should return 400 status with error message if input is invalid", () => {
  const req = {
    body: { 
      content: "John", 
      author: "123"
    },
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  commentValidator(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    status: "fail",
    message: expect.any(String),
  });
  expect(next).not.toHaveBeenCalled();
});
