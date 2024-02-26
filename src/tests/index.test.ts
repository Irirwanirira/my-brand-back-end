import request from 'supertest';
import app from '../app';
import server from '../index';

describe('Test Express App', () => {
    afterAll(async () => {
        await server.close();
    });

    test('It should respond with status code 200 and a welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ Message: 'Welcome to my brand new API, I hope you enjoy it.' });
    });

    test('It should respond with status code 404 and an error message', async () => {
        const response = await request(app).get('/random');
        expect(response.status).toBe(404);
    });
});

