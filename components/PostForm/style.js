import styled from "styled-components";

export const PostFormWrapper = styled.div`
  position: relative;
  top: 54px;
  width: 935px;
  height: 783px;
  display: flex;
  margin: 60px auto 0;

  h1{
    font-size: 32px;
    font-weight: lighter;
  }

  div.contentBox{
    background-color: #FFFFFF;
    border: 1px solid #dbdbdb;
    padding: 23px;
    height: 620px;
    width:555px;
  }
`;

export const PostImageInputWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 23px;
  width: 272px;
  height: 620px;
  background-color: #FFFFFF;
  border: 1px solid #dbdbdb;
  margin-right: 60px;
  
  svg{
    color: lightblue;
    font-size: 60px;
    margin-bottom: 20px;
  }

  div{
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 30px;
  }
`;

export const PostPreviewBoxWrapper = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 28px;

  h2{
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const PreviewSliderWrapper = styled.div`
  .slick-disabled{
    display: none;
    cursor: inherit;
    ::before{
      display: none;
    }
  }
  .slick-arrow.slick-next{
    z-index: 100;
    width: 30px;
    height: 30px;
    right: 0;
    padding: 5px;
    
    ::before{
      font-size: 24px;
      text-shadow: gray 0 0 4px;
      border-radius: 50%;
    }
    :hover {
      opacity: 0.75;
    }
    :focus{
      opacity: 0.75;
    }
  }
  .slick-arrow.slick-prev{
    z-index: 100;
    width: 30px;
    height: 30px;
    left: 0;
    padding: 5px;
    
    ::before{
      font-size: 24px;
      text-shadow: gray 0 0 4px;
      border-radius: 50%;
    }
    :hover {
      opacity: 0.75;
    }
    :focus{
      opacity: 0.75;
    }
  }
  .slick-dots{
    li{
      position: relative;
      top:5px;
      margin:0 2px !important;
      width:3px !important;
      height:3px !important;
      padding: 0 3.5px;
      button{
        ::before{
          font-size: 3px !important;
          line-height: 12px !important;
          color: gray !important;
        }
      }
    }
  }
`;

export const PostPreviewWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 290px;
  img{
    display:block;
    width:100%;
    max-height: 100%;
    margin: auto auto;
    object-fit: contain;
  }
  span{
    position: absolute;
    top: 10px;
    right: 0;
    transform: translateX(-50%);
    svg{
      font-size: 30px;
      color: lightgray;
      border-radius: 50%;
      
      :hover{
        cursor: pointer;
        color: gray;
      }
    }
  }
`;

export const PostPreviewWrapperWhenMoreThanEight = styled.div`
  position: relative;
  height: 145px;
  img{
    display: block;
    padding: 20px 10px;
    margin: auto auto;
    max-height: 90%;
    object-fit: contain;
  }
  span{
    position: absolute;
    top: 24px;
    right: 0;
    transform: translateX(-50%);
    
    svg{
      font-size: 21px;
      color: lightgray;
      border-radius: 50%;
  
      :hover{
        cursor: pointer;
        color: gray;
      }
    }
  }
`;

export const PostContentForm = styled.div`
  display:flex;
  flex-direction: column;

  h2{
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: bold;
  }
  
  form{
    textarea{
      width: 555px;
      height: 120px;
      box-sizing: border-box;
      border: 1px solid #dbdbdb;
      padding: 10px;
      border-radius: 5px;
      ::placeholder{
        font-size: 16px;
        color: #8e8e8e;
      }
      :focus{
        outline: none;
      }
    }
    button{
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      padding: 5px 9px;
      border-radius: 4px;
      float: right;
      width: 28px;
      height: 17.6px;
      margin-top: 12px;

      :disabled{
        cursor: inherit;
      }
    }
  }
`;