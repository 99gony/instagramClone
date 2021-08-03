import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'http://13.124.116.186';
axios.defaults.withCredentials = true;

export const backendServer = 'http://3.35.48.92';

export const loginAction = createAsyncThunk('user/login', async(data, {rejectWithValue})=>{
  try{
    const user = await axios.post(`${backendServer}/auth/login`, data)
    return user.data;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
});

export const logoutAction = createAsyncThunk('user/logout', async( data, {rejectWithValue})=>{
  try{
    const result = await axios.get(`${backendServer}/auth/logout`)
    return result.data;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
});

export const loadUser = createAsyncThunk('user/load', async()=>{
    const user = await axios.get(`${backendServer}/user`)
    return user.data;
});

export const signupAction = createAsyncThunk('user/signup', async(data, {rejectWithValue})=>{
  try{
    const result = await axios.post(`${backendServer}/auth/signup`, data)
    return result.data;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
});

export const followAction = createAsyncThunk('user/follow', async(data)=>{
    const user = await axios.get(`${backendServer}/user/${data}/follow`);
    return user.data;
});

export const unfollowAction = createAsyncThunk('user/unfollow', async(data)=>{
    const user = await axios.delete(`${backendServer}/user/${data}/follow`);
    return user.data;
});

export const loadProfile = createAsyncThunk('user/profile/load', async(data)=>{
  const user = await axios.get(`${backendServer}/user/profile/${data}`);
  return user.data;
});