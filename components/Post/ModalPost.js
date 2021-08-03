import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { backendServer } from '../../actions/user';
import PostImage from '../Post/PostImage';
import { ModalPostWrapper } from './style';
import { EllipsisOutlined  } from '@ant-design/icons';
import CommentBox from './CommentBox';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loadPost } from '../../actions/post';

const ModalPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const post = useSelector(state=>state.post.loadedPost);

  useEffect(()=>{
    dispatch(loadPost(parseInt(router.query.postId)));
  },[])

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    router.back();
  },[isModalVisible]);

  return(
    <ModalPostWrapper visible={isModalVisible} footer={null} onCancel={handleCancel} closable={false}>
      {!post ?
      <>
      <div className="imageBox">
        <Skeleton.Input active style={{width:600, height: 450}} />
      </div>
      <div className="rightBox">
        <div className="firstBox">
          <div className="profile">
            <Skeleton avatar active />
          </div>
          <div className="more">
            <EllipsisOutlined />
          </div>
        </div>
        <Skeleton avatar active paragraph={{rows: 2}}/>
        <Skeleton avatar active paragraph={{rows: 2}}/>
      </div>
      </>
      :
      <>
        {post.Images.length === 0 ?
          <div className="leftBox" />
          :
          post.Images.length === 1?
          <div className="imageBox one">
            <PostImage images={post.Images} />
          </div>
          :
          <div className="imageBox">
            <PostImage images={post.Images} />
          </div>
        }
        <div className="rightBox">
          <div className="firstBox">
            <div className="profile">
              <img src={`${backendServer}/${post.User.profileUrl}`} alt="프로필 사진" />
              <span>{post.User.nickname}</span>
            </div>
            <div className="more">
              <EllipsisOutlined />
            </div>
          </div>
          <CommentBox post={post} />
        </div>
      </>
      }
    </ModalPostWrapper>
  )
}

export default ModalPost;