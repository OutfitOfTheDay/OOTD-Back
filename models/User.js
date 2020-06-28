const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  profile: String,
  likedId: [String],
  id: String
});

UserSchema.statics.createUser = function(u){
  let user = new this({
    userName: u.userName,
    id: u.id
  });
  return user.save();
}

const User = mongoose.model('User', UserSchema);

module.exports = User;