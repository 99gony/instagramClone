import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { searchHashtag } from '../../actions/hashtag';
import { backendServer, loadUser } from '../../actions/user';
import Header from '../../components/Header';
import ModalPost from '../../components/Post/ModalPost';
import PostBox from '../../components/Profile/PostBox';
import { ProfilePostsWrapper } from '../../components/Profile/style';
import wrapper from '../../store';

const HashtagPageWrapper = styled.div`
  position: relative;
  top: 54px;
  display: flex;
  flex-direction: column;
  width: 935px;
  margin: 0 auto;
`;

const HashtagBoxWrapper = styled.div`
  display:flex;
  align-items: center;
  height: 152px;
  margin: 30px 0 44px 0;
  
  .tagImage{
    img{
      width:152px;
      height: 152px;
      border-radius: 50%;
    }
  }
  .titleBox{
    display:flex;
    flex-direction: column;
    margin-left: 50px;
    h1{
      font-size: 28px;
      font-weight: lighter;
      margin-bottom: 12px;
      line-height: 32px;
    }
    span{
      font-size: 16px;
      margin-bottom: 28px;
      .border{
        font-weight: 600;
      }
    }
    button{
      cursor: pointer;
      display:flex;
      justify-content: center;
      align-items: center;
      padding: 5px 9px;
      height: 17.6px;
      width: 87px;
      font-weight: 600;
      font-size: 14px;
      border: 1px solid rgba(var(--b6a,219,219,219),1);
      border-radius: 5px;
      background-color: #0095f6;
      color: #ffffff;
    }
  }
`;

const hashtagPage = () => {
  const router = useRouter();
  const {postId} = router.query;
  const {loadedHashtag} = useSelector(state=>state.post);

  return(
    <>
      <Header currentLocate='none' />
      <HashtagPageWrapper>
        <HashtagBoxWrapper>
          <div className="tagImage">
            <img src={`${backendServer}/${loadedHashtag.Posts[0].Images[0].url}`} />
          </div>
          <div className="titleBox">
            <h1>#{loadedHashtag.title}</h1>
            <span>게시물 <span className="border">{loadedHashtag.Posts.length}</span></span>
            <button>팔로우</button>
          </div>
        </HashtagBoxWrapper>
        <ProfilePostsWrapper>
          {loadedHashtag.Posts.map((p)=>{
            return(
              <PostBox p={p} key={p.id} />
            )
          })}
        </ProfilePostsWrapper>
      </HashtagPageWrapper>
      {postId? <ModalPost /> : null}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=>async({req,params})=>{
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch((loadUser()));
  await store.dispatch(searchHashtag(encodeURIComponent(params.title)));
})


export default hashtagPage;