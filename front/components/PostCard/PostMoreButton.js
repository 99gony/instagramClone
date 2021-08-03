import { EllipsisOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../actions/post';
import { ModalWapper } from './style';
import Link from 'next/link';
import { followAction, unfollowAction } from '../../actions/user';

const PostMoreButton = ({post}) =>{
  const dispatch = useDispatch();
  const {me, following, unfollowing } = useSelector(state=>state.user);
  const {deletingPost, loadingPostToEdit} = useSelector(state=>state.post);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  },[isModalVisible])

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  },[isModalVisible]);

  const onDelete = useCallback(()=>{
    dispatch(deletePost(post.id));
  },[]);

  const onFollow = useCallback(()=>{
    dispatch(followAction(post.User.id));
  },[]);
  
  const onUnfollow = useCallback(()=>{
    dispatch(unfollowAction(post.User.id));
  },[]);

  const onBan = useCallback(()=>{

  },[]);

  const onReport = useCallback(()=>{

  },[]);

  return(
    <>
      <EllipsisOutlined style={{fontSize: 20, padding: '10px 5px'}} onClick={showModal} />
      <ModalWapper style={{fontWeight: 'bold'}} visible={isModalVisible} footer={null} onCancel={handleCancel} closable={false}>
        {me.id === post.User.id?
        <> 
          {deletingPost? <button><LoadingOutlined /></button> :<button onClick={onDelete} className="delete">삭제</button>}
          <Link href={`/post/edit?p=${post.id}`}><a><button className="edit">{loadingPostToEdit ? <LoadingOutlined /> :<>수정</>}</button></a></Link>
        </>
        :
        <>
          {me.Followings.find(f=>f.id === post.User.id)?
            <button onClick={onUnfollow} className="unfollow">{unfollowing? <LoadingOutlined /> : <>팔로우 취소</>}</button>
            :
            <button onClick={onFollow} className="follow">{following? <LoadingOutlined /> : <>팔로우</>}</button>
          }
          <button className="ban">차단</button>
          <button className="report">신고</button>
        </>
        }
      </ModalWapper>
    </>
  )
}

export default PostMoreButton;