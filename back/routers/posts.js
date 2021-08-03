const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, async(req,res,next)=>{
  try{
    const followings = await User.findAll({
      attributes: ['id'],
      include: [{
        model: User,
        as: 'Followers',
        where: {id: req.user.id },
      }]
    })
    const where = {
      UserId : {[Op.in] : followings.map(f=>f.id).concat(req.user.id)}
    };
    if(parseInt(req.query.lastId)){
      where.id = {[Op.lt] : parseInt(req.query.lastId)}
    }
    console.log(parseInt(req.query.lastId));
    console.log(where);
    const posts = await Post.findAll({
      where,
      limit: 3,
      order: [
        ['createdAt','DESC'],
        [Comment,'createdAt','DESC'],
        [Image,'id','ASC'],
      ],
      include: [{
        model: User,
        attributes: ['id','nickname','profileUrl'],
      },{
        model: User,
        as: 'Liker',
        attributes: ['id','nickname','profileUrl'],
      },{
        model: Image,
      },{
        model: Comment,
        include: [{
          model: User,
          attributes: ['id','nickname','profileUrl'],
        },{
          model: User,
          as: 'CommentLiker',
          attributes: ['id'],
        }]
      }]
    });
    res.json(posts);
  }catch(err){
    console.error(err);
    next(err);
  }
})

module.exports = router;

