const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)


router.route('/:username')
    .get(usersController.getUserByUsername)

router.route('/follow/:username')
    .patch(usersController.followUser)

router.route('/unfollow/:username')
    .patch(usersController.unFollowUser)

module.exports = router