const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')

router.route('/')
    .get(postsController.getAllPosts)
    .post(postsController.createNewPost)
    .patch(postsController.updatePost)
    .delete(postsController.deletePost)

router.route('/status').patch(postsController.updatePostStatus)

module.exports = router