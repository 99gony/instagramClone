import axios from 'axios';
import router from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadUser } from '../actions/user';
import SignupForm from '../components/SignupForm';
import wrapper from '../store';

const SignupLayout = styled.div`
  display: flex;
  justify-content: center;
  background-color: #FAFAFA;
`;

const SignupPage =()=>{
  const {isLoggedIn,signedUp} = useSelector(state=>state.user);

  useEffect(()=>{
    if(isLoggedIn){
      alert('잘못된 접근입니다. 메인페이지로 이동합니다.');
      router.replace('/');
    }
  },[isLoggedIn])

  useEffect(()=>{
    if(signedUp){
      alert('성공적으로 회원가입 되었습니다! 다시 로그인 해주세요.')
    }
  },[signedUp])

  return(
    <SignupLayout>
      <SignupForm/>
    </SignupLayout>
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

export default SignupPage;