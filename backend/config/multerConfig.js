const multer = require('multer')
const fs = require("fs")
const { PATH } = require('../config/constants')

const whitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        const name = req.body?.name
        if (name) {
            const path = PATH.Images + file.fieldname + '/' + name
            try {
                if (fs.existsSync(path)) {
                    fs.rmSync(path, { recursive: true, force: true })
                }
                fs.mkdirSync(path, { recursive: true })
                cb(null, path)
            } catch (err) {
                console.log("An error occurred uploading image")
            }
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024 // 1MB
    },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }
        cb(null, true)
    } 
}).fields([
  { name: 'users' },
  { name: 'posts' }
])

module.exports = upload