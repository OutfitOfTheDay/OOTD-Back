const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
// const login_success = (req,res)=>{
//   const user = req.user;

//   const findAndCreateUser = async(user)=>{
//     let u = await User.findOne({id:user.id});
//     let newUser = {};
//     if(!u){
//       newUser = {
//         userName: user.displayName,
//         id: user.id,
//         profile:''
//       };
//       User.createUser(newUser);
//     }
//     return newUser;
//   }
//   const response = (newUser)=>{
//     res.json({user:newUser}).end();
//   }
//   const onError = (err)=>{
//     res.status(403).json({
//       err: err.message
//     });
//   }
//   findAndCreateUser(user)
//   .then(response)
//   .catch(onError)
// }

// const login_fail = (req,res)=>{
//   res.status(400).json({messgae:'login fail'});
// }

// const logout = (req,res)=>{
//   req.logOut();
//   res.status(200).json({messgae:'success'});
// }

const login = (req,res)=>{
  const secret = req.app.get('jwt-secret');
  
  const findAndCreateUser = async()=>{
    let user = await User.findOne({id:req.body.userId});
    let newUser = {};
    if(!user){
      newUser ={
        userName : req.body.userName,
        id: req.body.userId,
        profile:''
      };
      User.createUser(newUser);
      return newUser;
    }
    return user;
  }
  const check = async (user) => {
        
  if(!user) {
      // user does not exist
    return new Error('You must signup');
  } else {
      // user exists, check the password
      // create a promise that generates jwt asynchronously
      const token = await jwt.sign({
            id:user.id
          }, 
          secret, 
          {
            expiresIn: '100h',
            issuer: 'gkrud',
            subject: 'user_info'
          });
      return [token, user];
      // return new Promise((resolve,reject)=>{
      //     reject(new Error('login failed'));
      // });
  }
}

  const response = (arr)=>{
    console.log(arr);
    res.json({message: 'success', token:arr[0], user:arr[1]}).end();
  }

  const onError=(err)=>{
    res.status(403).json({
      err:err.message
    });
  }

  findAndCreateUser()
  .then(check)
  .then(response)
  .catch(onError)
}

module.exports = {
  login
}