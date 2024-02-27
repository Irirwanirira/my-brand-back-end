import Users from "../models/userModels";
import { getUsers,  registerUser, getUniqUser, deleteUser, updateUser } from "../controllers/user/userController";
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

describe('Create a user', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          name: 'henry',
          email: 'henry@example.com',
          password: 'henry123.',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;
  
      const mockNewUser = {
        _id: '1',
        name: 'henry',
        email: 'henry@example.com',
        password: 'henry123.',
        role: 'user',
        profilePhoto: 'https://example.com/image.jpg',
      };
      Users.create = jest.fn().mockResolvedValue(mockNewUser);
  
      await registerUser(req as Request, res as unknown as Response);
  
      expect(res.status).toBeDefined();
      expect(res.json).toBeDefined();
    }, 20000);
});

describe('Get a unique user', () => {
    it('should get a located user', async () => {
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
      Users.findById = jest.fn().mockResolvedValue(mockUser);

      await getUniqUser(req, res);

      expect(res.status).toHaveBeenNthCalledWith(1, 200);
      expect(res.json).toHaveBeenNthCalledWith(1, { status: 'success', data: { user: mockUser } });
    }
  );
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
});
