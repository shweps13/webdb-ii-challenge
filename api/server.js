const express = require('express');
const helmet = require('helmet');

const carRouter = require('./carRouter.js');

const server = express();

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Was method "${req.method}" to address "${req.path}"`);
    next();
}

server.use(helmet());
server.use(express.json());
server.use(logger);
server.use('/api/cars', carRouter);

server.get('/', (req, res) => {
    res.send('<h3>Hello from Heorhiis server!</h3>');
  });

module.exports = server;
