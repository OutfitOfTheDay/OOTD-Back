const express = require('express');
const controller = require('./mypage.controller');
const router = express.Router();
const multer = require('multer');
const middleware = require('../../../middleware/auth');

let _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: _storage });

router.get('/',middleware,controller.seeMypage);
router.patch('/',middleware,upload.single('profile'),controller.updateMypage);
router.get('/myfeed',middleware,controller.seeMyfeed);
router.get('/tagfeed',middleware,controller.seeTagfeed);

module.exports = router;