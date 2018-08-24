/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http')
var chai = require('chai')
var assert = chai.assert
var server = require('../server')
var expect = chai.expect
chai.use(chaiHttp)
const mongoose = require('mongoose')
let thread = require('../models/thread')

suite('Functional Tests', function () {
  let testPass = 'testpass'
  let tText = 'test thread'
  let rText = 'test reply'
  let board = 'test'
  suite('API ROUTING FOR /api/threads/:board', function () {
    let testThID
    let testThread = {delete_password: testPass, board: board, text: tText}
    let testReply = {delete_password: testPass, board: board, text: rText}

    suite('POST', function () {
      test('add thread', function (done) {
        chai.request(server)
          .post('/api/threads/test')
          .send(testThread)
          .end(function (err, res) {
            if (err) return console.log(err)
            assert.equal(err, null)
            assert.equal(res.status, 200, 'Server response')
            expect(res).to.redirect
            testThID = res.redirects[0].split('id=')[1]
            done()
          })
      })
    })

    suite('GET', function () {
      test('get threads', function (done) {
        chai.request(server)
          .get('/api/threads/test')
          .end(function (err, res) {
            if (err) return console.log(err)
            assert.equal(res.status, 200, 'Server response')
            assert.isAbove(res.body.length, 0, 'Response contains threads')
            assert.property(res.body[0], 'created_on', 'Thread has a date created date')
            assert.property(res.body[0], 'bumped_on', 'Thread has a bumped date')
            assert.property(res.body[0], 'board', 'Thread has a date created date')
            assert.property(res.body[0], 'text', 'Thread has text')
            assert.property(res.body[0], 'replies', 'Thread has replies')
            done()
          })
      })
    })

    suite('DELETE', function () {
      test('delete threads', function (done) {
        chai.request(server)
          .delete('/api/threads/test')
          .send({thread_id: testThID, delete_password: testPass})
          .end(function (err, res) {
            if (err) return console.log(err)
            assert.equal(res.status, 200, 'Server response')
            assert.equal(res.text, 'success')
            done()
          })
      })
    })
    // START HERE****************************************
    // suite('PUT', function () {
    //
    // })
  })

  // suite('API ROUTING FOR /api/replies/:board', function () {
  //   suite('POST', function () {
  //
  //   })
  //
  //   suite('GET', function () {
  //
  //   })
  //
  //   suite('PUT', function () {
  //
  //   })
  //
  //   suite('DELETE', function () {
  //
  //   })
  // })
})
