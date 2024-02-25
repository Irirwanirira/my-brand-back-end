import request from 'supertest';
import app from '../app';

describe('When our app is connected', () => {
    test('It should respond with status code 200 and a welcome message',async()=> {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ Message: 'Welcome to my brand new API, I hope you enjoy it.' });
    })
});

describe("When our app is not connected", () => {
    
});