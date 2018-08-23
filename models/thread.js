const mongoose = require('mongoose')
const Schema = mongoose.Schema

let threadSchema = new Schema({
  text: {type: String, required: true},
  board: {type: String, required: true},
  created_on: {type: Date, default: new Date()},
  bumped_on: {type: Date, default: new Date()},
  reported: {type: Boolean, default: false},
  delete_password: {type: String, required: true},
  replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reply'}]
})

module.exports = mongoose.model('threads', threadSchema)
