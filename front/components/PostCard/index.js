import { faBookmark, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Avatar} from 'antd';
import React, { useCallback } from 'react';
import CommentForm from './CommentForm';
import PostImage from './PostImage';
import PostMoreButton from './PostMoreButton';
import { ButtonBoxWapper, PostHeaderWrapper, PostCardWrapper, ContentBoxWrapper } from './style';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentLike, addLike, removeCommentLike, removeLike } from '../../actions/post';
import { backendServer } from '../../actions/user';

const PostCard = ({post}) => {
  const dispatch = useDispatch();
  const me = useSelector(state=>state.user.me);

  const addHeart = useCallback(()=>{
    dispatch(addLike(post.id));
  },[]);
  const removeHeart = useCallback(()=>{
    dispatch(removeLike(post.id));
  },[]);

  const addCommentHeart = useCallback((commentId)=>()=>{
    dispatch(addCommentLike({commentId, postId: post.id}));
  },[]);

  const removeCommentHeart = useCallback((commentId)=>()=>{
    dispatch(removeCommentLike({commentId, postId: post.id}));
  },[]);

  return(
    <PostCardWrapper>
      <PostHeaderWrapper>
        <div>
          <Link href={`/${post.User.nickname}`}>
            <a>
              <Avatar src={`${backendServer}/${post.User.profileUrl}`}/>
              <span className="username">{post.User.nickname}</span>
            </a>
          </Link>
        </div>
        <PostMoreButton post={post} />
      </PostHeaderWrapper>
      <PostImage postImage={post.Images} />
      <ButtonBoxWapper>
        <div className="firstBlock">
          {post.Liker.find((liker)=>liker.id === me.id)?
            <div onClick={removeHeart} className="heartWrapper button">
              <div className="heart heart-active is_animating"/>
            </div>
            :
            <div onClick={addHeart} className="heartWrapper button">
              <div className="heart"/>
            </div>
          }
          <Link
            as={`/post/${post.id}`}
            href={`/?postId=${post.id}`}
            scroll={false}
            shallow={true}
          >
            <a><FontAwesomeIcon className="button comment" icon={faComment} /></a>
          </Link>
          <FontAwesomeIcon className="button" icon={faPaperPlane} />
        </div>
        <div className="secondBlock">
          <FontAwesomeIcon className="button bookmark" icon={faBookmark} />
        </div>
      </ButtonBoxWapper>
      <ContentBoxWrapper>
        <div className="like">
          좋아요 {post.Liker.length}개
        </div>
        {post.content ?  
          <div className="content">
            <span>{post.User.nickname}</span> 
            {post.content.split(/(#[^\s#]+)/g).map((v)=>{
              if(v.match(/#[^\s#]+/)){
                return(
                  <Link href={`/hashtag/${v.slice(1).toLowerCase()}`}>
                    <a>{v}</a>
                  </Link>
                )
              }
              return v;
            })}
          </div>
        : null}
        <div className="comment">
          {post.Comments.length >= 3?
          <Link
            as={`/post/${post.id}`}
            href={`/?postId=${post.id}`}
            scroll={false}
            shallow={true}
          >
            <a>
              댓글 {post.Comments.length}개 모두 보기
            </a>
          </Link>
          : null
          }
          <div className="exComment">
            {post.Comments.find(comment=>comment.User.id === me.id)?
              post.Comments.filter(comment=>comment.User.id === me.id).slice(0,2).map((c)=>{
                return(
                  <div className="commentBox" key={c.id}>
                    <div>
                      <span>
                        {c.User.nickname}
                      </span>
                        {c.content}
                    </div>
                    <div>
                      {c.CommentLiker.find(liker=>liker.id === me.id)?
                      <div onClick={removeCommentHeart(c.id)} className="heartWrapper button">
                        <div className="heart heart-active is_animating"/>
                      </div>
                      :
                      <div onClick={addCommentHeart(c.id)} className="heartWrapper button">
                        <div className="heart"/>
                      </div>
                      }
                    </div>
                  </div>
                )
              })
              : null
            }
            {post.Comments.map((comment)=>{
              if(me.Friends.find((friend)=>friend === comment.User.id)){
                return (
                  <div className="commentBox" key={comment.id}>
                    <div>
                      <span>
                        {comment.User.nickname}
                      </span>
                        {comment.content}
                    </div>
                    <div>
                      {comment.CommentLiker.find(liker=>liker.id === me.id)?
                      <div onClick={removeCommentHeart(comment.id)} className="heartWrapper button">
                        <div className="heart heart-active is_animating"/>
                      </div>
                      :
                      <div onClick={addCommentHeart(comment.id)} className="heartWrapper button">
                        <div className="heart"/>
                      </div>
                      }
                    </div>
                  </div>
                )
              }
            }).slice(0,2)}
          </div>
        </div>
        <div className="createdAt">
          {dayjs(post.createdAt).fromNow(true)} 전
        </div>
      </ContentBoxWrapper>
      <CommentForm postId={post.id}/>
    </PostCardWrapper>
  )
}

export default PostCard;