const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');

router.route('/').post((req, res) => {
    upload(req, res, (err) => {
        if (err)
            res.status(400).json({
                message: 'Bad request - either file size is too large or format is not accepted',
            });
        else res.status(200).json({ message: 'File uploaded successfully' });
    });
});

module.exports = router;
