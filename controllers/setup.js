const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../api/swagger.json');
const swaggerOptions = {
  swaggerOptions: {
    validatorUrl: null
  }
};
const express = require('express');
const app = express();
const logger = require('../application');

class Service {
  constructor (app) {
    this.app = app;
  }
  setup () {
    const self = this;
    // swaggerRouter configuration
    const options = {
      controllers: {
        heartbeat: async (req, res, next) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'server running', version: '0.0.1' }));
        },
        search: async (req, res, next) => {
          controller.search(req, res, next)
        },
        create: async (req, res, next) => {
          controller.create(req, res, next)
        },
        retrieve: async (req, res, next) => {
          controller.get(req, res, next)
        },
        delete: async (req, res, next) => {
          controller.delete(req, res, next)
        }
      }
    };
    
    //swagger configuration
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
    }
}

module.exports = (app) => {
  const s = new Service(app);
  s.setup();
  return s;
}