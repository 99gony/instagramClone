const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const {User} = require('../models');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID : process.env.KAKAO_ID,
    callbackURL : '/auth/kakao/callback',
  },async (accessToken, refreshToken, profile, done)=>{
    try{
      const exUser = await User.findOne({
        where : {snsId : profile.id, provider: 'kakao'}
      });
      if(exUser){
        return done(null,exUser)
      }else{
        const newUser = await User.create({
          email : profile._json.kakao_account.email,
          name : profile.displayName,
          snsId : profile.id,
          provider: 'kakao',
        })
        return done(null, newUser);
      }
    }catch(err){
      console.error(err);
      done(err)
    }
  }))
}