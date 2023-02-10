const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')
const emailLimiter = require('../middleware/emailLimiter')

router.route('/').post(loginLimiter, authController.login)

router.route('/verification/:token').get(authController.verifyAccount)

router.route('/verification/resend/:email').get(emailLimiter, authController.resendVerify)
    
router.route('/refresh').get(authController.refresh)

router.route('/logout').post(authController.logout)

module.exports = router;