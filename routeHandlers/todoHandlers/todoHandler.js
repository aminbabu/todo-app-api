/**
 * Title: TODO Handler
 * Description: Hadnles all the route related to the application
 * Author: Amin Babu
 * Date: 09/25/2021
 */

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const { todoSchema } = require('../../schemas/TodoSchema');

// create document model
const Todo = mongoose.model('Todo', todoSchema);

// todo object - module scaffolding
const todo = express.Router();

// // get a todo list
todo.get('/:id', async (req, res) => {
  try {
    const doc = await Todo.findById({ _id: req.params.id }).select({
      _id: 0,
      __v: 0,
    });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({
      error: 'Internal server side problem!',
    });
  }
});

// // get all the todo lists
todo.get('/', async (req, res) => {
  try {
    const docs = await Todo.find(req.body).select({
      _id: 0,
      __v: 0,
    });
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({
      error: 'Internal server side problem!',
    });
  }
});

// post a todo list
todo.post('/', async (req, res) => {
  try {
    const newTodoItem = new Todo(req.body);
    const doc = await newTodoItem.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({
      error: 'Internal server side problem!',
    });
  }
});

// post todo lists
todo.post('/all', async (req, res) => {
  try {
    const docs = await Todo.insertMany(req.body);
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({
      error: 'Internal server side problem!',
    });
  }
});

// update a todo list
todo.put('/:id', async (req, res) => {
  try {
    const options = { new: true };
    const doc = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      options
    ).select({
      _id: 0,
      __v: 0,
    });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({
      error: 'Internal server side problem!',
    });
  }
});

// delete a todo list
todo.delete('/:id', async (req, res) => {
  try {
    const doc = await Todo.findByIdAndDelete({ _id: req.params.id }).select({
      _id: 0,
      __v: 0,
    });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({
      error: 'Internal server side problem!',
    });
  }
});

// delete all the todo lists
todo.delete('/', async (req, res) => {
  try {
    const docs = await Todo.deleteMany(req.body).select({ _id: 0, __v: 0 });
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({
      error: 'Internal server side problem!',
    });
  }
});

// export todo object
module.exports = todo;
