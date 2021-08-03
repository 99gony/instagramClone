import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentLike, removeComment, removeCommentLike } from '../../actions/post';
import { backendServer } from '../../actions/user';
import { ModalWapper } from '../PostCard/style';

const Reply = ({c,r,post,setReplyCommentId, setReplyMode}) => {
  const dispatch = useDispatch();
  const {me} = useSelector(state=>state.user);
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

  const onHover = useCallback(()=>{
    setIsHover(true);
  },[]);

  const onLeave = useCallback(()=>{
    setIsHover(false);
  },[])

  const onReply = useCallback((commentId)=>()=>{
    setReplyMode(true);
    setReplyCommentId(commentId);
  },[]);
  
  const addCommentHeart = useCallback((commentId)=>()=>{
    dispatch(addCommentLike({commentId, postId: post.id}));
  },[]);
  
  const removeCommentHeart = useCallback((commentId)=>()=>{
    dispatch(removeCommentLike({commentId, postId: post.id}));
  },[]);
  
  return(
    <div className="commentContainer">
      <div>
        <img src={`${backendServer}/${r.User.profileUrl}`} />
      </div>
      <div className="comment inReplys" onMouseEnter={onHover} onMouseLeave={onLeave}>
        <div>
          <Link href={`/${r.User.nickname}`}>
            <a className="nickname">{r.User.nickname}</a>
          </Link>
          {r.content.split(/(#[^\s#]+)/g).map((v)=>{
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
          <span className="time">{dayjs(r.createdAt).fromNow(true)}</span>
          {r.CommentLiker.length === 0 ?
          null
          :
          <span>좋아요 {r.CommentLiker.length}개</span>
          }
          <span onClick={onReply(c.id)}>답글 달기</span>
        </div>
      </div>
      {isHover?
        <div className="commentMoreButton inReplys" onMouseEnter={onHover} onMouseLeave={onLeave} >
          <EllipsisOutlined onClick={showModal}/>
          <ModalWapper visible={isModalVisible} footer={null} onCancel={handleCancel} closable={false}>
            {me.id === r.User.id?
            <> 
              <button onClick={onDelete(r.id)} className="delete">삭제</button>
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
      <div className="commentLike inReplys">
        {r.CommentLiker.find(liker=>liker.id === me.id)?
        <div onClick={removeCommentHeart(r.id)} className="heartWrapper button">
          <div className="heart heart-active is_animating"/>
        </div>
        :
        <div onClick={addCommentHeart(r.id)} className="heartWrapper button">
          <div className="heart"/>
        </div>
        }
      </div>
    </div>
  )
}

export default Reply;