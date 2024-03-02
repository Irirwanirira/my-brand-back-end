import jwt from "jsonwebtoken";
import auth from "../middlewares/authorization";
import { UNAUTHORIZED, FORBIDDEN } from "http-status";

describe("Auth Middleware", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      headers: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return unauthorized if authorization header is missing", async () => {
    await auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Unauthorized",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return unauthorized if token is missing", async () => {
    req.headers.authorization = "Bearer";
    await auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Unauthorized",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return forbidden if token is invalid", async () => {
    req.headers.authorization = "Bearer invalid_token";
    jwt.verify = jest
      .fn()
      .mockImplementation((token, secretOrPublicKey, callback) => {
        if (typeof callback === "function") {
          callback(new Error("Invalid token"), null);
        }
      });
    await auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(FORBIDDEN);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Invalid token, Error",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if token is valid", async () => {
    req.headers.authorization = "Bearer valid_token";
    jwt.verify = jest
      .fn()
      .mockImplementation((token, secretOrPublicKey, callback) => {
        if (typeof callback === "function") {
          callback(null, { id: "user_id" });
        }
      });
    await auth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should call next if user is found", async () => {
    req.headers = { authorization: "Bearer valid_token" };
    jwt.verify = jest
      .fn()
      .mockImplementation((token, secretOrPublicKey, callback) => {
        if (typeof callback === "function") {
          callback(null, { id: "user_id" });
        }
      });
    await auth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
