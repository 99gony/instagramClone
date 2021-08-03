const express = require('express');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router =express.Router();

router.post('/signup', isNotLoggedIn, async(req,res,next)=>{
  const {email,password,name,nickname} = req.body
  try{ 
    const exUser = await User.findOne({where : {email}})
    if(exUser && exUser.provider === 'local'){
      return res.status(403).send('이미 사용중인 이메일입니다.')
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    await User.create({
      email,
      password: hashedPassword,
      name,
      nickname,
    })
    res.send('ok');
  }catch(err){
    console.error(err);
    next(err);
  }
})

router.post('/login',isNotLoggedIn, (req,res,next)=>{
  passport.authenticate('local', (err, user, info)=>{
    if(err){
      console.error(err);
      return next(err);
    };
    if(!user){
      return res.status(401).send(info.message);
    }
    return req.login(user, async(loginError)=>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      try{
        const fullInfoUserExceptPassword = await User.findOne({
          where : {id: user.id},
          attributes: {exclude : ['password']},
          include : [{
            model: Post,
            attributes: ['id'],
          },{
            model: Post,
            as: 'Liked',
            attributes: ['id'],
          },{
            model: User,
            as: 'Followers',
            attributes: ['id','name','nickname']
          },{
            model: User,
            as: 'Followings',
            attributes: ['id','name','nickname']
          }]
        });
        return res.json(fullInfoUserExceptPassword);
      }catch(err){
        console.error(err);
        next(err);
      }
    })
  })(req,res,next);
});

router.get('/kakao',isNotLoggedIn, passport.authenticate('kakao'));

router.get('/kakao/callback', isNotLoggedIn, passport.authenticate('kakao', {
  failureRedirect: 'http://localhost:3000/login',
}), (req, res) => {
  res.redirect('http://localhost:3000');
});

router.get('/logout', isLoggedIn ,(req,res,next)=>{
  req.logout();
  req.session.destroy((err)=>{
    if(err){
      console.error(err);
      return next(err);
    }
    res.send('ok');
  })
})

module.exports= router;
