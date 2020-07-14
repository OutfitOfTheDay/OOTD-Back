const User = require('../../../models/User');
const Post = require('../../../models/Post');
const Comment = require('../../../models/Comment');
const config = require('../../../config/config');

const OpenWeatherMapHelper = require("openweathermap-node");

const helper=new OpenWeatherMapHelper({
  APPID: config.APPID,
  units: config.units
});

const seeFeed = (req,res)=>{
  const{sortN, status, temp} = req.query;
  
  const findPost = (sortN,status,temp)=>{
    return sort(sortN,status,temp);
  }
  const findUser = async(posts)=>{
    let feed = [];
    for(let i=0;i<posts.length;i++){
      let user =  await User.findOne({id: posts[i].userId});
      feed.push({post:posts[i],user:user});
    }
    return feed
  }
  const response = (feed)=>{

    res.json(feed);
  }

  const onError = (err)=>{
    res.status(403).json({
      message: err.message
    });
  }

  findPost(sortN,status,temp)
  .then(findUser)
  .then(response)
  .catch(onError)
}

const nowWeather = (req,res)=>{
  const {lon, lat} = req.query;
  helper.getCurrentWeatherByGeoCoordinates(lat,lon,(err, currentWeather) => {
    if(err){
      res.status(404).json({
        message:err.message
      });
    }
    else{
      let code = currentWeather.weather.id
      let weather={
        status:0,
        temp: (currentWeather.main.temp - 273.15).toFixed(1)
      };
      if(code>=200&&code<600) weather.status = 3;
        else if(code>=600&&code<700){
          if(code == 616 || code == 620) weather.status = 4;
          else weather.status = 5;
        }
      else if(800==code) weather.status = 1;
      else weather.status = 2;
  
      res.json({weather}).end();
    };
  });
}

const sort = (sortN,status,temp)=>{

  if(sortN==1){
    return weather(status,temp);
  }else if(sortN==2){
    return weahterMostTag(status,temp);
  }else if(sortN==3){
    return latestMostTag();
  }else{
    return latest();
  }
}

const weather = async(status,temp)=>{
  let posts = (await Post.find()).filter(x=>x.weather.status == status &&(x.weather.temp-5<=temp&&x.weather.temp+5>=temp));
  
  return posts;
}

const weahterMostTag = async(status,temp)=>{
  const posts = (await Post.find().sort({likeN:1})).filter(x=>x.weather.status == status &&(x.weather.temp-5<=temp||x.weather.temp+5>=tmep));

  return posts;
}

const latestMostTag = async()=>{
  const posts = await Post.find().sort({likeN:1})

  return posts
}

const latest = async()=>{
  const posts = await Post.find().sort({date:-1}).sort({time:-1}).sort({likeN:1})

  return posts
}


module.exports = {
  seeFeed,
  nowWeather
};