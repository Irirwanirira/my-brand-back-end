import request from 'supertest';
import express, { Application } from 'express';
import myServer from '../server';

describe('My Server', () => {
    let app: Application;

    beforeEach(() => {
        app = express();
        myServer(app);
    });

    it('responds with welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ Message: 'Welcome to my brand new API, I hope you enjoy it.' });
    });
});