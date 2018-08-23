const bcrypt = require('bcrypt')
const thread = require('../models/thread')
const reply = require('../models/reply')
const mongoose = require('mongoose')

exports.getThread = function (req, res, next) {
  // res.redirect(`/b/${req.params.board}`)
  res.send('not implemented yet')
}

exports.getReplies = function (req, res, next) {
  res.send('not implemented yet')
}

exports.postThread = function (req, res, next) {
  bcrypt.hash(req.body.delete_password, Number(process.env.SALT_ROUNDS))
    .then((hash) => {
      let nThread = req.body
      nThread.delete_password = hash
      let newThread = thread(nThread)
      newThread.save((err, doc) => {
        if (err) return console.error(err)
        return res.redirect(`/b/${req.body.board}`)
      })
    })
    .catch(error => console.error(error))
}

exports.postReplies = function (req, res, next) {
  console.log(req.body)
  let board = null
  if (!mongoose.Types.ObjectId.isValid(req.body.thread_id)) return res.send('Invalid ID')
  thread.findById(req.body.thread_id).exec()
    .then((doc) => {
      if (!doc) return res.send('Thread not found')
      board = doc.board
      return bcrypt.hash(req.body.delete_password, Number(process.env.SALT_ROUNDS))
    })
    .then((hash) => {
      let nReply = req.body
      nReply.delete_password = hash
      delete nReply.board
      let newReply = reply(nReply)
      console.log(nReply.delete_password)
      return newReply.save()
    })
    .then((nReply) => {
      thread.findByIdAndUpdate(req.body.thread_id, {$push: {replies: nReply._id},
        bumped_on: new Date()}, {new: true}).exec()
    })
    .then((doc) => {
      return res.redirect(`/b/${board}/${req.body.thread_id}`)
    })
    .catch(error => console.error(error))
}
