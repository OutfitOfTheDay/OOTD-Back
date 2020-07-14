const express = require('express');
const controller = require('./post.controller');
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

router.post('/post',middleware,upload.array('pictures'),controller.writePost);
router.get('/post/:postId',middleware,controller.seePost);
router.post('/comment',middleware,controller.writeComment);
router.patch('/post/:postId',middleware,upload.array('pictures'),controller.updatePost);
router.delete('/post/:postId',middleware,controller.deletePost);
router.get('/like/:postId',middleware,controller.likePost);

module.exports = router;