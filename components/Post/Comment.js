import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { addCommentLike, removeComment, removeCommentLike } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { backendServer } from '../../actions/user';
import dayjs from 'dayjs';
import { EllipsisOutlined } from '@ant-design/icons';
import Reply from './Reply';
import { ModalWapper } from '../PostCard/style';


const Comment = ({c, setReplyCommentId, setReplyMode, post}) => {
  const dispatch = useDispatch();
  const {me} = useSelector(state=>state.user);
  const [watchReply, setWatchReply] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onDelete = useCallback((data)=>()=>{
    dispatch(removeComment(data))
    setIsModalVisible(false);
  },[])

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  },[isModalVisible])

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  },[isModalVisible]);

  const onClickWatchReply = useCallback(()=>{
    setWatchReply(state=>!state);
  },[]);
  
  const onHover = useCallback(()=>{
      setIsHover(true);
  },[]);

  const onLeave = useCallback(()=>{
      setIsHover(false);
  },[])

  const addCommentHeart = useCallback((commentId)=>()=>{
    dispatch(addCommentLike({commentId, postId: post.id}));
  },[]);
  
  const removeCommentHeart = useCallback((commentId)=>()=>{
    dispatch(removeCommentLike({commentId, postId: post.id}));
  },[]);

  const onReply = useCallback((commentId)=>()=>{
    setReplyMode(true);
    setReplyCommentId(commentId);
  },[]);

  return(
    <div className="commentContainer">
      <div>
        <img src={`${backendServer}/${c.User.profileUrl}`} />
      </div>
      <div className="hoverBox">
        <div className="comment" onMouseEnter={onHover} onMouseLeave={onLeave}>
          <div>
            <Link href={`/${c.User.nickname}`}>
              <a className="nickname">{c.User.nickname}</a>
            </Link>
            {c.content.split(/(#[^\s#]+)/g).map((v)=>{
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
            <span className="time">{dayjs(c.createdAt).fromNow(true)}</span>
            {c.CommentLiker.length === 0 ?
            null
            :
            <span>좋아요 {c.CommentLiker.length}개</span>
            }
            <span onClick={onReply(c.id)}>답글 달기</span>
          </div>
        </div>
        {c.Reply.length === 0?
        null
        :
        <>
        <div className="replyBox" onClick={onClickWatchReply}>
          <div className="divider"/>
          {watchReply?
          <>답글 숨기기</>
          :
          <>답글 보기({c.Reply.length}개)</>
          }
        </div>
        </>
        }
        {watchReply?
        <div className="replys">
          {c.Reply.map((r)=>{
            return(
              <Reply key={r.id} post={post} c={c} r={r} setReplyCommentId={setReplyCommentId} setReplyMode={setReplyMode} />
            )
          })}  
        </div>
        :
        null
        }
      </div>
      {isHover?
        <div className="commentMoreButton" onMouseEnter={onHover} onMouseLeave={onLeave} >
          <EllipsisOutlined onClick={showModal}/>
          <ModalWapper visible={isModalVisible} footer={null} onCancel={handleCancel} closable={false}>
            {me.id === c.User.id?
            <> 
              <button onClick={onDelete(c.id)} className="delete">삭제</button>
            </>
            :
            <>
              <button className="report">신고</button>
            </>
            }
            <button>취소</button>
          </ModalWapper>
        </div>
      :
        null}
      <div className="commentLike">
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
}

export default Comment;