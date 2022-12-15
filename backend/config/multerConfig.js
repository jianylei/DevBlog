const multer = require('multer')

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
          return cb(new Error('file is not allowed'))
        }
    
        cb(null, true)
    } 
})

module.exports = upload