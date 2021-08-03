import axios from 'axios';
import React from 'react';
import { loadUser } from '../../actions/user';
import Header from '../../components/Header';
import PostForm from '../../components/PostForm';
import wrapper from '../../store';

const PostUploadPage = () => {
  return(
    <div>
      <Header currentLocate="user" />
      <PostForm />
    </div>
  )
};

export const getServerSideProps = wrapper.getServerSideProps((store)=>async({req})=>{
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch((loadUser()));
})

export default PostUploadPage;