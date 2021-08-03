import { CheckOutlined, EllipsisOutlined, LoadingOutlined, SettingOutlined } from '@ant-design/icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendServer, followAction, unfollowAction } from '../../actions/user';
import { ProfileHeaderFirstBox, ProfileHeaderSecondBox, ProfileHeaderThirdBox, ProfileHeaderWrapper, ProfileImageWrapper, ProfileInfoWrapper, UnfollowModalWapper } from './style';

const ProfileHeader = ({profileUser}) => {
  const dispatch = useDispatch();
  const {me, unfollowing, following, unfollowed} = useSelector(state=>state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFollow = useCallback(()=>{
    dispatch(followAction(profileUser.id));
  },[]);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  },[isModalVisible])

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  },[isModalVisible]);

  useEffect(()=>{
    if(unfollowed){
      setIsModalVisible(false);
    }
  },[unfollowed])

  const onUnfollow = useCallback(()=>{
    dispatch(unfollowAction(profileUser.id));
  },[]);

  return(
    <ProfileHeaderWrapper>
      <ProfileImageWrapper>
        <img src={`${backendServer}/${profileUser.profileUrl}`} width={150} height={150} />
      </ProfileImageWrapper>
      <ProfileInfoWrapper>
        <ProfileHeaderFirstBox>
          <span>{profileUser.nickname}</span>
          {profileUser.id === me.id ?
            <>
            <button>프로필 편집</button>
            <SettingOutlined />
            </>
            :
            <>
              {me.Followings.find(f=>f.id === profileUser.id) ?
                <>
                <button>메시지 보내기</button>
                <button className="unfollow" onClick={showModal}><FontAwesomeIcon icon={faUser} /><CheckOutlined className="check" /></button>
                <UnfollowModalWapper style={{fontWeight: 'bold'}} visible={isModalVisible} footer={null} onCancel={handleCancel} closable={false}>
                  <div>
                    <img src={backendServer+'/'+profileUser.profileUrl} alt="프로필 사진"/>
                  </div>
                  <span>@{profileUser.nickname}님의 팔로우를 취소하시겠어요?</span>
                  <button onClick={onUnfollow} className="unfollow">{unfollowing? <LoadingOutlined /> : <>팔로우 취소</>}</button>
                  <button onClick={handleCancel}>취소</button>
                </UnfollowModalWapper>
                </>
                :
                <button className="follow" onClick={onFollow}>{following? <LoadingOutlined /> :<>팔로우</>}</button>
              }
              <EllipsisOutlined />
            </>
          }
        </ProfileHeaderFirstBox>
        <ProfileHeaderSecondBox>
          <div>게시물 <span>{profileUser.Posts.length}</span></div>
          <div>팔로워 <span>{profileUser.Followers.length}</span></div>
          <div>팔로우 <span>{profileUser.Followings.length}</span></div>
        </ProfileHeaderSecondBox>
        <ProfileHeaderThirdBox>{profileUser.name}</ProfileHeaderThirdBox>
      </ProfileInfoWrapper>
    </ProfileHeaderWrapper>
  )
};

export default ProfileHeader;