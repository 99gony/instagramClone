const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Image, Hashtag, Comment, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try{
  fs.accessSync('uploads')
}catch(err){
  console.log('uploads 폴더가 없으므로 생성합니다.')
  fs.mkdirSync('uploads')
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req,file,done){
      done(null, 'uploads');
    },
    filename(req,file,done){
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.get('/:postId/load', async(req,res,next)=>{
  try{
    const post = await Post.findOne({
      where: {id: parseInt(req.params.postId)},
      order: [
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
        attributes: ['id','url'],
      },{
        model: Comment,
        include: [{
          model: User,
          attributes: ['id','nickname','profileUrl'],
        },{
          model: User,
          as: 'CommentLiker',
          attributes: ['id'],
        },{
          model: Comment,
          as: 'Reply',
          include:[{
            model: User,
            attributes: ['id','nickname','profileUrl'],
          },{
            model: User,
            as: 'CommentLiker',
            attributes: ['id','nickname','profileUrl'],
          }]
        }],
      }]
    });
    res.json(post);
  }catch(err){
    console.log(err);
    next(err);
  }
})

router.post('/add/image', isLoggedIn, upload.array('image') ,async(req,res,next)=>{
  try{
    res.json(req.files.map((f)=>f.filename));
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/upload', isLoggedIn, async(req,res,next)=>{
  const {content,imageUrl} = req.body;
  try{
    const newPost = await Post.create({
      content,
      UserId: req.user.id
    });
    const hashtags = content.match(/#[^\s#]+/g);
    if(hashtags){
      const result = await Promise.all(
        hashtags.map((tag)=>{
        return Hashtag.findOrCreate({
          where: {title : tag.slice(1).toLowerCase()}
        })
      }))
      await newPost.addHashtags(result.map(tag=>tag[0]));
    }
    if(imageUrl){
      imageUrl.map(async(url)=>{
        await Image.create({
          url,
          PostId: newPost.id,
        });
      })
    }
    res.send('ok');
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/add/comment', isLoggedIn, async(req,res,next)=>{
  const {content, PostId} = req.body;
  try{
    const comment = await Comment.create({
      content,
      PostId,
      UserId: req.user.id
    })
    const commentIncludeUser = await Comment.findOne({
      where:{id: comment.id},
      include:[{
        model: User,
        attributes: ['id','profileUrl','nickname'],
      },{
        model: User,
        as: 'CommentLiker',
        attributes: ['id','profileUrl','nickname'],
      },{
        model: Comment,
        as: 'Reply',
        include:[{
          model: User,
          attributes: ['id','nickname','profileUrl'],
        }]
      }]
    })
    res.json(commentIncludeUser);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/add/reply', isLoggedIn, async(req,res,next)=>{
  const {content, commentId} = req.body;
  try{
    const comment = await Comment.create({
      content,
      CommentId : commentId,
      UserId: req.user.id,
    })
    const commentIncludeUser = await Comment.findOne({
      where:{id: comment.id},
      include:[{
        model: User,
        attributes: ['id','profileUrl','nickname'],
      },{
        model: User,
        as: 'CommentLiker',
        attributes: ['id','profileUrl','nickname'],
      }],
    })
    res.json(commentIncludeUser);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/:postId/edit', isLoggedIn, async(req,res,next)=>{
  try{
    const postToEdit = await Post.findOne({
      where:{id: parseInt(req.params.postId)},
      include:[{
        model: Image,
      }]
    });
    res.json(postToEdit);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.patch('/:postId/edit', isLoggedIn, async(req,res,next)=>{
  const {content, imageUrl} = req.body;
  try{
    const updatedPost = await Post.findOne({
      where:{id: parseInt(req.params.postId)},
    });
    const hashtags = content.match(/#[^\s#]+/g);
    if(hashtags){
      const result = await Promise.all(
        hashtags.map((tag)=>{
        return Hashtag.findOrCreate({
          where: {title : tag.slice(1).toLowerCase()}
        })
      }))
      await updatedPost.addHashtags(result.map(tag=>tag[0]));
    }
    if(updatedPost){
      await updatedPost.update({
        content,
      })
      await Image.destroy({
        where: {PostId: updatedPost.id}
      })
      if(imageUrl){
        imageUrl.map(async(url)=>{
          await Image.create({url, PostId: updatedPost.id});
        })
      }
    }
    res.send('ok');
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.delete('/:postId/delete', isLoggedIn, async(req,res,next)=>{
  const id = parseInt(req.params.postId);
  try{
    await Post.destroy({
      where: {id}
    })
    res.send('ok');
  }catch(err){
    console.error(err);
    next(err);
  }
})

router.put('/:postId/like', isLoggedIn, async(req,res,next)=>{
  const id = parseInt(req.params.postId);
  try{
    const post = await Post.findOne({
      where: {id}
    });
    if(post){
      await post.addLiker(req.user.id);
      res.json(req.user.id);
    }
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.delete('/:postId/like', isLoggedIn, async(req,res,next)=>{
  const id = parseInt(req.params.postId);
  try{
    const post = await Post.findOne({
      where: {id}
    });
    if(post){
      await post.removeLiker(req.user.id);
      res.json(req.user.id);
    }
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.put('/comment/:commentId/like', isLoggedIn, async(req,res,next)=>{
  const id = parseInt(req.params.commentId);
  try{
    const comment = await Comment.findOne({
      where: {id}
    });
    if(comment){
      await comment.addCommentLiker(req.user.id);
      res.json({userId : req.user.id, commentId: comment.CommentId});
    }
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.delete('/comment/:commentId/like', isLoggedIn, async(req,res,next)=>{
  const id = parseInt(req.params.commentId);
  try{
    const comment = await Comment.findOne({
      where: {id}
    });
    if(comment){
      await comment.removeCommentLiker(req.user.id);
      res.json({userId : req.user.id, commentId: comment.CommentId});
    }
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.delete('/comment/:commentId/remove', isLoggedIn, async(req,res,next)=>{
  const id = parseInt(req.params.commentId);
  try{
    const removed = await Comment.destroy({
      where: {id}
    });
    console.log(removed);
    res.send('ok');
  }catch(err){
    console.error(err);
    next(err);
  }
})

module.exports = router;

