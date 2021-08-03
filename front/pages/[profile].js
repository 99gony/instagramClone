import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import wrapper from '../store';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { loadProfile, loadUser } from '../actions/user';
import ProfileLayout from '../components/Profile';
import { indexSlice } from '../reducers';
import ModalPost from '../components/Post/ModalPost';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {postId} = router.query;
  const {loadedProfile,me} = useSelector(state=>state.user);

  useEffect(()=>{
    dispatch(indexSlice.actions.changeMenu('user'));
  },[]);

  if(!loadedProfile || !me){
    return(
      <div style={{margin:'auto auto'}}><LoadingOutlined /></div>
    )
  }

  return(
    <div>
      <Header currentLocate="user"/>
      <ProfileLayout profileUser={loadedProfile}/>
      {postId? <ModalPost /> : null}
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=>async({req,params})=>{
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadUser());
  await store.dispatch(loadProfile(params.profile));
})

export default ProfilePage;