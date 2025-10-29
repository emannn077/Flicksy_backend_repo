const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware/index')

// Get user profile
router.get(
  '/profile/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserProfile
)

// Update user profile
router.put(
  '/profile/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateProfile
)

router.get(
  '/profile/:id/posts',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserPosts
)

router.put(
  '/:id/addPoints',
  middleware.stripToken,
  middleware.verifyToken,
  async (req, res) => {
    const { id } = req.params
    const { points } = req.body
    try {
      const user = await controller.AddPoints(id, points)
      res.json(user)
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
)
module.exports = router
