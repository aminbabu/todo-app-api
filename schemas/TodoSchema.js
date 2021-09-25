/**
 * Title: Document Schemas for TODO list
 * Description: Define a starndard schema for every todo list item
 * Author: Amin Babu
 * Date: 09/25/2021
 */

// dependencies
const mongoose = require('mongoose');

// schema object - module scaffolding
const schema = {};

// todo schema
schema.todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// export schema object
module.exports = schema;
