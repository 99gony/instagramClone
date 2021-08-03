import axios from 'axios';
import React from 'react';
import { loadPost } from '../../actions/post';
import { loadUser } from '../../actions/user';
import ModalPost from '../../components/Post/ModalPost';
import wrapper from '../../store';

const IndividualPost = () => {
  return(
    <ModalPost />
  )
};

export const getServerSideProps = wrapper.getServerSideProps((store)=>async({req,params})=>{
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch((loadUser()));
  await store.dispatch(loadPost(parseInt(params.postId)));
})


export default IndividualPost;