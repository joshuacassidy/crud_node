var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const TodoSchema = require('../models/todo_schema')

router.get('/', async function (req, res, next) {
  const Todo = mongoose.model('Todo', TodoSchema, 'todos')
  const todos = await Todo.find()

  res.json(todos);
});

router.get('/:id', async function (req, res, next) {
  try {
    const Todo = mongoose.model('Todo', TodoSchema, 'todos')
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
      return res.status(404).json({})
    }

    return res.status(200).json(todo)

  } catch (error) {
    res.json({ error });
  }

});

router.post('/', async function (req, res, next) {
  try {
    const Todo = mongoose.model('Todo', TodoSchema, 'todos')

    const todo = {
      text: req.body.text,
      completed: req.body.completed,
    }

    const savedTodo = await new Todo(todo).save()
    res.status(201).json(savedTodo);
  } catch (e) {
    res.json({ error });
  }

});

router.delete('/:id', async function (req, res, next) {
  try {
    const Todo = mongoose.model('Todo', TodoSchema, 'todos')
    const deletedProduct = await Todo.findByIdAndDelete(req.params.id, useFindAndModify = false)
    if (deletedProduct === null) {
      return res.status(404).json({})
    }

    return res.status(204).json({})
  } catch (error) {
    res.status(500).json({ error })
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const Todo = mongoose.model('Todo', TodoSchema, 'todos')

    const todo = {
      text: req.body.text,
      completed: req.body.completed,
    }
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, todo)
    res.json(updateTodo);
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
