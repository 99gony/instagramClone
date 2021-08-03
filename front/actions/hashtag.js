import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendServer } from "./user";

axios.defaults.baseURL = 'http://13.124.116.186';
axios.defaults.withCredentials = true;

export const searchHashtag = createAsyncThunk('search/hashtag',async(data)=>{
  const posts = await axios.get(`${backendServer}/hashtag/${data}/hashtag`);
  return posts.data;
});
