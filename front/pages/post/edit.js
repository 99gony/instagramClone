import axios from 'axios';
import React from 'react';
import { loadPostToEdit } from '../../actions/post';
import { loadUser } from '../../actions/user';
import Header from '../../components/Header';
import PostForm from '../../components/PostForm';
import wrapper from '../../store';

const PostEditPage = () => {

  return(
    <div>
      <Header currentLocate="user" />
      <PostForm />
    </div>
  )
};

export const getServerSideProps = wrapper.getServerSideProps((store)=>async({req,query})=>{
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch((loadUser()));
  await store.dispatch((loadPostToEdit(parseInt(query.p))));
})

export default PostEditPage;