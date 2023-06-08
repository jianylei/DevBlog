const express = require('express')
const app = express()
const multer = require('multer')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const bodyParser = require('body-parser')

const whitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
]

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
})

const s3 = new aws.S3()

app.use(bodyParser.json());

const storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
        console.log(file.originalname)
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1048576 * 5 // 5 Mb
    },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('File is not allowed'))
        }
        cb(null, true)
    } 
}).fields([
  { name: 'users' },
  { name: 'posts' }
])

module.exports = upload