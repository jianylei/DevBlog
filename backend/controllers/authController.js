const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const emailController = require('./emailController')

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ username }).exec()

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'The username or password you entered is incorrect' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'The username or password you entered is incorrect' })

    if (!foundUser.confirmed) {
        emailController.sendConfirmationEmail(
            foundUser._id?.toString(),
            foundUser.username,
            foundUser.email
        )
        return res.status(401).json({ message: 'Confirm your email to activate your account. A new confirmation has been sent' })
    }

    const accessToken = jwt.sign(
        {
            'UserInfo': {
                'id': foundUser._id,
                'username': foundUser.username,
                'role': foundUser.role
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { 'username': foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '365d' }
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles
    res.json({ accessToken });
}

// @desc Verify account
// @route GET /auth/verification/:token
// @ access Public
const verifyAccount = (req, res) => {
    jwt.verify(
        req.params.token, 
        process.env.CONFIRM_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Link is invalid or has expired' })

            await User.findOneAndUpdate({ _id: decoded.id }, { confirmed: true }).exec()
            
            return res.status(200).json({ message: 'Account Verified' })
        })
    )
}

// @desc Resend confirmation email
// @route GET /auth/verification/resend/:email
// @access Private
const resendVerify = async (req, res) => {
    const email = req.params.email

    if (!email)  return res.status(400).json({ message: 'All fields are required' })

    const user = await User.findOne({ email: email }).select('-password').lean()
    if (!user) return res.status(400).json({ message: 'User not found' })

    if (user.confirmed) return res.status(403).json({ message: 'User already confirmed' })

    emailController.sendConfirmationEmail(user._id?.toString(), user.username, email)

    res.status(200).json({ message: 'Confirmation email has been re-sent' })
}

// @desc Refresh
// @route GET /auth/refresh
// @ access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies
    
    if (!cookies?.jwt) return res.status(401).json({ message: 'token not found' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username })

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
            
            const accessToken = jwt.sign(
                {
                    'UserInfo': {
                        'id': foundUser._id,
                        'username': foundUser.username,
                        'role': foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )
            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204)

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    })

    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    verifyAccount,
    resendVerify,
    refresh,
    logout
}