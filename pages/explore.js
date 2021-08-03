import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../actions/user';
import Header from '../components/Header';
import { indexSlice } from '../reducers';
import wrapper from '../store';

const ExplorePage = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(indexSlice.actions.changeMenu('explore'));
  },[]);

  return(
    <div>
      <Header currentLocate='explore'/>
      
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=>async({req})=>{
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch((loadUser()));
})

export default ExplorePage;