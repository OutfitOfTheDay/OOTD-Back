const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport)=>{
  passport.use(new FacebookStrategy({
    clientID:'2693535414225237',
    clientSecret: 'ef0f42bccd45ea2826b237de8bf03358',
    callbackURL: "https://localhost:1212/auth/facebook/callback"
  },
    function(accessToken, refreshToken, profile, cb) {
      cb(null,profile);
    }
  ));
  passport.use(new GoogleStrategy({
    clientID:'268802265304-i0ian5nip29tu3k5et7gn22p1nai5f7n.apps.googleusercontent.com',
    clientSecret: 'UHC7gQ2TZpUhPFIWt_FnT6st',
    callbackURL: "http://localhost:1212/auth/google/callback"
  },
    (accessToken,refreshToken,profile,cb)=>{
      cb(null,profile);
    }
  ))
  // 인증후 사용자 정보를 세션에 저장
  passport.serializeUser(function(user, cb) {
    console.log('serialize');
    cb(null, user);
  });
  // 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
  passport.deserializeUser(function(user, cb) {
    console.log('deserialize');
    cb(null,user);
  });
}