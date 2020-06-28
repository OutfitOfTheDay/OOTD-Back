const express = require('express');
const controller = require('./mypage.controller');
const router = express.Router();
const multer = require('multer');
const ensureAuthenticated = require('../../../middleware/auth');

let _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: _storage });

router.get('/',ensureAuthenticated,controller.seeMypage);
router.patch('/',ensureAuthenticated,upload.single('profile'),controller.updateMypage);
router.get('/myfeed',ensureAuthenticated,controller.seeMyfeed);
router.get('/tagfeed',ensureAuthenticated,controller.seeTagfeed);

module.exports = router;