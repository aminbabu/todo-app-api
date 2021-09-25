/**
 * Title: DB Connection Library
 * Description: Connects the applition to the database
 * Author: Amin Babu
 * Date: 09/25/2021
 */

// dependencies
const mongoose = require('mongoose');

// connection object - module scaffolding
const connection = {};

// function to establish connection with database
connection.establish = () => {
  // establish database connection
  mongoose
    .connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE}`)
    .then(() => console.log('Database connection established!'))
    .catch((err) => console.log(err));
};

// export connection object
module.exports = connection;
