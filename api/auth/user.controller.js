const User = require('../../../models/User');

const login_success = (req,res)=>{
  const user = req.user;

  const findAndCreateUser = async(user)=>{
    let u = await User.findOne({id:user.id});
    if(!u){
      let newUser = {
        userName: user.displayName,
        id: user.id
      };
      User.createUser(newUser);
    }
    return;
  }
  const response = ()=>{
    res.json({message: 'success'}).end();
  }
  const onError = (err)=>{
    res.status(403).json({
      err: err.message
    });
  }
  findAndCreateUser(user)
  .then(response)
  .catch(onError)
}

const login_fail = (req,res)=>{
  res.status(400).json({messgae:'login fail'});
}

const logout = (req,res)=>{
  req.logOut();
  res.status(200).json({messgae:'success'});
}

module.exports = {
  logout,
  login_fail,
  login_success
}