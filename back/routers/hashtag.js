const express = require('express');
const { Hashtag, Post, Comment, User, Image } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router =express.Router();

router.get('/:hashtagId/hashtag',isLoggedIn ,async(req,res,next)=>{
  try{
    const title = decodeURIComponent(req.params.hashtagId)
    const hashtag = await Hashtag.findOne({
      where: {title},
      order: [
        [Post, 'createdAt', 'DESC'],
        [Post, Image, 'id', 'ASC']
      ],
      include: [{
        model: Post,
        include: [{
          model: Image,
        },{
          model: Comment,
          attributes: ['id'],
        },{
          model: User,
          as: 'Liker',
          attributes: ['id'],
        }]
      }]
    });
    res.json(hashtag);
  }catch(err){
    console.error(err);
    next(err);
  }
})

module.exports= router;