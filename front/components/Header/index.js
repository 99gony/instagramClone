import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo.jpeg'
import { Popover } from 'antd';
import { CompassFilled, CompassOutlined, HeartFilled, HeartOutlined, HomeFilled, HomeOutlined, MessageFilled, MessageOutlined, SettingOutlined, UserOutlined, UserSwitchOutlined} from '@ant-design/icons';
import { ContainerWrapper, GlobalStyle, HeaderWrapper, IconWrapper, ImageWrapper, MenuWrapper, PopoverWrapper} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { indexSlice } from '../../reducers';
import PropTypes from 'prop-types';
import { logoutAction } from '../../actions/user';
import LogoutModal from '../Login/LogoutModal';
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { userSlice } from '../../reducers/user';
import Search from './Search';

const Header = ({currentLocate}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {currentMenu} = useSelector(state=>state.index);
  const {loggingOut, logoutError, loadUserFail, isLoggedIn} = useSelector(state=>state.user);
  const nickname = useSelector(state=>state.user.me?.nickname);

  const onClickMenu = useCallback((menu) => ()=>{
    dispatch(indexSlice.actions.changeMenu(menu));
  },[currentMenu]);

  const onClickAgain = useCallback(()=>{
    dispatch(indexSlice.actions.changeMenu(currentLocate));
  },[currentMenu]);

  const onClickLogout = useCallback(()=>{
    dispatch(logoutAction());
    router.replace('/')
  },[]);

  const onVisibleChange = useCallback(()=>{
    if(currentMenu==='user' || currentMenu ==='news'){
      return dispatch(indexSlice.actions.changeMenu(currentLocate));
    }
  },[currentMenu])

  useEffect(()=>{
    if(logoutError){
      alert(logoutError);
      router.replace('/login');
    }
  },[logoutError]);

  useEffect(()=>{
    if(loadUserFail){
      if(!isLoggedIn){  
        alert('로그아웃 되었습니다.')
        router.replace('/');
        dispatch(userSlice.actions.resetUserState());
      }
    }
  },[loadUserFail])

  return(
    <>
    <GlobalStyle/>
    <ContainerWrapper>
      <HeaderWrapper>
        <Link href="/">
          <ImageWrapper>
            <Image className="logo" src={logo} width={103} height={32}/>
          </ImageWrapper>
        </Link>
        <Search />
        <MenuWrapper>
          <Link href="/">
            <IconWrapper onClick={onClickMenu('main')}>
              {currentMenu==='main' ? <HomeFilled style={{fontSize:24}} /> : <HomeOutlined style={{fontSize:24}} />}
            </IconWrapper>
          </Link>
          <Link href="/message">
            <IconWrapper onClick={onClickMenu('message')}>
              {currentMenu==='message' ? <MessageFilled style={{fontSize:23}}/> : <MessageOutlined style={{fontSize:23}}/>}
            </IconWrapper>
          </Link>
          <Link href="/explore">
            <IconWrapper onClick={onClickMenu('explore')}>
              {currentMenu==='explore' ? <CompassFilled style={{fontSize:23}}/> : <CompassOutlined style={{fontSize:23}}/>}
            </IconWrapper>
          </Link>
          <Popover 
            onVisibleChange={onVisibleChange}
            arrowPointAtCenter 
            placement="bottomRight" 
            title="준비중" 
            content="준비중" 
            trigger="click">
            {currentMenu==='news' ? 
            <HeartFilled onClick={onClickAgain} style={{fontSize:23}}/> 
            : 
            <HeartOutlined onClick={onClickMenu('news')} style={{fontSize:23}}/>}
          </Popover>
          <Popover
            arrowPointAtCenter
            onVisibleChange={onVisibleChange}
            placement="bottomRight"
            title={
              <PopoverWrapper>
                <Link href={`/${nickname}`}>
                  <a>
                    <div>
                      <UserOutlined style={{paddingRight: 12, fontSize: 16}}/>
                      프로필
                    </div>
                  </a>
                </Link>
                <div>
                  <FontAwesomeIcon icon={faBookmark} style={{paddingRight: 12, width: 16, height: 16}}/>
                  저장됨(준비중)
                </div>
                <div>
                  <SettingOutlined style={{paddingRight: 12, fontSize: 16}}/>
                  설정(준비중)
                </div>
                <div>
                  <UserSwitchOutlined style={{paddingRight: 12, fontSize: 16}}/>
                  계정전환(준비중)
                </div>
              </PopoverWrapper>
            }
            content={              
              <PopoverWrapper>
                <div onClick={onClickLogout}>
                  {loggingOut? <LogoutModal/> : <>로그아웃(준비중)</>}
                </div>
              </PopoverWrapper>
            }
            trigger="click">
            {
              currentMenu==='user' ?
              <UserOutlined onClick={onClickAgain} style={{fontSize:23, border: '1px solid black', borderRadius: '50%'}}/>
              :
              <UserOutlined onClick={onClickMenu('user')} style={{fontSize:23}}/>
            }
          </Popover>
        </MenuWrapper>
      </HeaderWrapper>
    </ContainerWrapper>
    </>
  )
}

Header.propTypes = {
  currentLocate : PropTypes.string.isRequired,
}

export default Header;