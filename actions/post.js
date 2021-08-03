import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendServer } from "./user";

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export const loadPosts = createAsyncThunk('posts/load',async(data)=>{
  const posts = await axios.get(`${backendServer}/posts?lastId=${data || 0}`);
  return posts.data;
});

export const loadPost = createAsyncThunk('post/load',async(data)=>{
  const post = await axios.get(`${backendServer}/post/${data}/load`);
  return post.data;
});

export const uploadPost = createAsyncThunk('post/upload',async(data)=>{
  const result = await axios.post(`${backendServer}/post/upload`, data);
  return result.data;
});

export const addPostImage = createAsyncThunk('post/add/image',async(data)=>{
  const imageUrl = await axios.post(`${backendServer}/post/add/image`, data);
  return imageUrl.data;
});

export const loadPostToEdit = createAsyncThunk('post/load/edit',async(data)=>{
  const post = await axios.get(`${backendServer}/post/${data}/edit`);
  return post.data;
});

export const editPost = createAsyncThunk('post/edit',async(data)=>{
  const result = await axios.patch(`${backendServer}/post/${data.postId}/edit`, data);
  return result.data;
});

export const deletePost = createAsyncThunk('post/delete',async(data)=>{
  const result = await axios.delete(`${backendServer}/post/${data}/delete`);
  return result.data;
});

export const addComment = createAsyncThunk('post/add/comment',async(data)=>{
  const comment = await axios.post(`${backendServer}/post/add/comment`, data);
  return comment.data;
});

export const removeComment = createAsyncThunk('post/remove/comment',async(data)=>{
  const result = await axios.delete(`${backendServer}/post/comment/${data}/remove`);
  return result.data;
})

export const addReply = createAsyncThunk('post/add/reply',async(data)=>{
  const comment = await axios.post(`${backendServer}/post/add/reply`, data);
  return comment.data;
});

export const addLike = createAsyncThunk('post/add/like',async(data)=>{
  const result = await axios.put(`${backendServer}/post/${data}/like`);
  return result.data;
});

export const removeLike = createAsyncThunk('post/remove/like',async(data)=>{
  const result = await axios.delete(`${backendServer}/post/${data}/like`);
  return result.data;
})

export const addCommentLike = createAsyncThunk('post/add/comment/like',async({commentId})=>{
  const result = await axios.put(`${backendServer}/post/comment/${commentId}/like`);
  return result.data;
});

export const removeCommentLike = createAsyncThunk('post/remove/comment/like',async({commentId})=>{
  const result = await axios.delete(`${backendServer}/post/comment/${commentId}/like`);
  return result.data;
});