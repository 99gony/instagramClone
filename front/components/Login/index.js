import Image from 'next/image';
import React, { useCallback } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import bigLogo from '../../public/images/big_logo.jpeg';
import appStore from '../../public/images/downloadWithApple.png';
import playStore from '../../public/images/downloadWithGoogle.png';
import kakaoLogin from '../../public/images/kakaoSymbol.png';
import { Divider } from 'antd';
import { ContainerWrapper, DividerWrapper, DownloadBoxWrapper, ErrorWrapper, ForgotPassword, FormWrapper, GlobalStyle, ImageWrapper, InputWrapper, KakaoLoginButtonWrapper, LoginBoxWrapper, SignupBoxWrapper } from './style';
import { LoginButtonWrapper } from '../SignupForm/style';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../actions/user';
import { LoadingOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const dispatch = useDispatch();
  const {loggingIn, loginError} = useSelector(state=>state.user);
  const {control, handleSubmit} = useForm();

  const onSubmit = useCallback((data)=>{
    dispatch(loginAction(data));
    console.log(data);
  },[]);

  return(
    <>
    <GlobalStyle/>
    <ContainerWrapper>
      <LoginBoxWrapper>

        <ImageWrapper>
          <Image quality={100} src={bigLogo} alt="logo"/>
        </ImageWrapper>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({field})=> <InputWrapper {...field} autoComplete="email" placeholder="이메일"/>}
          />
          <Controller
            name="password"
            control={control}
            render={({field})=> <InputWrapper {...field} autoComplete="off" type="password" placeholder="비밀번호"/>}
          />
          <LoginButtonWrapper type="primary" htmlType="submit">{loggingIn? <LoadingOutlined /> :<>로그인</>}</LoginButtonWrapper>
        </FormWrapper>

        <DividerWrapper>
          <Divider>
            또는
          </Divider>
        </DividerWrapper>

        <KakaoLoginButtonWrapper>
          <Link href=''>
            <a>
              <Image width={24} height={24} quality={100} objectFit="contain" src={kakaoLogin} alt="카카오 로고"/>
              <span>
                Kakao으로 로그인
              </span>
            </a>
          </Link>
        </KakaoLoginButtonWrapper>
        
        {loginError? <ErrorWrapper>{loginError}</ErrorWrapper> : null}
        <Link href=""><ForgotPassword>비밀번호를 잊으셨나요?</ForgotPassword></Link>
      </LoginBoxWrapper>

      <SignupBoxWrapper>
          <p>계정이 없으신가요? <Link href="/signup"><a>가입하기</a></Link></p>
      </SignupBoxWrapper>

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

export default LoginForm;