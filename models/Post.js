const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    date: String,
    likeN: Number,
    content: String,
    cmtN: Number,
    pictures:[String],
    weather: {
      status: Number,
      temp: Number
    },
    userId: String,
    time: String
});

PostSchema.statics.create = function(p){
  let post = new this({
    userId: p.userId,
    date: p.date,
    content:p.content,
    pictures: p.pictures,
    weather: p.weather,
    time:p.time,
    cmtN:0,
    likeN:0
  });
  return post.save();
}

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;