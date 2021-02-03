const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect
const app = require('../../app')
const mongoose = require('mongoose')
const sinon = require('sinon')
chai.use(chaiHttp)

describe('todo', () => {

  describe('/GET /:id', () => {
    it('it should get a todo with an id', async () => {
      sinon.stub(mongoose.Model, 'findOne')
        .onFirstCall()
        .returns(
            {
                "_id": "5f219be15a831937bb1b5dbb",
                "text": "hello world",
                "completed": false,
                "__v": 0,
                "id": "5f219be15a831937bb1b5dbb"
            }
        )

        const res = await chai.request(app)
        .get('/5f219be15a831937bb1b5dbb')
        .send()
      res.should.have.status(200)
      res.body.should.be.a('object')
      expect(res.body).to.have.property("text")
      expect(res.body).to.have.property("completed")
    })
  })

  describe('/GET /', () => {
    it('it should get a todo', async () => {
      sinon.stub(mongoose.Model, 'find')
        .onFirstCall()
        .returns(
            [{
                "_id": "5f219be15a831937bb1b5dbb",
                "text": "hello world",
                "completed": false,
                "__v": 0,
                "id": "5f219be15a831937bb1b5dbb"
            }]
        )

      const res = await chai.request(app)
        .get('/')
        .send()
      res.should.have.status(200)
      res.body.should.be.a('array')
      expect(res.body).to.have.length(1)
    })
  })

  describe('/DELETE /:id', () => {
    it('it should delete a todo', async () => {
      sinon.stub(mongoose.Model, 'findByIdAndDelete')
        .onFirstCall()
        .returns(
            {
                "_id": "5f219be15a831937bb1b5dbb",
                "text": "hello world",
                "completed": false,
                "__v": 0,
                "id": "5f219be15a831937bb1b5dbb"
            }
        )

      const res = await chai.request(app)
        .delete('/5f219be15a831937bb1b5dbb')
        .send()
      res.should.have.status(204)
    })
  })

  describe('/PUT /:id', () => {
    it('it should put a todo', async () => {
      sinon.stub(mongoose.Model, 'findByIdAndUpdate')
        .onFirstCall()
        .returns(
            {
                "_id": "5f219be15a831937bb1b5dbb",
                "text": "hello world",
                "completed": false,
                "__v": 0,
                "id": "5f219be15a831937bb1b5dbb"
            }
        )

      const res = await chai.request(app)
        .put('/5f219be15a831937bb1b5dbb')
        .send()
      res.should.have.status(200)
    })
  })

  describe('/POST /:id', () => {
    it('it should create a todo', async () => {
      sinon.stub(mongoose.Model.prototype, 'save')
        .onFirstCall()
        .returns(
            {
                "_id": "5f219be15a831937bb1b5dbb",
                "text": "hello world",
                "completed": false,
                "__v": 0,
                "id": "5f219be15a831937bb1b5dbb"
            }
        )

      const res = await chai.request(app)
        .post('/')
        .send()
      res.should.have.status(201)
      res.body.should.be.a('object')
      expect(res.body).to.have.property("text")
      expect(res.body).to.have.property("completed")
    })
  })

})


