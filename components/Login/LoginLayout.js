import React from 'react';
import styled from 'styled-components';
import PhoneSlider from '../PhoneSlider';
import LoginForm from '.';

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 935px;
  height: 618px;
  margin: 32px auto 0;
`;

const LoginLayout = () => {
  return(
    <LayoutWrapper>
      <PhoneSlider/>
      <LoginForm/>
    </LayoutWrapper>
  )
}

export default LoginLayout;