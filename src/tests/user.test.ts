import Users from "../models/userModels";
import { getUsers } from "../controllers/user/userController";
import { Request, Response } from "express";

describe("GET users", ()=> {
    it('Should get al users', async()=> {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        jest.spyOn(Users, 'find').mockResolvedValue([]);
        await getUsers(req, res);
        expect(res.status).toHaveBeenLastCalledWith(200)
        expect(res.json).toHaveBeenLastCalledWith({
            status: "success",
            data: { users: [] }
        });
    });
});