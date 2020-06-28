const router = require('express').Router();

//router.use('/', require('./docs'));
router.use('/',require('./feed'));
router.use('/', require('./post'));
router.use('/',require('./auth'));
router.use('/mypage', require('./mypage'));

module.exports = router;