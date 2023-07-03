const router = require('express').Router();
const mainRouter = require('./main-router');

router.use('/', mainRouter);

module.exports = router;
