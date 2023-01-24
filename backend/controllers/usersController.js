const User = require('../models/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USR,
        pass: process.env.EMAIL_PWD
    }
})

// @desc Get all users
// @route GET /users
// @access Public
const getAllUsers = async (req, res) => {
    const users = await User.find({ confirmed: true }).select('-password').lean()
    if (!users?.length) return res.status(400).json({ message: 'No users found' })

    res.json(users)
}

// @desc Create new user
// @route POST /users
// @access Public
const createNewUser = async (req, res) => {
    const { 
        username, 
        password, 
        email
    } = req.body
    
    // Confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicates
    const duplicateUsername = await User.findOne({ username })
        .collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicateUsername) return res.status(409).json({ message: 'User with this username already exist' })

    const duplicateEmail = await User.findOne({ email })
        .collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicateEmail) return res.status(409).json({ message: 'User with this email already exist' })

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create and store new user
    const user = await User.create({
        username, 'password': hashedPwd, email
    })
    
    jwt.sign(
        { 'id': user.id },
        process.env.CONFIRM_TOKEN_SECRET,
        { expiresIn: '2h' },
        (err, token) => {
            const url = `http://localhost:3080/auth/verification/${token}`

            transporter.sendMail({
                to: email,
                subject: 'Confirm Email',
                html: `Hello @${username}, please click this url to confirm account
                    <a href="${url}">${url}</a>`
            })
        }
    )

    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

// @desc Update user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
    const { 
        id, 
        username, 
        firstName, 
        lastName,
        about,
        image,
        role, 
        active, 
        password 
    } = req.body
    
    // Confirm data 
    if (!id || !username || !role || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'Please enter all required fields' })
    }

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) return res.status(400).json({ message: 'User not found' })

    // Check for duplicate 
    const duplicate = await User.findOne({ username })
        .collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.firstName = firstName ? firstName : undefined
    user.lastName = lastName ? lastName : undefined
    user.about = about ? about : undefined
    user.role = role
    user.active = active
    user.image = image ? image : undefined
    user.email = 'switchguy@mail.com'

    if (password) user.password = await bcrypt.hash(password, 10)

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
}

// @desc Delete user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
    const { id } = req.body

    if (!id) return res.status(400).json({ message: 'User ID required' })

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

    const user = await User.findById(id).exec()
    if (!user) return res.status(400).json({ message: 'User not found' })

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
}

// @desc Follow user
// @route PATCH /users/follow/:username
// @access Private
const followUser = async (req, res) => {
    const username = req.params.username
    const { id } = req.body

    if (!id || !username) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

    const user = await User.findById(id).exec()
    if (!user) return res.status(400).json({ message: 'User not found' })

    const otherUser = await User.findOne({ username: username })
    if (!otherUser) {
        return res.status(400).json(
            { message: 'User to be followed does not exist' })
    }

    if (user.id === otherUser.id) {
        return res.status(409).json(
            { message: 'Unable to follow own account' })
    }

    if (user.following?.includes(otherUser.id)) {
        return res.status(409).json(
            { message: `Already follwing ${otherUser.username}` })
    }

    user.following.push(otherUser.id)
    otherUser.followers.push(user.id)

    const updatedUser = await user.save()
    const updatedOtherUser = await otherUser.save()

    res.json({ message: `${updatedUser.username} now following ${updatedOtherUser.username}` })
}

// @desc Unfollow user
// @route PATCH /users/unfollow/:username
// @access Private
const unFollowUser = async (req, res) => {
    const username = req.params.username
    const { id } = req.body

    if (!id || !username) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

    const user = await User.findById(id).exec()
    if (!user) return res.status(400).json({ message: 'User not found' })

    const otherUser = await User.findOne({ username: username }).exec()
    if (!otherUser) {
        return res.status(400).json(
            { message: 'User to be unfollowed does not exist' })
    }

    if (user.id === otherUser.id) {
        return res.status(409).json(
            { message: 'Unable to unfollow own account' })
    }

    if (!user.following?.includes(otherUser.id)) {
        return res.status(409).json(
            { message: `Currently not follwing ${otherUser.username}` })
    }

    const index = user.following?.indexOf(otherUser.id)
    const otherIndex = otherUser.followers?.indexOf(user.id)

    user.following?.splice(index, 1)
    otherUser.followers?.splice(otherIndex, 1)

    const updatedUser = await user.save()
    const updatedOtherUser = await otherUser.save()

    res.json({ message: `${updatedUser.username} has unfollowed ${updatedOtherUser.username}` })
}

module.exports = { 
    getAllUsers, 
    createNewUser, 
    updateUser, 
    deleteUser,
    followUser,
    unFollowUser
}