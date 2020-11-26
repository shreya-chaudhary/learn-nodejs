const Server = require('./application');

//start the application server on port 8000
Server.start(process.env.PORT || 8000);