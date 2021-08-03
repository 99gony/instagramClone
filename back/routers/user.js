const express = require('express');
const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router =express.Router();

router.get('/', isLoggedIn, async(req,res,next)=>{
  try{
    if(req.user){
      const fullInfoUser = await User.findOne({
        where : {id: req.user.id},
        attributes: {exclude : ['password']},
        include : [{
          model: Post,
          attributes: ['id'],
        },{
          model: User,
          as: 'Followers',
          attributes: ['id','nickname']
        },{
          model: User,
          as: 'Followings',
          attributes: ['id','nickname']
        }]
      });
      res.json(fullInfoUser);
    }
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/profile/:nickname',isLoggedIn, async(req,res,next)=>{
  try{
    const fullInfoUser = await User.findOne({
      where : {nickname: req.params.nickname},
      attributes: {exclude : ['password']},
      include : [{
        model: Post,
        include: [{
          model: User,
          as: 'Liker',
          attributes: ['id'],
        },{
          model: Image,
          attributes: ['id','url'],
        },{
          model: Comment,
          attributes: ['id']
        }],
      },{
        model: User,
        as: 'Followers',
        attributes: ['id','nickname','name']
      },{
        model: User,
        as: 'Followings',
        attributes: ['id','nickname','name']
      }],
      order: [
        [Post,'createdAt','DESC'],
        [Post, Image,'id','ASC']
      ],
    });
    res.json(fullInfoUser);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/:userId/follow', isLoggedIn, async(req,res,next)=>{
  try{
    const user = await User.findOne({where: {id: req.user.id}});
    await user.addFollowings(parseInt(req.params.userId));
    const followedUser = await User.findOne({
      where: {id: req.params.userId},
      attributes: ['id', 'nickname'],
    })
    res.json(followedUser);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.delete('/:userId/follow', isLoggedIn, async(req,res,next)=>{
  try{
    const user = await User.findOne({where: {id: req.user.id}});
    await user.removeFollowings(parseInt(req.params.userId));
    const unfollowedUser = await User.findOne({
      where: {id: req.params.userId},
      attributes: ['id', 'nickname'],
    })
    res.json(unfollowedUser);
    res.send('ok');
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports= router;