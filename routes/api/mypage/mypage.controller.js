const User = require('../../../models/User');
const Post = require('../../../models/Post');
const Comment = require('../../../models/Comment');
const config = require('../../../config/config');

const seeMypage = (req,res)=>{
  let userId = req.decoded.id
  const findUser = async(userId)=>{
    let user =  await User.findOne({id:userId},{userName:1,profile:1});
    
    return user;
  }
  const response = (user)=>{
    res.json(user).end();
  }

  const onError = (err)=>{
    res.status(403).json({
      err: err.message
    });
  }

  findUser(userId)
  .then(response)
  .catch(onError)
}

const updateMypage = (req,res)=>{
  const userId = req.decoded.id;
  const updateMyInfo = async(userId)=>{
    let user;
    if(!req.file) user = await User.updateOne({id:userId},{userName: req.body.userName,profile:''})
    else user = await User.updateOne({id:userId},{userName: req.body.userName,profile:config.picturesUrl+req.file.filename}).catch(e=>res.status(500).json(e));
    return user;
  }

  const response = ()=>{
    res.json({message: 'success'}).end();
  }

  const onError = (err)=>{
    res.status(403).json({  
      err: err.message
    });
  }
  updateMyInfo(userId)
  .then(response)
  .catch(onError)
}

const seeMyfeed = (req,res)=>{
  const userId = req.decoded.id
  const findMyfeed = async(userId)=>{    
    const posts = await Post.find({userId: userId}).sort({date:-1}).sort({time:-1});
    const user = await User.findOne({id:userId});
    let myfeed=[];
    posts.map(post=> myfeed.push({post,user}));
    return myfeed
  }
  const response = (myfeed)=>{
    res.json(myfeed).end();
  }

  const onError = (err)=>{
    res.status(403).json({
      err: err.message
    });
  }
  findMyfeed(userId)
  .then(response)
  .catch(onError)
}

const seeTagfeed = (req,res)=>{
  const userId = req.decoded.id;
  const findMyInfo = async(userId)=>{
    const user = await User.findOne({id:userId});
    return user;
  }
  const findTagfeed = async(users)=>{
    let tagfeed=[];
    let posts = await Post.find().sort({date:-1}).sort({time:-1});
    for(let i=0;i<posts.length;i++){
      if(users.likedId.length==tagfeed.length) break;
      if(users.likedId.includes(posts[i]._id)){
        let user = await User.findOne({id:posts[i].userId})
        tagfeed.push({post:posts[i],user})
      }
    }
    return tagfeed;
  }
  const response = (tagfeed)=>{
    res.json(tagfeed).end();
  }

  const onError = (err)=>{
    res.status(403).json({
      err: err.message
    });
  }

  findMyInfo(userId)
  .then(findTagfeed)
  .then(response)
  .catch(onError)
}

module.exports = {
  seeMyfeed,
  seeMypage,
  updateMypage,
  seeTagfeed
}