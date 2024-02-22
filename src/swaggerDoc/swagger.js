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
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securitySchemes:{
    bearerAuth: {
      type: 'http',
      scheme: 'bearer'
    }
  },
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-KEY',
      description: 'Bearer token',
    },
  },
  tags: [
    {
      name: 'Auth',
      description: 'Authentication and authorization endpoints',
    },
    {
      name: 'Users',
      description: 'User endpoints',
    },
    {
      name: 'Posts',
      description: 'Post endpoints',
    },
    {
      name: 'Comments',
      description: 'Comment endpoints',
    },
  ],

  definitions: {
    User: {
      type: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        username: {
          type: 'string',
          example: 'johndoe',
        },
        email: {
          type: 'string',
          example: 'johndoe@gmail.com',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
    }


  },
  security: [
    {
      JWT: [],
    },
  ],
  externalDocs: {
    description: 'Find out more about My Brand',
    url: ''
  }
};

const outputFile = './swagger-output.json';
const routes = ['../routes/routes.ts'];

swaggerAutogen()(outputFile, routes, doc);