const router = require('express').Router();
//const apiRoutes = require('./api');

// api routes
console.log("got to routes index");

router.use('/authentication', require('./jwtAuth'));
router.use('/api', require('./api'));

module.exports = router;
