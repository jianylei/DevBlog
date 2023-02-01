const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(postsController.getAllPosts)
    .post(verifyJWT, postsController.createNewPost)
    .patch(postsController.updatePost)
    .delete(verifyJWT, postsController.deletePost)

router.route('/following/:id').get(verifyJWT, postsController.getFollowingPosts)

router.route('/view').patch(postsController.updateView)

router.route('/all').delete(postsController.deleteALLPost)

module.exports = router