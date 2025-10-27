<<<<<<< HEAD
const router = require('express').Router()
const commentctrl = require('../Controllers/CommentController')
const middleware = require('../middleware')

=======
const router = require("express").Router()
const commentctrl = require("../Controllers/CommentController")
const middleware = require("../middleware/index")
>>>>>>> 5d06fac74c1f2f3b7624c81649336c2dd2ff546b
router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.getComments
)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.createComments
)

router.put(
  '/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.putComments
)

router.delete(
  '/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.deleteComments
)

module.exports = router
