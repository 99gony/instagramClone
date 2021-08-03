import Modal from "antd/lib/modal/Modal";
import styled from "styled-components";

export const ProfileWrapper = styled.div`
  position: relative;
  top: 54px;
  display: flex;
  flex-direction: column;
  width: 935px;
  height: 627px;
  padding: 30px 20px 0 20px;
  margin: 0 auto;
`;

export const ProfileHeaderWrapper = styled.div`
  display: flex;
  height: 150px;
  margin-bottom: 44px;
`;

export const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 30px;
  width: 291px;

  img{
    border: 1px solid rgba(var(--b6a,219,219,219),1);
    border-radius: 50%;
  }
`;

export const ProfileHeaderFirstBox = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
  font-size: 28px;
  font-family: -apple-system;
  font-weight: lighter;

  button{
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 5px 9px;
    height: 17.6px;
    margin-left: 8px;
    font-weight: 600;
    font-size: 14px;
    background-color: #ffffff;
    border: 1px solid rgba(var(--b6a,219,219,219),1);
    border-radius: 3px;

    :first-of-type{
      margin-left: 24px;
    }

    &.follow{
      background-color: #0095f6;
      color: #ffffff;
      padding: 5px 24px;
    }

    &.unfollow{
      padding: 5px 18px;
      .check{
        padding-left: 3px;
        font-size: 11px;
        color: gray;
      }
    }

    :hover{
      border: 1px solid rgba(var(--b6a,219,219,219),1);
    }
    :focus{
      border: 1px solid rgba(var(--b6a,219,219,219),1);
    }
  }

  >span svg{
    width:24px;
    height: 24px;
    padding: 8px;
    margin-left: 7px;
    cursor: pointer;
  }
`;

export const ProfileHeaderSecondBox = styled.div`
  display: flex;
  align-items: center;
  height: 17.6px;
  margin-bottom: 20px;

  div{
    margin-right: 40px;
    font-size: 16px;

    span{
      font-weight: 600;
    }
  }
`;

export const ProfileHeaderThirdBox = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const ProfileContentWrapper = styled.div`
  border-top: 1px solid rgba(var(--b6a,219,219,219),1);
`;

export const ProfileMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 52px;
  div{
    display: flex;
    align-items: center;
    margin-right: 60px;
    margin-top: -1px;
    color: #8E8E8E;
    cursor: pointer;

    span{
      font-size: 12px;
      font-weight: 600;
      margin-left: 6px;
    }

    svg{
      width: 11.25px; 
      height: 11.25px; 
    }
  }

  .tags{
    margin-right: 0;
  }
`;

export const ProfileUploadBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;

  >span{
    color: #8E8E8E;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  button{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 5px;
    width:74px;
    height: 17.6px;
    padding: 5px 9px;
  }
`;

export const ProfilePostsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  >div{
    position: relative;
    width:293px;
    height: 293px;
    cursor: pointer;
    margin: 0 28px 28px 0;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    :nth-child(3n+0){
      margin-right: 0;
    }

    img{
      width: 100%;
      height: 100%;
    }

    >span{
      display: block;
      width: 70%;
      padding:10px;
    }

    .whenHover{
      position: absolute;
      display:flex;
      justify-content:center;
      align-items: center;
      width:100%;
      height: 100%;
      background: rgba(0,0,0,0.3);
      opacity: 0;

      :hover{
        opacity: 1;
      }
      div{
        display:flex;
        align-items: center;
        background: none;
        font-size: 21px;
        color: #FFFFFF;
        font-weight: 600;

        :first-child{
          margin-right: 30px;
        }

        svg{
          padding-right: 10px;
        }
      }
    }
  }
`;

export const UnfollowModalWapper = styled(Modal)`
  div.ant-modal-content{
    width:400px;
    border-radius: 10px;
    margin: auto;
    overflow: hidden;
    .ant-modal-body{
      padding:0;
      margin:0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  div{
    margin:32px 16px;
    img{
      width:90px;
      height: 90px;
      border-radius: 50%;
    }
  }
  span{
    font-weight: normal;
    padding-bottom: 32px;
  }
  button{
    background: none;
    cursor: pointer;
    width: 384px;
    height: 39px;
    padding: 4px 8px;
    font-weight: 600;
    border: none;
    border-top: 1px solid #dbdbdb;

    &.unfollow{
      color: red;
    }

    &:hover{
      background-color: #FAFAFA;
    }

    &:last-child{
      font-weight: normal;
      border-bottom: none;
    }
  }
`; 