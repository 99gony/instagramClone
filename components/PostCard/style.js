import { Modal } from "antd";
import styled from "styled-components";

export const PostHeaderWrapper = styled.div`
  height: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:16px;
  border-bottom: 1px solid #efefef;

  .username{
    margin-left: 14px;
    font-weight: 600;
    color: #262626;
  }
`;

export const PostCardWrapper = styled.div`
  width: 614px;
  background-color: #FFFFFF;
  border: 1px solid rgba(var(--b6a,219,219,219),1);
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  margin-bottom: 24px;
`;

export const PostImageContainerWrapper = styled.div`
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
  div{
    div{
      display: flex;
      align-items: center;
    }
  }
`;

export const PostImageWrapper = styled.div`
    width:600px;
    img{
      width: 100%;
      object-fit: contain;
      margin: auto auto;
    }
`;

export const ButtonBoxWapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px 0;
  font-size: 24px;
  z-index: 100;

  div.firstBlock, div.secondBlock{
    display: flex;
    align-items: center;
  }
  .button{
    padding:8px;
    cursor: pointer;
  }

  .heartWrapper{
    position: relative;
    width: 32px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    
    .heart{
      pointer-events: none;
      position: absolute;
      height: 85px;
      width: 85px;
      background-image:url( 'https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
      background-position: left;
      background-repeat:no-repeat;
      background-size: 2900%;
      
      &.heart-active {
        background-position: right;
      }
    }
  
    .is_animating {
      animation: heart-burst .8s steps(28) 1;
    }
    
    @keyframes heart-burst {
      from {background-position:left;}
      to { background-position:right;}
    }
  }
  
  .button.bookmark{
    padding-right: 0;
  }
`;

export const ContentBoxWrapper = styled.div`
  padding: 0 16px;
  .like{
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .content{
    font-size: 14px;
    margin-bottom: 6px;
    span{
      font-weight: 600;
      margin-right: 5px;
    }
    a{
      color: #00376b;
    }
  }
  
  .comment{
    a{
      color: #8e8e8e;
    }
    .exComment{
      margin: 4px 0;
      div.commentBox{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 2px;
        span{
          font-weight: 600;
          margin-right: 5px;
        }
        .heartWrapper{
          position: relative;
          cursor: pointer;
          width: 12px;
          height: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 0;
          
          .heart{
            pointer-events: none;
            position: absolute;
            height: 42px;
            width: 42px;
            background-image:url( 'https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
            background-position: left;
            background-repeat:no-repeat;
            background-size: 2900%;
            
            &.heart-active {
              background-position: right;
            }
          }
        
          .is_animating {
            animation: heart-burst .8s steps(28) 1;
          }
          
          @keyframes heart-burst {
            from {background-position:left;}
            to { background-position:right;}
          }
        }
      }
    }
  }

  .createdAt{
    font-size: 10px;
    color: #8e8e8e;
    margin-bottom: 4px;
  }
`;

export const CommentFormWrapper = styled.div`
  height: 55px;
  border-top: 1px solid #efefef;
  margin-top: 4px;
  padding: 0 16px;
  display:flex;
  align-items: center;
  justify-content: space-between;

  form{
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;

    svg{
      font-size: 24px;
      padding: 8px 16px 8px 0;
    }
    input{
      width:100%;
      height: 18px;
      border: none;
      
      :-webkit-autofill {
        box-shadow: 0 0 0 1000px #fff inset;
      }

      :focus{
        outline:none;
      }

      ::placeholder{
        color: #8e8e8e;
      }
    }
    button{
      width: 40px;
      border:none;
      background: none;
      font-size: 14px;
      font-weight: 600;
      color: #0095f6;
      cursor: pointer;

      :disabled{
        opacity: 0.35;
        color: #0095f6;
        cursor: inherit;
      }
    }
  }
`;

export const ModalWapper = styled(Modal)`
  top:40%;

  div.ant-modal-content{
    width:400px;
    border-radius: 10px;
    margin: auto;
    overflow: hidden;
    .ant-modal-body{
      padding:0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  button{
    background: none;
    cursor: pointer;
    width: 384px;
    height: 42px;
    padding: 4px 8px;
    font-weight: 600;
    border: none;
    border-bottom: 1px solid #dbdbdb;

    &.delete,&.ban,&.report{
      color: red;
    }

    &.follow,&.edit{
      color: #1890ff;
    }

    &:hover{
      background-color: #FAFAFA;
    }

    &:last-child{
      border-bottom: none;
    }
  }
`; 