const express = require('express')
const router = express.Router()

router.route('/').post(require('../config/multerConfig'))

module.exports = router