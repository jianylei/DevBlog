const User = require('../models/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

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
    const users = await User.find().select('-password').lean()
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
    if (duplicateUsername) return res.status(409).json({ message: 'Duplicate username' })

    const duplicateEmail = await User.findOne({ email })
        .collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicateEmail) return res.status(409).json({ message: 'Duplicate email' })

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create and store new user
    const user = await User.create({
        username, 'password': hashedPwd, email
    })
    
    jwt.sign(
        { 'id': user.id },
        process.env.CONFIRM_TOKEN_SECRET,
        { expiresIn: '1d' },
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
    if (!id || !username || !firstName || !lastName || !role || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'Please enter all required fields' })
    }

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
    user.firstName = firstName
    user.lastName = lastName
    user.about = about ? about : undefined
    user.role = role
    user.active = active
    user.image = image ? image : undefined

    if (password) user.password = await bcrypt.hash(password, 10)

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
}

// @desc Delete user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
    const { id } = req.body

    if (!id) return res.status(400).json({ message: 'User ID required' });

    const user = await User.findById(id).exec();

    if (!user) return res.status(400).json({ message: 'User not found' });

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }