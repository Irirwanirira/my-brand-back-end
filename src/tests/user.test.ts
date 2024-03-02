import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import Users from "../models/userModels";
import { getUsers,  registerUser, loginUser, deleteUser, updateUser } from "../controllers/user/userController";

describe("GET users", ()=> {
    it('Should get all users', async()=> {
      const req = {} as Request;
      const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(Users, 'find').mockResolvedValue([{name: "Joseph"},{name: "henry"}]);
      await getUsers(req, res);
      
      expect(res.status).toHaveBeenLastCalledWith(200)
      expect(res.json).toHaveBeenLastCalledWith({
          status: "success",
          data: { users: [{name: "Joseph"},{name: "henry"}] }
      });
    });
    
    it('Should return 404 error if no user found', async()=> {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    jest.spyOn(Users, 'find').mockRejectedValue(new Error('error'))
    await getUsers(req, res);
    expect(res.status).toHaveBeenLastCalledWith(404)
    expect(res.json).toHaveBeenLastCalledWith({
      status: 'fail',
      message: 'unable to get Users'
    })
  })
});

describe("Register a user", ()=> {

  it('should register a new user if the email does not exist', async () => {
    const req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(Users, 'findOne').mockResolvedValue(null);
    jest.spyOn(bcrypt, 'genSalt').mockImplementation((): Promise<string> => Promise.resolve('salt'));
    jest.spyOn(bcrypt, 'hash').mockImplementation((): Promise<string> => Promise.resolve('hashedPassword'));
    jest.spyOn(Users, 'create').mockImplementation((): Promise<any> => Promise.resolve({
      _id: '65e19219d5ba0e5de7a8fcff',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
     }));

    await registerUser(req, res);
    expect(Users.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', 'salt');
    expect(Users.create).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com', password: 'hashedPassword' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: { user: { _id: '65e19219d5ba0e5de7a8fcff', name: 'Test User', email: 'test@example.com', password: 'hashedPassword' } },
    });
  });


  it('should return error if the email already exists', async () => {
    const req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(Users, 'findOne').mockResolvedValue({ _id: '123', name: 'Test User', email: 'test@example.com' });

    await registerUser(req, res);

    expect(Users.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "user already exist",
    });
 });
});




describe('Delete a user', () => {
    it('should delete a user', async () => {
      const req = {
        params: {
          id: '1',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
  
      const mockUser = {
        _id: '1',
        name: 'henry',
        email: 'henry@gmail.com',
        role: 'user',
        profilePhoto: 'https://example.com/image.jpg',
      };
      Users.findByIdAndDelete = jest.fn().mockResolvedValue(mockUser);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenNthCalledWith(1, 200);
      expect(res.json).toHaveBeenNthCalledWith(1, { status: 'success', data: null });
    });
})

describe('Update a user', () => {
  it('should update a user', async () => {

    const req = {
      params: {
        id: '1',
      },
      body: {
        name: 'henry',
        email: 'henry@gmail.com',
        profilePhoto: 'https://example.com/image.jpg',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const initialUserProps = {
      _id: '1',
      name: 'henry',
      email: 'henry@gmail.com',
      role: 'user',
      profilePhoto: 'https://example.com/image.jpg',
    };

    const mockUser = {
      ...initialUserProps,
    save: jest.fn().mockResolvedValue(initialUserProps),
    };
    Users.findById = jest.fn().mockResolvedValue(mockUser);
    await updateUser(req, res);

    expect(res.status).toHaveBeenNthCalledWith(1, 200);
    expect(res.json).toHaveBeenNthCalledWith(1, { status: 'success', data: { user: mockUser } });
  })

  it('should return 404 if user is not found', async () => {
    const req = {
      params: {
        id: '1',
      },
      body: {
        name: 'henry',
        email: 'henry@gmail.com',
        profilePhoto: 'https://example.com/image.jpg',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    Users.findById = jest.fn().mockResolvedValue(null);
    await updateUser(req, res);

    expect(res.status).toHaveBeenNthCalledWith(1, 404);
    expect(res.json).toHaveBeenNthCalledWith(1, { status: 'fail', message: 'user with id: 1 is not found' });
  });
});


const OK = 200;
const NOT_FOUND = 404;
const UNAUTHORIZED = 401;

describe('Login User', () => {
 const mockUser = {
    _id: 'user_id',
    email: 'test@example.com',
    password: 'hashed_password',
    name: 'Test User',
    role: 'user',
 };

 beforeEach(() => {
    jest.spyOn(Users, 'findOne').mockReset();
    jest.spyOn(bcrypt, 'compare').mockReset();
    jest.spyOn(jwt, 'sign').mockReset();
 });

 it('should return user not found if user does not exist', async () => {
    const req = { body: { email: 'nonexistent@example.com', password: 'password' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const findOneSpy = jest.spyOn(Users, 'findOne');
    findOneSpy.mockResolvedValue(null);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "user not found, Please register",
    });
 });

 it('should return incorrect password if password is wrong', async () => {
    const req = { body: { email: mockUser.email, password: 'wrong_password' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const findOneSpy = jest.spyOn(Users, 'findOne');
    findOneSpy.mockResolvedValue(mockUser);

    const bcryptCompareSpy: any = jest.spyOn(bcrypt, 'compare');
    bcryptCompareSpy.mockResolvedValue(false);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Incorrect password",
    });
 });

 it('should login user successfully and return access and refresh tokens', async () => {
    const req = { body: { email: mockUser.email, password: 'correct_password' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    } as unknown as Response;

    const findOneSpy = jest.spyOn(Users, 'findOne');
    findOneSpy.mockResolvedValue(mockUser);

    const bcryptCompareSpy: any = jest.spyOn(bcrypt, 'compare');
    bcryptCompareSpy.mockResolvedValue(true);

    const jwtSignSpy: any = jest.spyOn(jwt, 'sign');
    jwtSignSpy.mockReturnValue('access_token');
    jwtSignSpy.mockReturnValueOnce('refresh_token');
    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(OK);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        user: mockUser.name,
        accessToken: 'refresh_token',
      },
    });
 });
});
