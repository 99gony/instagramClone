import { createSlice } from "@reduxjs/toolkit"
import { followAction, loadProfile, loadUser, loginAction, logoutAction, signupAction, unfollowAction } from "../actions/user"

const initialState = {
  //로그인 상태
  isLoggedIn : false,
  //로그인 관련
  loggingIn : false,
  loginError : null,
  //유저정보 로딩
  loadingUser : false,
  loadUserFail : false,
  //유저프로필 로딩
  loadingProfile : false,
  loadedProfile: null,
  loadProfileFail : false,
  //로그아웃 관련
  loggingOut : false,
  logoutError : null,
  //회원가입 관련
  signingUp : false,
  signedUp : false,
  signupError: null,
  //팔로우 관련
  following : false,
  followed : false,
  followError: null,
  //언팔로우 관련
  unfollowing : false,
  unfollowed : false,
  unfollowError: null,
  //회원 정보 
  me: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState(state){
      state = initialState;
      return state;
    }
  },
  extraReducers: (builder)=> builder
    // 로그인
    .addCase(loginAction.pending, (state)=>{
      state.loggingIn = true;
      state.loginError = null;
      state.isLoggedIn = false;
    })
    .addCase(loginAction.fulfilled, (state,action)=>{
      state.loggingIn = false;
      state.loginError = null;
      state.isLoggedIn = true;
      state.me = action.payload;
      const followingsId = state.me.Followings.map((following)=>following.id);
      const followersId = state.me.Followers.map((follower)=>follower.id);
      state.me.Friends = followingsId.filter(friend => followersId.includes(friend));
    })
    .addCase(loginAction.rejected, (state,action)=>{
      state.loggingIn = false;
      state.loginError = action.payload;
      state.isLoggedIn = false;
    })
    // 로그아웃
    .addCase(logoutAction.pending, (state)=>{
      state.loggingOut = true;
      state.logoutError = null;
    })
    .addCase(logoutAction.fulfilled, (state)=>{
      state.loggingOut = false;
      state.logoutError = null;
      state.isLoggedIn = false;
      state.me = null;
    })
    .addCase(logoutAction.rejected, (state,action)=>{
      state.loggingOut = false;
      state.logoutError = action.payload;
    })
    // 유저정보 로딩
    .addCase(loadUser.pending, (state)=>{
      state.loadingUser = true;
      state.loadUserFail = false;
    })
    .addCase(loadUser.fulfilled, (state,action)=>{
      state.loadingUser = false;
      state.loadUserFail = false;
      state.isLoggedIn = true;
      state.me = action.payload;
      const followingsId = state.me.Followings.map((following)=>following.id);
      const followersId = state.me.Followers.map((follower)=>follower.id);
      state.me.Friends = followingsId.filter(friend => followersId.includes(friend));
    })
    .addCase(loadUser.rejected, (state)=>{
      state.loadingUser = false;
      state.loadUserFail = true;
      state.isLoggedIn = false;
      state.me = null;
    })
    // 유저프로필 로딩
    .addCase(loadProfile.pending, (state)=>{
      state.loadingProfile = true;
      state.loadProfileFail = false;
      state.loadedProfile = null;
    })
    .addCase(loadProfile.fulfilled, (state,action)=>{
      state.loadingProfile = false;
      state.loadProfileFail = false;
      state.loadedProfile = action.payload;
    })
    .addCase(loadProfile.rejected, (state)=>{
      state.loadingProfile = false;
      state.loadProfileFail = true;
      state.loadedProfile = null;
    })
    //회원가입
    .addCase(signupAction.pending, (state)=>{
      state.signingUp = true;
      state.signupError = null;
      state.signedUp = false;
    })
    .addCase(signupAction.fulfilled, (state)=>{
      state.signingUp = false;
      state.signupError = null;
      state.signedUp = true;
    })
    .addCase(signupAction.rejected, (state,action)=>{
      state.signingUp = false;
      state.signupError = action.payload;
      state.signedUp = false;
    })
    //팔로우
    .addCase(followAction.pending, (state)=>{
      state.following = true;
      state.followError = null;
    })
    .addCase(followAction.fulfilled, (state,action)=>{
      state.following = false;
      state.followError = null;
      state.followed = true;
      state.me.Followings.unshift(action.payload);
      state.loadedProfile.Followers.unshift(state.me);
    })
    .addCase(followAction.rejected, (state,action)=>{
      state.following = false;
      state.followError = action.error;
    })
    //언팔로우
    .addCase(unfollowAction.pending, (state)=>{
      state.unfollowing = true;
      state.unfollowError = null;
      state.unfollowed = false;
    })
    .addCase(unfollowAction.fulfilled, (state,action)=>{
      state.unfollowing = false;
      state.unfollowError = null;
      state.unfollowed = true;
      state.me.Followings = state.me.Followings.filter(f=>f.id !== action.payload.id);
      state.loadedProfile.Followers = state.loadedProfile.Followers.filter(f=>f.id !== state.me.id);
    })
    .addCase(unfollowAction.rejected, (state,action)=>{
      state.unfollowing = false;
      state.unfollowError = action.error;
      state.unfollowed = false;
    })
})