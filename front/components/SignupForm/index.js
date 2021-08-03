import Link from 'next/link';
import Image from 'next/image';
import React, { useCallback, useEffect } from 'react';
import bigLogo from '../../public/images/big_logo.jpeg';
import kakaoLogin from '../../public/images/kakao_login.png';
import appStore from '../../public/images/downloadWithApple.png';
import playStore from '../../public/images/downloadWithGoogle.png';
import { useForm, Controller } from 'react-hook-form';
import { DividerWrapper, DownloadBoxWrapper, ImageWrapper } from '../Login/style';
import { ContainerWrapper, DescriptionWrapper, FormWrapper, GlobalStyle, InputWrapper, KakaoLoginButtonWrapper, LoginBoxWrapper, LoginButtonWrapper, SignupBoxWrapper } from './style';
import { Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signupAction } from '../../actions/user';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const SignupForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {signingUp, signedUp, signupError} = useSelector(state=>state.user);
  const {control, handleSubmit} = useForm();

  useEffect(()=>{
    if(signedUp){
      router.replace('/');
    }
  },[signedUp]);

  useEffect(()=>{
    if(signupError){
      alert(signupError);
    }
  },[signupError])

  const onSubmit = useCallback((data)=>{
    console.log(data);
    dispatch(signupAction(data));
  },[])

  return(
    <>
      <GlobalStyle/>
      <ContainerWrapper>
        <SignupBoxWrapper>
          <ImageWrapper>
            <Image quality={100} src={bigLogo} alt="logo"/>
          </ImageWrapper>
          <DescriptionWrapper>친구들의 사진과 동영상을 보려면 가입하세요.</DescriptionWrapper>
          <KakaoLoginButtonWrapper>
            <Link href="">
              <a>
                <Image height={42} objectFit="contain" src={kakaoLogin} alt="카카오로 시작하기"/>
              </a>
            </Link>
          </KakaoLoginButtonWrapper>
          <DividerWrapper>
            <Divider>
              또는
            </Divider>
          </DividerWrapper>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({field})=> <InputWrapper {...field} autoComplete="off" placeholder="이메일 주소"/>}
            />
            <Controller
              name="name"
              control={control}
              render={({field})=> <InputWrapper {...field} autoComplete="off" placeholder="성명"/>}
            />
            <Controller
              name="nickname"
              control={control}
              render={({field})=> <InputWrapper {...field} autoComplete="off" placeholder="닉네임"/>}
            />
            <Controller
              name="password"
              control={control}
              render={({field})=> <InputWrapper {...field} autoComplete="off" type="password" placeholder="비밀번호"/>}
            />
            <LoginButtonWrapper type="primary" htmlType="submit">{signingUp ? <LoadingOutlined /> : <>가입</>}</LoginButtonWrapper>
          </FormWrapper>
        </SignupBoxWrapper>
        <LoginBoxWrapper>
          <p>계정이 있으신가요? <Link href="/"><a>로그인</a></Link></p>
        </LoginBoxWrapper>
        <DownloadBoxWrapper>
        <p>앱을 다운로드하세요.</p>
        <div>
          <Link href="">
            <a>
              <Image layout="fixed" width={136} height={40} src={appStore} alt="앱스토어에서 다운로드"/>
            </a>
          </Link>
          <Link href="">
            <a>
              <Image layout="fixed" width={134.3} height={40} src={playStore} alt="플레이스토어에서 다운로드"/>
            </a>
          </Link>
        </div>
      </DownloadBoxWrapper>
      </ContainerWrapper>
    </>
  )
}

export default SignupForm;