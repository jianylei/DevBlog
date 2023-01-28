const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models/User')
const Post = require('../models/Post')
const { STATUS, ROLES } = require('../config/constants') 
const { wordCntToTime, wordCount, formatTitle } = require('../utils/utils')
const { removePostDirByName } = require('../utils/postControllerUtils')

// @desc Get all post
// @route GET /post
// @access Public
const getAllPosts = async (req, res) => {
    const posts = await Post.find({ status: STATUS.Approved }).sort({_id:-1}).lean()

    if (!posts?.length) return res.status(400).json({ message: 'No posts found' })

    // Add username and estimated read time to each post before sending the response 
    const postWithUser = await Promise.all(posts.map(async (post) => {
        const str = post.title + ' ' + post.subHeading + ' ' + post.content
        const wordCnt = wordCount(str)
        const readTime = wordCntToTime(wordCnt)
        const user = await User.findById(post.user).lean().exec()
        const name = user ? user.username : '[deleted]'
        return { ...post, author: name, readTime: readTime }
    }))

    res.json(postWithUser)
}

// @desc Get pending post
// @route GET /post/pending
// @access Public
const getPendingPosts = async (req, res) => {
    const posts = await Post.find({ status: STATUS.Pending }).lean()

    if (!posts?.length) return res.status(400).json({ message: 'No posts found' })

    // Add username and estimated read time to each post before sending the response 
    const postWithUser = await Promise.all(posts.map(async (post) => {
        const str = post.title + ' ' + post.subHeading + ' ' + post.content
        const wordCnt = wordCount(str)
        const readTime = wordCntToTime(wordCnt)
        const user = await User.findById(post.user).lean().exec()
        const name = user ? user.username : '[deleted]'
        return { ...post, author: name, readTime: readTime }
    }))

    res.json(postWithUser)
}

// @desc Create new post
// @route POST /post
// @access Private
const createNewPost = async (req, res) => {
    const { user, title, subHeading, content, cover, tags } = req.body
    const { role } = req.userInfo
    // Confirm data
    if (!user || !title || !subHeading || !content) {
        return res.status(400).json({ message: 'Please enter all required fields' })
    }

    // Check for duplicate
    const duplicate = await Post.findOne({ title })
        .collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) return res.status(409).json({ message: 'Duplicate post title' })

    // Create and store new post
    const postCover = cover === '' ? undefined : cover
    const status = role === ROLES.Admin || role === ROLES.Moderator
        ? STATUS.Approved
        : STATUS.Pending

    const post = await Post.create({
        user,
        title,
        subHeading,
        content,
        "cover": postCover,
        tags,
        status
    })

    if (post) {
        res.status(201).json({ message: `New post created: ${title}` })
    } else {
        res.status(400).json({ message: 'Invalid post data recieved' })
    }
}

// @desc Update post
// @route PATCH /post
// @access Private
const updatePost = async (req, res) => {
    const { 
        id, 
        title, 
        subHeading,
        content, 
        cover, 
        tags
    } = req.body

    if (!id || !title || !subHeading || !content) {
        return res.status(400).json({ message: 'Please enter all required fields' })
    }

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

    // Does post exist to update?
    const post = await Post.findById(id).exec()
    if (!post) return res.status(400).json({ message: 'Post not found' })

    // Check for duplicate
    const duplicate = await Post.findOne({ title })
        .collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original post
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate post title' })
    }

    post.title = title
    post.subHeading = subHeading
    post.content = content
    post.cover = !cover || cover === '' ? undefined : cover
    post.tags = !Array.isArray(tags) || !tags.length ? undefined : tags

    const updatedPost = await post.save()

    res.json({ message: `Updated post: ${updatedPost.title}` })
}

// @desc Update post status
// @route PATCH /post/status
// @access Private - Admin/Moderator only
const updatePostStatus = async (req, res) => {
    const { id, status } = req.body

    if (!id || !status) return res.status(400).json({ message: 'All fields are required' })

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })
    
    if (!Object.values(STATUS).includes(status)) {
        return res.status(400).json({ message: 'Invalid status' })
    }

    const post = await Post.findById(id).exec()
    if (!post) return res.status(400).json({ message: 'Post not found' })

    post.status = status
    const updatedPost = await post.save()

    res.json({ message: `Updated post: ${updatedPost.title} is ${updatedPost.status}` })
}

// @desc Update view
// @route PATCH /post/view
// @access Public
const updateView = async (req, res) => {
    const { id } = req.body

    if (!id) return res.status(400).json({ message: 'All fields are required' })

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

    const post = await Post.findOneAndUpdate({ _id: id }, { $inc: {'views': 1} }).exec()

    if (!post) return res.status(400).json({ message: 'Post not found' })

    const updatedPost = await post.save()

    res.json({ message: `Updated ${updatedPost.title} view` })
}

// @desc Delete post
// @route DELETE /post
// @access Private
const deletePost = async (req, res) => {
    const { id } = req.body
    const { id: userId, role } = req.userInfo

    const auth = (postUser) => {
        if ((postUser === userId) || (role === ROLES.Admin || role === ROLES.Moderator)) {
            return true
        }
        return false
    }

    if (!id) return res.status(400).json({ message: 'Post ID required' })

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

    const post = await Post.findById(id).exec()

    if (!post) return res.status(400).json({ message: 'Post not found' })

    if (!auth(post.user?.toString())) return res.status(400).json({ message: 'Unauthorized' })

    removePostDirByName(formatTitle(post.title))

    const result = await post.deleteOne()

    const reply = `Post ${result.title} with ID ${result._id} deleted`

    res.json(reply)
}

// @desc Delete all post
// @route DELETE /post/all
// @access Private - TESTING ONLY
const deleteALLPost = async (req, res) => {
    Post.deleteMany({}).then(() => {
        res.json({ message: 'all post removed' })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = { 
    getAllPosts,
    getPendingPosts,
    createNewPost,
    updatePost,
    updatePostStatus,
    updateView,
    deletePost,
    deleteALLPost
};