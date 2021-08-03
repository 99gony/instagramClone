import React from 'react';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';
import { ProfileWrapper } from './style';

const ProfileLayout = ({profileUser}) => {
  return(
    <ProfileWrapper>
      <ProfileHeader profileUser={profileUser} />
      <ProfileContent profileUser={profileUser}/>
    </ProfileWrapper>
  )
};

export default ProfileLayout;