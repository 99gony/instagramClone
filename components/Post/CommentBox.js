import React, { useCallback, useEffect, useState } from 'react';
import { CommentBoxWrapper, ModalCommentFormWrapper } from './style';
import Link from 'next/link';
import dayjs from 'dayjs';
import CommentForm from '../PostCard/CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';
import {ButtonBoxWapper} from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { backendServer } from '../../actions/user';
import { postSlice } from '../../reducers/post';
import Comment from './Comment';

const CommentBox = ({post}) => {
  const dispatch = useDispatch();
  const {me} = useSelector(state=>state.user);
  const {addedReply} = useSelector(state=>state.post);
  const [replyMode, setReplyMode] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState(null);

  useEffect(()=>{
    if(addedReply){
      setReplyMode(false);
      setReplyCommentId(null);
      dispatch(postSlice.actions.resetStateComment());
    }
  },[addedReply])

  const addHeart = useCallback(()=>{
    dispatch(addLike(post.id));
  },[post]);

  const removeHeart = useCallback(()=>{
    dispatch(removeLike(post.id));
  },[post]);

  return(
    <>
      <CommentBoxWrapper>
        <div className="secondBox">
          <div className="commentContainer contentContainer">
            <div>
              <img src={`${backendServer}/${post.User.profileUrl}`} />
            </div>
            <div className="content">
              <div>
                <Link href={`/${post.User.nickname}`}>
                  <a className="nickname">{post.User.nickname}</a>
                </Link>
                {post.content.split(/(#[^\s#]+)/g).map((v)=>{
                  if(v.match(/#[^\s#]+/)){
                    return(
                      <Link href={`/hashtag/${v.slice(1).toLowerCase()}`}>
                        <a className="hashtag">{v}</a>
                      </Link>
                    )
                  }
                  return v;
                })}
              </div>
              <div className="lastBox">
                <span className="time">{dayjs(post.createdAt).fromNow(true)}</span>
              </div>
            </div>

          </div>
          {post.Comments.map(c=>{
            return(
              <Comment 
                setReplyCommentId={setReplyCommentId} 
                setReplyMode={setReplyMode} 
                c={c}
                post={post}
                key={c.id}
              />
            )
          })}
        </div>
      </CommentBoxWrapper>
      <ModalCommentFormWrapper>
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
            <FontAwesomeIcon className="button comment" icon={faComment} />
            <FontAwesomeIcon className="button" icon={faPaperPlane} />
          </div>
          <div className="secondBlock">
            <FontAwesomeIcon className="button bookmark" icon={faBookmark} />
          </div>
        </ButtonBoxWapper>
        <div className="like">
          좋아요 {post.Liker.length}개
        </div>
        <div className="time">
          {dayjs(post.createdAt).fromNow(true)} 전 
        </div>
        <CommentForm postId={post.id} replyMode={replyMode} replyCommentId={replyCommentId}/>
      </ModalCommentFormWrapper>
    </>
  )
}

export default CommentBox;