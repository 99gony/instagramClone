import Modal from "antd/lib/modal/Modal";
import styled from "styled-components";

export const PostImageWrapper = styled.div`
  max-width:600px;
  max-height: 600px;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin: auto auto;
  }
`;

export const ModalPostWrapper = styled(Modal)`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  animation: none;
  display: table;
  padding:0;
  
  div.ant-modal-content{
    max-width: 935px;
    max-height: 600px; 
    background: none;
    box-shadow: none;
    .ant-modal-body{
      padding:0;
      margin:0;
      display:flex;
      position: relative;
    }
  }

  div.leftBox{
    height: 450px;
    margin-right: 335px;
  }
  
  div.imageBox{
    &.one{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    min-width: 480px;
    min-height: 450px;
    max-width: 600px;
    max-height: 600px;
    overflow: hidden;
    background-color: black;
    margin-right: 335px;
  }

  div.rightBox{
    position: absolute;
    top:0;
    right: 0;
    bottom: 0;
    width:335px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #FFFFFF;

    div.firstBox{
      padding:16px;
      width:302px;
      height: 39px;
      border-bottom: 1px solid #efefef;
      border-left: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div.profile{
        display:flex;
        align-items: center;
        img{
          width:32px;
          height: 32px;
          border-radius: 50%;
        }
        span{
          margin-left: 14px;
          font-weight: 600;
        }
      }
      div.more{
        span{
          font-size: 20px;
          padding: 5px;
          cursor: pointer;
        }
      }
    }
  }
`;

export const CommentBoxWrapper = styled.div`
  overflow: auto;
  padding: 16px 16px 4px;
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar{
    display: none;
  }

  div.commentContainer{
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    div.hoverBox{
      display: flex;
      flex-direction: column;
    }
    div.commentMoreButton{
      position: absolute;
      right: 30px;
      font-size: 20px;
      background-color: rgba( 255, 255, 255, 0.5 );
      color: #8e8e8e;
      cursor: pointer;
      &.inReplys{
        right: 15px;
      }
    }
    &.contentContainer{
      margin-top: 6px;
    }
    div.commentLike{
      &.inReplys{
        position: absolute;
        right: -13px;
      }
      .heartWrapper{
        position: relative;
        cursor: pointer;
        width: 12px;
        height: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        
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
  img{
    width:32px;
    height: 32px;
    border-radius: 50%;
    margin-top: 2px;
    margin-right: 14px;
  }
  div.content, div.comment{
    line-height: 18px;
    display: flex;
    flex-direction: column;
    width:100%;

    a.nickname{
      font-weight: 600;
      color: black;
      margin-right: 5px;
      :hover{
        text-decoration: underline;
      }
    }
    a.hashtag{
      color: #00376b;
    }
    div.lastBox{
      margin-top: 12px;
      >span{
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        margin-right: 12px;
        color: #8e8e8e;
        &.time{
          cursor: inherit;
          font-weight: initial;
        }
      }
    }
  }
  div.comment{
    width: 241px;
    &.inReplys{
      width: 195px;
    }
  }
  div.replyBox{
    width: 125px;
    cursor: pointer;
    margin-top: 18px;
    display: flex;
    align-items: center;
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 600;
    div.divider{
      width: 24px;
      height: 0;
      margin-right: 16px;
      border-bottom: 1px solid #8e8e8e;
    }
  }
  .replys{
    display: initial;
    &.hidden{
      display: none;
    }
  }
`;

export const ModalCommentFormWrapper = styled.div`
  background-color: #FFFFFF;
  padding-top: 4px;
  width:335px;
  height: 150px;
  .like{
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    padding: 3px 16px;
  }
  .time{
    font-size: 10px;
    color: #8e8e8e;
    padding: 5px 16px;
  }
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
      pointer-events: none;
      position: relative;
      top: -30px;
      margin:0 2px !important;
      width:3px !important;
      height:3px !important;
      padding: 0 3.5px;
      button{
        ::before{
          font-size: 3px !important;
          line-height: 12px !important;
          color: white !important;
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

export const ButtonBoxWapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #efefef;
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