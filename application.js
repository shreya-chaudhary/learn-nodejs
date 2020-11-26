const express = require('express');
const app = express();
const winston = require('winston');
require("winston-daily-rotate-file");
const router = express.Router();

// Setting up logger using winston API , logs can be displayed at file or at console
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.sss' })
  ),
  transports: [
    // DailyRotateFile transport, which logs `undefined` on falsey value.
    new winston.transports.DailyRotateFile({
      level:'info',
      handleExceptions:true,
      filename:'./logs/all-logs.log',
      maxsize:5242880
    }),
    //logging on Console
    new winston.transports.Console({ 
      level:'debug', 
      handleExceptions:true, 
      json:false, 
      colorize:true 
    })
  ]
});

//Testing application response
app.get('/', (request, response) => response.sendStatus(200));

//using ROUTE handlers
app.use(router);
router.use('/api', require('./controllers/setup'));

let server;

//Modules defined - Server start/stop, logger, router
module.exports = {
  start(port) {
    server = app.listen(port, () => {
      console.log(`App started on port ${port}`);
      logger.info(`App started on port ${port}`);
    });
    return app;
  },
  stop() {
    server.close();
    logger.info(`App stopped on port ${port}`);
  },
  logger,
  router
};