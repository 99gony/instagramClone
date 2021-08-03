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
    margin: 8px 0 10px 0;
  }
  .ant-input:focus{
    border-color: #57a8e9;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(87,168,233, .2);
    box-shadow: 0 0 0 2px rgba(87,168,233, .2);
  }
`;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  height: 606px;
  margin-top: 12px;
`;

export const ImageWrapper = styled.div`
  margin: 22px 86.5px 8px 86.5px;
`;

export const LoginBoxWrapper = styled.div`
  margin-bottom: 10px;
  border: 1px solid rgba(var(--b6a,219,219,219),1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 348px;
  padding: 10px 0;
  background-color: #FFFFFF;
`;

export const SignupBoxWrapper = styled.div`
  border: 1px solid rgba(var(--b6a,219,219,219),1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 348px;
  height: 40.6px;
  padding: 10px 0;
  margin-bottom: 10px;
  background-color: #FFFFFF;
  p{
    margin: auto 0;
    font-size: 14px;
  }
  p a{
    font-weight: bold;
  }
`;

export const DownloadBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:350px;
  height: 100.8px;

  p{
    margin: 10px 20px;
    text-align: center;
  }

  div{
    position: relative;
    top: -5px;
    margin: 10px 0;
  }
  
  div a:first-child{
    margin-right: 8px;
  }
`;

export const InputWrapper = styled.input`
  background-color: #FAFAFA;
  box-sizing: content-box;
  width:250px;
  height: 20px;
  padding: 8px;
  font-size: 13.5px;
  margin-bottom: 7px;
  border-radius: 3px;
  border: 1px solid #dbdbdb;

  :focus{
    border: 1px solid #9c9c9c;
    outline: none;
  }

  ::placeholder{
    color: #9c9c9c;
    font-size: 12.5px;
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

export const KakaoLoginButtonWrapper = styled.div`
  width: 266px;
  height: 29.6px;
  padding:0;
  margin: 7px 40px 8px 40px;
  border-radius: 5px;
  font-weight: bold;

  a{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: inherit;
    justify-content: center;
  }

  a span{
    margin-left: 8px;
  }
`;

export const DividerWrapper = styled.div`
  width: 268px;
`;

export const ForgotPassword = styled.a`
  color: inherit;
  font-size: 12px;
  margin: 12px 0 0 0;

  :hover{
    color:inherit;
  }
`;

export const ErrorWrapper = styled.div`
  color: red;
  font-size: 14px;
`;
