import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header';
import { indexSlice } from '../reducers';
import PostCard from '../components/PostCard'
import LoginPage from './login';
import { loadPosts } from '../actions/post';
import { postSlice } from '../reducers/post';
import wrapper from '../store';
import axios from 'axios';
import { loadUser } from '../actions/user';
import { useRouter } from 'next/router';
import ModalPost from '../components/Post/ModalPost';

const MainContainer = styled.div`
    position: relative;
    top: 54px;
    width: 935px;
    margin: 0 auto;
    padding-top: 30px;
    background-color: #FAFAFA;
  `;

const MainPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {postId} = router.query;
  const {isLoggedIn} = useSelector(state=>state.user);
  const {uploadedPost, loadedPosts, deletedPost, loadingPosts, hasMorePosts} = useSelector(state=>state.post);

  useEffect(()=>{
    if(deletedPost || uploadedPost ){
      dispatch(postSlice.actions.resetStatePost());
    }
  },[uploadedPost, deletedPost])

  useEffect(()=>{
    dispatch(indexSlice.actions.changeMenu('main'));
    if(loadedPosts.length === 0){
      dispatch(loadPosts());
    }
  },[isLoggedIn]);

  useEffect(()=>{
    function onScroll(){
      if(window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1){
        if(!loadingPosts && hasMorePosts){
          dispatch(loadPosts(loadedPosts[loadedPosts.length - 1]?.id));
          console.log(loadedPosts.length)
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  },[hasMorePosts, loadingPosts, loadedPosts]);

  return(
    <>
      {isLoggedIn?
      <>
      <Header currentLocate="main"/>
      <MainContainer>
        {loadedPosts.map((post)=> <PostCard key={post.id} post={post} /> )}
        {postId ? <ModalPost /> : null}
      </MainContainer>
      </>
      :
      <LoginPage />
      }
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=>async({req})=>{
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch((loadUser()));
  await store.dispatch(loadPosts());
})

export default MainPage;
