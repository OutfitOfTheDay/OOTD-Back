const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: String,
    date: String,
    postId: String,
    text: String,
    time: String
});

CommentSchema.statics.create = function(c){
  
  const comment = new this({
    userId: c.userId,
    date: c.date,
    time: c.time,
    postId: c.postId,
    text: c.text
  });
  return comment.save();
}

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;