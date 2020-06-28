const express = require('express');
const controller = require('./feed.controller');
const router = express.Router();

router.get('/feed',controller.seeFeed);
router.get('/weather',controller.nowWeather);

module.exports = router;