const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger');

const emailLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message: {
        message:
            'Confirmation email has already been re-sent. Please wait 60 seconds to try again.',
    },
    handler: (req, res, next, options) => {
        logEvents(
            `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
            'errLog.log'
        );
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = emailLimiter;
