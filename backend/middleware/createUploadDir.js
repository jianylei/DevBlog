const fs = require('fs')
const { PATH } = require('../config/constants')


const createUploadDir = (req, res, next) => {
    try {
        if (fs.existsSync(PATH.AdminImages)) {
            fs.rmSync(PATH.AdminImages, { recursive: true, force: true })
        }
        fs.mkdirSync(PATH.AdminImages, { recursive: true })
        next()
    } catch (err) {
        res.json({ message: 'Error uploading images' })
    }
}

module.exports = { createUploadDir }