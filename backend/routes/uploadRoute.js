const express = require('express')
const router = express.Router()
const fs = require('fs-extra')
const upload = require('../config/multerConfig')
const { createUploadDir } = require('../middleware/createUploadDir')
const { PATH } = require('../config/constants')

router.route('/').post(createUploadDir, upload, (req, res) => {
    const { name } = req.body
    const { users, posts } = req.files
    
    if ( !name || (!users && !posts) || (!users?.length && !posts?.length)) {
        res.status(400).json({ message: 'Missing field' })
    }

    const fieldname = users ? 'users' : 'posts'

    const newPath = PATH.Images + fieldname + '/' + name

    try {
        if (fs.existsSync(newPath)) {
            fs.rmSync(newPath, { recursive: true, force: true })
        }

        fs.moveSync(PATH.AdminImages, newPath)
    } catch (err) {
        res.status(400).json({ message: 'Bad request' })
    }

    res.status(201).json({ message: 'Upload succesful' })
})

module.exports = router