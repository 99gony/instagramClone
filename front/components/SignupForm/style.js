import { Button } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .ant-divider-horizontal.ant-divider-with-text-center::before,
  .ant-divider-horizontal.ant-divider-with-text-center::after{
    border-top: 1px solid #c9c9c9;
  }
  .ant-divider-inner-text{
    color: #8E8E8E;
    font-size: 13px;
    font-weight: bold;
    margin: 0 5px;
  }
  .ant-divider-horizontal.ant-divider-with-text{
    margin: 8px 0 18px 0;
  }
`;

export const ContainerWrapper = styled.div`
  position: relative;
  top:32px;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 678.6px;
  margin-top: 12px;
`;

export const SignupBoxWrapper = styled.div`
  border: 1px solid rgba(var(--b6a,219,219,219),1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 348px;
  height: 466px;
  padding: 10px 0;
  margin-bottom: 10px;
  background-color: #FFFFFF;
`;

export const LoginBoxWrapper = styled.div`
  border: 1px solid rgba(var(--b6a,219,219,219),1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 348px;
  height: 47.6px;
  padding: 10px 0;
  margin-bottom: 10px;
  background-color: #FFFFFF;
  p{
    margin: auto 0;
    font-size: 14px;
  }
`;

export const KakaoLoginButtonWrapper = styled.div`
  overflow: hidden;
  width: 266px;
  height: 29.6px;
  padding:0;
  background-color: #FEE500;
  margin: 7px 40px 8px 40px;
  border-radius: 5px;
  font-weight: bold;

  a{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LoginButtonWrapper = styled(Button)`
  width: 266px;
  height: 27.6px;
  padding:0;
  margin: 7px 40px 8px 40px;
  border-radius: 5px;
  font-weight: bold;
`;

export const DescriptionWrapper = styled.h2`
  width: 268px;
  height: 40px;
  font-size: 17px;
  color: rgba(var(--f52,142,142,142),1);
  font-weight: 600;
  text-align: center;
  line-height: 20px;
  margin: 0 40px 10px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputWrapper = styled.input`
  background-color: #FAFAFA;
  box-sizing: content-box;
  width:250px;
  height: 20px;
  padding: 8px;
  font-size: 13.5px;
  margin-bottom: 5px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;

  :focus{
    border: 1px solid #9c9c9c;
    outline: none;
  }

  ::placeholder{
    color: #9c9c9c;
    font-size: 12.5px;
  }
`;