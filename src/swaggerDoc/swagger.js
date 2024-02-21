import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My Brand API',
    description: 'API documentation for My Brand',
    version: '1.0.0',
    contact: {
      name: 'My Brand',
      email: 'irijoseph41@gmail.com"',
      url: 'https://github.com/Irirwanirira/my-brand-back-end',
    }
  },

  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http'],

  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Bearer token',
    },
  }
};

const outputFile = './swagger-output.json';
const routes = ['../routes/routes.ts'];

swaggerAutogen()(outputFile, routes, doc);