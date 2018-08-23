var express = require('express')
var router = express.Router()
var apiController = require('../controllers/apiController')

router.get('/threads/:board', apiController.getThread)
router.post('/threads/:board', apiController.postThread)
router.get('/replies/:board', apiController.getReplies)
router.post('/replies/:board', apiController.postReplies)
module.exports = router
