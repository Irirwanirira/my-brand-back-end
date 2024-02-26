import Messages from "../models/messageModel";
import {getMessages} from "../controllers/message/messageController";
import { Request, Response } from "express";

describe("Get all messages ", () => {
  it("should get all messages", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    jest.spyOn(Messages, "find").mockResolvedValue([]);
    await getMessages(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: { messages: [] },
    });
  });
});

