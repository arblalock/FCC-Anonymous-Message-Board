const mongoose = require('mongoose')
const Schema = mongoose.Schema

let replySchema = new Schema({
  thread_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true},
  text: {type: String, required: true},
  created_on: {type: Date, default: new Date()},
  delete_password: {type: String, required: true},
  reported: {type: Boolean, default: false}
})

module.exports = mongoose.model('replies', replySchema)
