import Messages from "../models/messageModel";
import {getMessages, createMessage, getUniqueMessage, deleteMessage} from "../controllers/message/messageController";
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


describe('Create a message', () => {
  it('should create a new message', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        message: 'Hello, this is a test message',
      },
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const mockNewMessage = {
      _id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      message: 'Hello, this is a test message',
      date: '2024-02-26',
      time: '10:00 AM',
    };
    Messages.create = jest.fn().mockResolvedValue(mockNewMessage);

    await createMessage(req as Request, res as unknown as Response);


    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: { message: mockNewMessage },
    });
  });
});

describe('Get a unique message', () => {
  it('should get a located message', async () => {
    const req = {
      params: {
        id: '1',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockMessage = {
      _id: '1',
      name: 'kim',
      email: 'kim@gmail.com',
      message: 'Hello, this is a test message',
      date: '2024-02-26',
      time: '10:00 AM',
    };
    Messages.findById = jest.fn().mockResolvedValue(mockMessage);
    await getUniqueMessage(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: { message: mockMessage },
    });
  });
})


describe('Delete a message', () => {
  it('should delete a message', async () => {
    const req = {
      params: {
        id: '1',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockMessage = {
      _id: '1',
      name: 'kim',
      email: 'kim@gmail.com',
      message: 'Hello, this is a test message',
      date: '2024-02-26',
      time: '10:00 AM',
    };
    Messages.findByIdAndDelete = jest.fn().mockResolvedValue(mockMessage);
    await deleteMessage(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: null,
    });
  });
})