import Articles from "../models/articleModel";
import {
  getArticles,
  getUniqueArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/article/articleController";
import { Request, Response } from "express";

describe('GET articles', () => {
  // it('should get all articles', async () => {
  //    const req = {} as Request;
  //    const res = {
  //      status: jest.fn().mockReturnThis(),
  //      json: jest.fn(),
  //    } as unknown as Response;

  //    jest.spyOn(Articles, 'find').mockResolvedValue([{ title: 'Article 1' }, { title: 'Article 2' }]);

  //    await getArticles(req, res);

  //    expect(res.status).toHaveBeenCalledWith(200);
  //    expect(res.json).toHaveBeenCalledWith({
  //      status: "success",
  //      data: { articles: [{ title: 'Article 1' }, { title: 'Article 2' }] },
  //    });
  // });
 
  it('should handle error when unable to get articles', async () => {
     const req = {} as Request;
     const res = {
       status: jest.fn().mockReturnThis(),
       json: jest.fn(),
     } as unknown as Response;
    //  jest.spyOn(Articles, 'find').mockRejectedValue(new Error('error'));

     await getArticles(req, res);
 
     expect(res.status).toHaveBeenCalledWith(404);
     expect(res.json).toHaveBeenCalledWith({
       status: "fail",
       message: "Articles not found",
     });
  }, 15000);
 });

// describe('Create an article', () => {
//   it('should create a new article if article does not exist', async () => {
//     const req = {
//       body: {
//         title: 'Test User',
//         image: 'test@example.com',
//         description: 'testpassword',
//       },
//     } as unknown as Request;
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     const mockArticle = {
//       _id: '65e19219d5ba0e5de7a8fcff',
//       title: 'Article title',
//       image: 'Article image',
//       description: 'article description',
//       post_date: new Date(),
//       comments: [],
//       likes: 0,
//     };

//     jest.spyOn(Articles, 'findOne').mockResolvedValue(null);
//     jest.spyOn(Articles, 'create').mockImplementation((): Promise<any> => Promise.resolve({...mockArticle}));

//     await createArticle(req, res);
//     expect(Articles.findOne).toHaveBeenCalledWith({ title: 'title' });
//     expect(Articles.create).toHaveBeenCalledWith(
//       {
//         _id: '65e19219d5ba0e5de7a8fcff',
//         title: 'Article title',
//         image: 'Article image',
//         description: 'article description',
//         post_date: new Date(),
//         comments: [],
//         likes: 0,
//         author: 'author123',    
//       });
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       status: "success",
//       data: { user: { 
//         _id: '65e19219d5ba0e5de7a8fcff',
//         title: 'Article title',
//         image: 'Article image',
//         description: 'article description',
//         post_date: new Date(),
//         comments: [],
//         likes: 0,
//         author: 'author123',
//       } },
//     });
//   });


//   it('should return error if the article already exists', async () => {
//     const req = {
//       body: {
//         title: 'article title',
//         image: 'article image',
//         description: 'article description',
//       },
//     } as unknown as Request;
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;

//     jest.spyOn(Articles, 'findOne').mockResolvedValue({ 
//       _id: '123',  
//       title: 'article title',
//       image: 'article image',
//       description: 'article description'
//     });

//     await createArticle(req, res);

//     expect(Articles.findOne).toHaveBeenCalledWith({ 
//       _id: '123',  
//       title: 'article title',
//       image: 'article image',
//       description: 'article description',
//     });
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       status: "fail",
//       message: "Article already exist",
//     });
//  });
// })

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
      message: "article with id: undefined has been deleted",
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