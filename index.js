/**
 * Title: TODO API Project
 * Description: A RESTFul API project for todo application
 * Author: Amin Babu
 * Date: 09/25/2021
 */

// dependencies
require('dotenv').config();
const express = require('express');
const connection = require('./lib/connectdb');
const todoHandler = require('./routeHandlers/todoHandlers/todoHandler');

// app object - module scaffolding
const app = express();

// database connection
connection.establish();

// use todo route
app.use(express.json());
app.use('/todo', todoHandler);

// custom error handler
app.use((err, req, res, next) => {
  if (req.headersSent) {
    next(err);
  } else if (err.message) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json(err);
  }
});

// define server listening port
app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`Server is running on port ${process.env.PORT}`);
  } else {
    console.log(err);
  }
});

// export app object
module.exports = app;
