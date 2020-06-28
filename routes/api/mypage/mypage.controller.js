const User = require('../../../models/User');
const Post = require('../../../models/Post');
const Comment = require('../../../models/Comment');
const config = require('../../../config/config');
const seeMypage = (req,res)=>{
  const userId = req.user.id;
  
  const findUser = async(userId)=>{
    let user =  await User.findOne({id:userId},{userName:1,profile:1})
    .catch(e=>res.status(500).json(e));
    
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
  const userId = req.user.id;
  
  const updateMyInfo = async(userId)=>{
    let user = await User.updateOne({id:userId},{userName: req.body.userName,profile:config.picturesUrl+req.file.filename})
    .catch(e=>res.status(500).json(e));
    
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
  const userId = req.user.id;

  const findMyfeed = async(userId)=>{    
    const posts = await Post.find({userId: userId})
    .catch(e=>res.status(500).json(e));
    const user = await User.findOne({id:userId})
    .catch(e=>res.status(500).json(e));
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
  const userId = req.user.id;

  const findMyInfo = async(userId)=>{
    const user = await User.findById({id:userId})
    .catch(e=>res.status(500).json(e));
    return user;
  }
  const findTagfeed = async(user)=>{
    let tagfeed=[];
    for(let i=0;i<user.likedId.length;i++){
      let post = await Post.findOne({_id: user.likedId[i]})
      .catch(e=>res.status(500).json(e));
      let users = await User.findOne({id:post.userId})
      .catch(e=>res.status(500).json(e));
      tagfeed.push({post,users});
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