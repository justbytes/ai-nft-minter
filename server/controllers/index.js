const router = require('express').Router();
const mainRouter = require('./main-router');

router.use('/api', mainRouter);

module.exports = router;
