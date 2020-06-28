const express = require('express');
const controller = require('./post.controller');
const router = express.Router();
const multer = require('multer');

let _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
let upload = multer({ storage: _storage });

router.post('/post',upload.array('pictures'),controller.writePost);
router.get('/post/:postId',controller.seePost);
router.post('/comment',controller.writeComment);
router.patch('/post/:postId',upload.array('pictures'),controller.updatePost);
router.delete('/post/:postId',controller.deletePost);
router.get('/like/:postId',controller.likePost);

module.exports = router;