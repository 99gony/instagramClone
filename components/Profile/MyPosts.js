import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ProfilePostsWrapper, ProfileUploadBarWrapper } from './style';
import PostBox from './PostBox';

const MyPosts = ({profileUser}) => {
  const {me} = useSelector(state=>state.user);
  
  return(
    <>
    {profileUser.id === me.id?
      <ProfileUploadBarWrapper>
        <span>게시물</span>
        <Button type="primary">
          <Link href="/post/upload"><a>업로드</a></Link>
        </Button>
      </ProfileUploadBarWrapper>
    :null}
    <ProfilePostsWrapper>
      {profileUser.Posts.map((p)=>{
        return(
          <PostBox p={p} key={p.id} />
        )
      })}
    </ProfilePostsWrapper>
    </>
  )
};

export default MyPosts;