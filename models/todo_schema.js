const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    text: String,
    completed: Boolean,
  })
  
  TodoSchema.virtual('id').get(function () {
    return this._id.toHexString()
  })
  
  TodoSchema.set('toJSON', {
    virtuals: true
  })


module.exports = TodoSchema
