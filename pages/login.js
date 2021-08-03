import axios from 'axios';
import router from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadUser } from '../actions/user';
import LoginLayout from '../components/Login/LoginLayout';
import wrapper from '../store';

const LoginContainer = styled.div`
    background-color: #FAFAFA;
  `;

const LoginPage = () => {
  const {isLoggedIn} = useSelector(state=>state.user);

  useEffect(()=>{
    if(isLoggedIn){
      router.replace('/');
    }
  },[isLoggedIn])

  return(
    <LoginContainer>
      <LoginLayout/>
    </LoginContainer>
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

export default LoginPage;