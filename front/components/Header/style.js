import { Input } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

export const ImageWrapper = styled.a`
  position: relative;
  top: 5px;
`;

export const ContainerWrapper = styled.div`
  position: fixed;
  top:0;
  width:100%;
  z-index: 500;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(var(--b6a,219,219,219),1);
  background-color: #FFFFFF;
`;

export const HeaderWrapper =  styled.div`
  height: 53px;
  width: 935px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchWrapper = styled(Input)`
  width: 180px;
`;

export const MenuWrapper = styled.div`
  position: relative;
  top: 3px;
  width: 200px;
  display: flex;
  justify-content: space-between;
`;

export const IconWrapper = styled.a`
  color: inherit;
  cursor: pointer;

  :hover{
    color: inherit;
  }
`;

export const PopoverWrapper = styled.div`
  padding: 0 0 6px 0;
  div{
    width:198px;
    height: 21px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
  }
  
  div:hover{
    background-color: #FAFAFA;
  }
`;

export const GlobalStyle =  createGlobalStyle`
  .ant-popover-arrow{
    right:12px !important;
    width:17px;
    overflow: hidden;

    .ant-popover-arrow-content{
      width:12px;
      height: 12px;
    }
  }
  .ant-popover{
    border-radius: 20px;
  }
  .ant-popover-title{
    padding: 0;
  }
  .ant-popover-inner-content{
    padding: 0;
  }
  .ant-popover-title{
    border-bottom: 2px solid lightgray;
  }
  .ant-input-affix-wrapper{
    background-color: #FAFAFA;
    color: #8E8E8E;
    
    input{
      background-color: #FAFAFA;
    }

    :hover{
      border-color: #d9d9d9 !important;
    }

    ::placeholder{
      color: #8E8E8E;
    }
  }
  .ant-input-affix-wrapper-focused{
    outline: none !important;
    box-shadow: none !important;
    border-color: #d9d9d9 !important;
  }
  a{
    text-decoration: none;
    color: inherit;

    :hover{
      color: inherit;
    }
  }
`;