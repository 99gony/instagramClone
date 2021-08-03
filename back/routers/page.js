const express = require('express');
const { User, Post, Comment, Image } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router =express.Router();

router.get('/load',isLoggedIn ,async(req,res,next)=>{
  try{
    const posts = await Post.findAll({
      include : [{
        model : User,
        attributes : ['id','nickname','name'],
      },{
        model : Comment,
      },{
        model : Image,
      }]
    })
    return res.json(posts)
  }catch(err){
    console.error(err);
    next(err);
  }
})

module.exports= router;