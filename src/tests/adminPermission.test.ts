import permit from "../middlewares/adminPermission";
import { UNAUTHORIZED } from "http-status";

describe('Permit Middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should permit access for admin role', () => {
    req.body.role = 'admin';
    permit('admin')(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should permit access for allowed roles', () => {
    req.body.role = 'user';
    permit('user', 'editor')(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should not permit access for unauthorized roles', () => {
    req.body.role = 'guest';
    permit('user', 'editor')(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Only admin can access this route",
    });
  });

  it('should return unauthorized if role is not provided in request body', () => {
    permit('user', 'editor')(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Only admin can access this route",
    });
  });
});