const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USR,
        pass: process.env.EMAIL_PWD
    }
})

const sendConfirmationEmail = (id, username, email) => {
    jwt.sign(
        { 'id': id },
        process.env.CONFIRM_TOKEN_SECRET,
        { expiresIn: '30m' },
        (err, token) => {
            const url = `http://localhost:3080/auth/verification/${token}`

            transporter.sendMail({
                to: email,
                subject: 'Confirm Email',
                html: `Hello @${username}, please click this link to confirm your email.
                    The URL will expire in 30 minutes.
                    <a href="${url}">${url}</a>`
            })
        }
    )
}

module.exports = { sendConfirmationEmail }