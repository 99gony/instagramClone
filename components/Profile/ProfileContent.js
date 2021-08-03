import { faBookmark, faTags, faTh, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import MyPosts from './MyPosts';
import { ProfileContentWrapper, ProfileMenuWrapper } from './style';

const ProfileContent = ({profileUser}) => {
  const [currentMenu, setCurrentMenu] = useState("posts");

  const onClickMenu = useCallback((menu)=>()=>{
    setCurrentMenu(menu);
  },[])

  return(
    <ProfileContentWrapper>
      <ProfileMenuWrapper>
        
        <div style={currentMenu==="posts"? {borderTop: '1px solid black'} : null} onClick={onClickMenu("posts")}>
          <FontAwesomeIcon icon={faTh} />
          <span>게시물</span>
        </div>
        
        <div style={currentMenu==="videos"? {borderTop: '1px solid black'} : null} onClick={onClickMenu("videos")}>
          <FontAwesomeIcon icon={faVideo} />
          <span>동영상</span>
        </div>
        <div style={currentMenu==="saved"? {borderTop: '1px solid black'} : null} onClick={onClickMenu("saved")}>
          <FontAwesomeIcon icon={faBookmark} />
          <span>저장됨</span>
        </div>
        <div style={currentMenu==="tagged"? {borderTop: '1px solid black'} : null} onClick={onClickMenu("tagged")} className="tags">
          <FontAwesomeIcon icon={faTags} />
          <span>태그됨</span>
        </div>
      </ProfileMenuWrapper>
      {currentMenu==="posts" ? <MyPosts profileUser={profileUser} />  : null}
    </ProfileContentWrapper>
  )
};

export default ProfileContent;