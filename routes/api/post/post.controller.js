const User = require('../../../models/User');
const Post = require('../../../models/Post');
const Comment = require('../../../models/Comment');
const config = require('../../../config/config');

const writePost = async(req,res)=>{
  let d = new Date();
  let p = {
    weather:{
      status: req.body.status,
      temp: req.body.temp
    },
    pictures: [],
    date: formatDate(d),
    time: d.getTime(),
    content: req.body.content,
    userId: req.decoded.id
  };

  req.files.forEach(element => p.pictures.push(config.picturesUrl+element.filename));

  const createPost = (p)=>{    
    return Post.create(p);
  }

  const response = ()=>{
    res.json({message: "success"}).end();
  }

  const onError = (err)=>{
    
    res.status(403).json({
      err: err.message
    });
  }

  createPost(p)
  .then(response)
  .catch(onError)
}

const seePost = (req,res) =>{
  const {
    postId
  } = req.params;

  const getComment= async(postId)=>{
    const comment = await Comment.find({postId:postId},{_v:0}).sort({date:-1}).sort({time:-1})
    let comments = [];
    for(let i=0;i<comment.length;i++){
      let user =  await User.findOne({id: comment[i].userId},{likedId:0})
      .catch((e)=>res.status(500).json(e));
      comments.push({comment:comment[i],user:user});
    }
    return comments;
  }

  const response=(comments)=>{
    res.json(comments).end();
  }

  const onError = (err)=>{
    res.status(403).json({
      message: err.message
    });
  }

  getComment(postId)
  .then(response)
  .catch(onError)
}

const writeComment = (req,res)=>{
  let d = new Date();
  const c = {
    userId:  req.decoded.id,
    date: formatDate(d),
    postId: req.body.postId,
    text: req.body.text,
    time: d.getTime(),
  }
    
  if(c.text==null) throw Error('no text');
  if(c.userId==null) throw Error('no user');
  
  const createComment = async (c)=>{
    let post = await Post.findOne({_id:c.postId})
    post.cmtN++;
    post.save();
    return Comment.create(c);;
  }

  const response = ()=>{
    res.json({message: "success"}).end();
  }

  const onError = (err)=>{
    res.status(403).json({
      message: err.message
    });
  }

  createComment(c)
  .then(response)
  .catch(onError)
}

const updatePost = (req,res)=>{
  const userId = req.decoded.id;
  const checkUser = async(userId)=>{
    const post = await Post.findOne({_id:req.params.postId}).catch((e)=>res.status(500).json(e));
    if(post.userId != userId ) new Error('not writer');
    return post;
  }
  const update = async(post)=>{
    let B = req.body;
    [
      post.weather.status,
      post.weather.temp,
      post.content,
      post.date
    ] = [
        B.status,
        B.temp,
        B.content,
        formatDate(new Date())
      ];
    p = [];
    
    
    req.files.forEach(element => p.push(config.picturesUrl+element.filename));
    post.pictures = p;
    return post.save();
  }

  const response = ()=>{
    res.json({message: "success"}).end();
  }

  const onError = (err)=>{
    res.status(403).json({
      message: err.message
    });
  } 
  checkUser(userId)
  .then(update)
  .then(response)
  .catch(onError)
}

const deletePost = (req,res)=>{
  const userId = req.decoded.id;

  const delPost = async ()=>{
    await Post.remove({_id:req.params.postId})
    .catch((e)=>res.status(500).json(e));

    return;
  }
  const response = ()=>{
    res.json({message: "success"}).end();
  }

  const onError = (err)=>{
    res.status(403).json({
      message: err.message
    });
  } 
  delPost()
  .then(response)
  .catch(onError)
}

const formatDate = (d)=>{
  let date = new Date(d),
  month = ''+(date.getMonth()+1),
  day = ''+ date.getDate(),
  year = '' + date.getFullYear();

  if(month.length<2) month = '0' + month;
  if(day.length<2) day = '0'+day;

  return [year, month, day].join('-');
}

const likePost = (req,res)=>{  
  const userId = req.decoded.id;

  const UserLike = async (userId)=>{
    let user =  await User.findOne({id: userId})
    .catch((e)=>res.status(500).json(e));
    let bool;
    if(user.likedId.includes(req.params.postId)){
      user.likedId.splice(user.likedId.indexOf(req.params.postId),1);
      bool=true;
    }
    else{
      user.likedId.push(req.params.postId);
      bool=false;
    }
    user.save();
    return bool;
  }
  const postLikeNum = async(bool)=>{
    const post = await Post.findOne({_id:req.params.postId}).catch((e)=>res.status(500).json(e));
    if(bool) post.likeN-=1;
    else post.likeN+=1;
    return post.save();
  }
  const response = ()=>{
    res.json({message: "success"}).end();
  }

  const onError = (err)=>{
    res.status(403).json({
      message: err.message
    });
  } 
  UserLike(userId)
  .then(postLikeNum)
  .then(response)
  .catch(onError)
}

module.exports = {
  writePost,
  seePost,
  writeComment,
  updatePost,
  deletePost,
  likePost
}