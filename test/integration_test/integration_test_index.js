const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect
const app = require('../../app')
const TodoSchema = require('../../models/todo_schema')
const mongoose = require('mongoose')
const sinon = require('sinon')
chai.use(chaiHttp)

describe('todo', () => {

  describe('/GET /', () => {
    it('it should get a todo', async () => {
      const res = await chai.request(app)
        .get('/')
        .send()
      res.should.have.status(200)
      res.body.should.be.a('array')
    })
  })

  describe('/GET /:id', () => {
    let todoId
    let Todo
    beforeEach(async function () {
      Todo = mongoose.model('Todo', TodoSchema, 'todos')
      const todo = {
        text: 'hello world',
        completed: false,
      }
      savedTodo = new Todo(todo)
      todoId = savedTodo.id
      await savedTodo.save()
    })

    it('it should get a todo with an id', async () => {
      const res = await chai.request(app)
        .get('/5f219be15a831937bb1b5dbb')
        .send()
      res.should.have.status(200)
      res.body.should.be.a('object')
      expect(res.body).to.have.property("text")
      expect(res.body).to.have.property("completed")
    })

    afterEach(async function () {
      await Todo.findByIdAndDelete(todoId, useFindAndModify = false)
    })



  })

  describe('/DELETE /:id', () => {

    let todoId
    let Todo
    beforeEach(async function () {
      Todo = mongoose.model('Todo', TodoSchema, 'todos')
      const todo = {
        text: 'hello world',
        completed: false,
      }
      savedTodo = new Todo(todo)
      todoId = savedTodo.id
      await savedTodo.save()
    })

    it('it should delete a todo', async () => {
      const res = await chai.request(app)
        .delete(`/${todoId}`)
        .send()
      res.should.have.status(204)
    })

    afterEach(async function () {
      await Todo.findByIdAndDelete(todoId, useFindAndModify = false)
    })

  })

  describe('/PUT /:id', () => {

    let todoId
    let Todo
    let todo = {
      text: 'hello world',
      completed: false,
    }
    beforeEach(async function () {
      Todo = mongoose.model('Todo', TodoSchema, 'todos')

      savedTodo = new Todo(todo)
      todoId = savedTodo.id
      await savedTodo.save()
    })

    it('it should put a todo', async () => {
      const res = await chai.request(app)
        .put(`/${todoId}`)
        .send({ text: 'hello worlds', completed: true })

      res.should.have.status(200)
    })

    afterEach(async function () {
      await Todo.findByIdAndDelete(todoId, useFindAndModify = false)
    })

  })

  describe('/POST /:id', () => {
    let todoId
    let Todo = mongoose.model('Todo', TodoSchema, 'todos')

    it('it should create a todo', async () => {
      const res = await chai.request(app)
        .post('/')
        .send({ text: 'hello worlds', completed: true })

      todoId = res.body.id
      res.should.have.status(201)
      res.body.should.be.a('object')
      expect(res.body).to.have.property("text")
      expect(res.body).to.have.property("completed")
    })

    afterEach(async function () {
      await Todo.findByIdAndDelete(todoId, useFindAndModify = false)
    })

  })

})


