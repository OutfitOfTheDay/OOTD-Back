const express = require('express');
const passport = require('passport');
const controller = require('./user.controller');
const middleware = require('../../../middleware/auth');
const router = express.Router();

router.post('/login', controller.login);

module.exports = router;