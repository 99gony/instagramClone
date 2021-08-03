import { createSlice } from "@reduxjs/toolkit"
import { searchHashtag } from "../actions/hashtag";
import { addComment, addCommentLike, addLike, addPostImage, addReply, deletePost, editPost, loadPost, loadPosts, loadPostToEdit, removeComment, removeCommentLike, removeLike, uploadPost } from "../actions/post"

const initialState = {
  //게시글 불러오기 관련
  loadedPosts : [],
  loadingPosts : false,
  loadPostsError : null,
  hasMorePosts: false,
  //게시글 하나 불러오기 관련
  loadedPost : null,
  loadingPost : false,
  loadPostError : null,
  //검색한 게시글 불러오기 관련
  loadedHashtag : null,
  //수정할 게시글 불러오기 관련
  loadedPostToEdit : [],
  loadingPostToEdit : false,
  loadPostToEditError : null,
  //게시글 업로드 관련
  uploadedPost : false,
  uploadingPost : false,
  uploadPostError : null,
  //게시글 수정 관련
  editedPost : false,
  editingPost : false,
  editPostError : null,
  //게시글 삭제 관련
  deletedPost : false,
  deletingPost : false,
  deletePostError : null,
  //게시글 이미지 추가 관련
  addedPostImage: [],
  addingPostImage : false,
  addPostImageError : null,
  //게시글 댓글 추가 관련
  addedComment: false,
  addingComment : false,
  addCommentError : null,
  //게시글 댓글 삭제 관련
  removedComment: false,
  removingComment : false,
  removeCommentError : null,
  //댓글 답글 추가 관련
  addedReply: false,
  addingReply : false,
  addReplyError : null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers:{
    resetStatePost(state){
      state = initialState;
      return state;
    },
    resetStateComment(state){
      state.addedComment = initialState.addedComment;
      state.addingComment = initialState.addingComment;
      state.addCommentError = initialState.addCommentError;

      state.addedReply = initialState.addedReply;
      state.addingReply = initialState.addingReply;
      state.addReplyError = initialState.addReplyError;
    },
    deletePostImage(state,action){
      state.addedPostImage = state.addedPostImage.filter(img=> img !== action.payload);
    },
  },
  extraReducers: builder=> builder
    //게시글 로딩
    .addCase(loadPosts.pending, (state)=>{
      state.loadingPosts = true;
      state.loadPostsError = null;
    })
    .addCase(loadPosts.fulfilled, (state,action)=>{
      state.loadedPosts = state.loadedPosts.concat(action.payload);
      state.loadingPosts = false;
      state.loadPostsError = null;
      state.hasMorePosts = action.payload.length === 3;
    })
    .addCase(loadPosts.rejected, (state,action)=>{
      state.loadingPosts = false;
      state.loadPostsError = action.error;
    })
    //검색한 게시글 로딩
    .addCase(searchHashtag.fulfilled, (state,action)=>{
      state.loadedHashtag = action.payload;
    })
    //게시글 하나 로딩
    .addCase(loadPost.pending, (state)=>{
      state.loadingPost = true;
      state.loadPostError = null;
    })
    .addCase(loadPost.fulfilled, (state,action)=>{
      state.loadedPost = action.payload;
      state.loadingPost = false;
      state.loadPostError = null;
    })
    .addCase(loadPost.rejected, (state,action)=>{
      state.loadingPost = false;
      state.loadPostError = action.error;
    })
    //수정할 게시글 로딩
    .addCase(loadPostToEdit.pending, (state)=>{
      state.loadingPostToEdit = true;
      state.loadPostToEditError = null;
    })
    .addCase(loadPostToEdit.fulfilled, (state,action)=>{
      state.loadedPostToEdit = action.payload;
      state.loadingPostToEdit = false;
      state.loadPostToEditError = null;
      state.addedPostImage = action.payload.Images.map(img=>img.url);
    })
    .addCase(loadPostToEdit.rejected, (state,action)=>{
      state.loadingPostToEdit = false;
      state.loadPostToEditError = action.error;
    })
    //게시글 업로드
    .addCase(uploadPost.pending, (state)=>{
      state.uploadedPost = false;
      state.uploadingPost = true;
      state.uploadPostError = null;
    })
    .addCase(uploadPost.fulfilled, (state)=>{
      state.uploadedPost = true;
      state.uploadingPost = false;
      state.uploadPostError = null;
    })
    .addCase(uploadPost.rejected, (state,action)=>{
      state.uploadedPost = false;
      state.uploadingPost = false;
      state.uploadPostError = action.error;
    })
    //게시글 수정
    .addCase(editPost.pending, (state)=>{
      state.editedPost = false;
      state.editingPost = true;
      state.editPostError = null;
    })
    .addCase(editPost.fulfilled, (state)=>{
      state.editedPost = true;
      state.editingPost = false;
      state.editPostError = null;
    })
    .addCase(editPost.rejected, (state,action)=>{
      state.editedPost = false;
      state.editingPost = false;
      state.editPostError = action.error;
    })
    //게시글 삭제
    .addCase(deletePost.pending, (state)=>{
      state.deletedPost = false;
      state.deletingPost = true;
      state.deletePostError = null;
    })
    .addCase(deletePost.fulfilled, (state)=>{
      state.deletedPost = true;
      state.deletingPost = false;
      state.deletePostError = null;
    })
    .addCase(deletePost.rejected, (state,action)=>{
      state.deletedPost = false;
      state.deletingPost = false;
      state.deletePostError = action.error;
    })
    //게시글 이미지 추가
    .addCase(addPostImage.pending, (state)=>{
      state.addingPostImage = true;
      state.addPostImageError = null;
    })
    .addCase(addPostImage.fulfilled, (state,action)=>{
      state.addedPostImage = state.addedPostImage.concat(action.payload);
      state.addingPostImage = false;
      state.addPostImageError = null;
    })
    .addCase(addPostImage.rejected, (state,action)=>{
      state.addingPostImage = false;
      state.addPostImageError = action.error;
    })
    //게시글 댓글 추가
    .addCase(addComment.pending, (state)=>{
      state.addedComment = false;
      state.addingComment = true;
      state.addCommentError = null;
    })
    .addCase(addComment.fulfilled, (state,action)=>{
      state.addedComment = true;
      state.addingComment = false;
      state.addCommentError = null;
      if(state.loadedPost){
        state.loadedPost.Comments.unshift(action.payload);
        if(state.loadedPosts.length !== 0){
          state.loadedPosts.find(p=>p.id === action.meta.arg.PostId).Comments.unshift(action.payload);
        }
      }else{
        state.loadedPosts.find(p=>p.id === action.meta.arg.PostId).Comments.unshift(action.payload);
      }
    })
    .addCase(addComment.rejected, (state,action)=>{
      state.addedComment = false;
      state.addingComment = false;
      state.addCommentError = action.error;
    })
    //게시글 댓글 삭제
    .addCase(removeComment.pending, (state)=>{
      state.removedComment = false;
      state.removingComment = true;
      state.removeCommentError = null;
    })
    .addCase(removeComment.fulfilled, (state,action)=>{
      state.removedComment = true;
      state.removingComment = false;
      state.removeCommentError = null;
      if(state.loadedPost.Comments.find(c=>c.id === action.meta.arg)){
        state.loadedPost.Comments = state.loadedPost.Comments.filter(c=>c.id !== action.meta.arg);
      }else{
        const targetComment = state.loadedPost.Comments.find(c=>c.Reply.find(r=>r.id === action.meta.arg));
        targetComment.Reply = targetComment.Reply.filter(r=>r.id !== action.meta.arg);
      }
    })
    .addCase(removeComment.rejected, (state,action)=>{
      state.removedComment = false;
      state.removingComment = false;
      state.removeCommentError = action.error;
    })
    //댓글 답글 추가
    .addCase(addReply.pending, (state)=>{
      state.addedReply = false;
      state.addingReply = true;
      state.addReplyError = null;
    })
    .addCase(addReply.fulfilled, (state,action)=>{
      state.addedReply = true;
      state.addingReply = false;
      state.addReplyError = null;
      const targetComment = state.loadedPost.Comments.find(c=>c.id === action.meta.arg.commentId);
      targetComment.Reply.push(action.payload);
    })
    .addCase(addReply.rejected, (state,action)=>{
      state.addedReply = false;
      state.addingReply = false;
      state.addReplyError = action.error;
    })
    //게시글 좋아요 추가
    .addCase(addLike.fulfilled, (state,action)=>{
      if(state.loadedPost){
        state.loadedPost.Liker.unshift({id: action.payload});
        if(state.loadedPosts.length !== 0){
        state.loadedPosts.find(p=>p.id === action.meta.arg).Liker.unshift({id: action.payload});
        }
      }else{
        state.loadedPosts.find(p=>p.id === action.meta.arg).Liker.unshift({id: action.payload})
      }
    })
    //게시글 좋아요 취소
    .addCase(removeLike.fulfilled, (state,action)=>{
      if(state.loadedPost){
        state.loadedPost.Liker = state.loadedPost.Liker.filter(liker=>liker.id !== action.payload);
        if(state.loadedPosts.length !== 0){
        const targetPost = state.loadedPosts.find(p=>p.id === action.meta.arg);
        targetPost.Liker = targetPost.Liker.filter(liker=>liker.id !== action.payload);
        }
      }else{
        const targetPost = state.loadedPosts.find(p=>p.id === action.meta.arg);
        targetPost.Liker = targetPost.Liker.filter(liker=>liker.id !== action.payload)
      }
    })
    //댓글 좋아요 추가
    .addCase(addCommentLike.fulfilled, (state,action)=>{
      if(state.loadedPost){
        const target = state.loadedPost.Comments.find(c=>c.id === action.meta.arg.commentId);
        if(!target){
          const targetReply = state.loadedPost.Comments.find(c=>c.id === action.payload.commentId).Reply.find(r=>r.id === action.meta.arg.commentId);
          targetReply.CommentLiker.unshift({id: action.payload.userId});
        }else{
          target.CommentLiker.unshift({id: action.payload.userId});
        }
      }else{
        const targetComment = state.loadedPosts.find(p=>p.id === action.meta.arg.postId).Comments.find(c=>c.id === action.meta.arg.commentId);
        if(!targetComment){
          const targetReply = state.loadedPosts.find(p=>p.id === action.meta.arg.postId).Comments.find(c=>c.id === action.payload.commentId).Reply.find(r=>r.id === action.meta.arg.commentId);
          targetReply.CommentLiker.unshift({id: action.payload.userId});
        }else{
          targetComment.CommentLiker.unshift({id: action.payload.userId});
        }
      }
    })
    //댓글 좋아요 취소
    .addCase(removeCommentLike.fulfilled, (state,action)=>{
      if(state.loadedPost){
        const target = state.loadedPost.Comments.find(c=>c.id === action.meta.arg.commentId);
        if(!target){
          const targetReply = state.loadedPost.Comments.find(c=>c.id === action.payload.commentId).Reply.find(r=>r.id === action.meta.arg.commentId);
          targetReply.CommentLiker = targetReply.CommentLiker.filter(liker=>liker.id !== action.payload.userId);
        }else{
          target.CommentLiker = target.CommentLiker.filter(c=>c.id !== action.payload.userId);
        }
      }else{
        const targetComment = state.loadedPosts.find(p=>p.id === action.meta.arg.postId).Comments.find(c=>c.id === action.meta.arg.commentId);
        if(!targetComment){
          const targetReply = state.loadedPosts.find(p=>p.id === action.meta.arg.postId).Comments.find(c=>c.id === action.payload.commentId).Reply.find(r=>r.id === action.meta.arg.commentId);
          targetReply.CommentLiker = targetReply.CommentLiker.filter(liker=>liker.id !== action.payload.userId);
        }else{
          targetComment.CommentLiker = targetComment.CommentLiker.filter(c=>c.id !== action.payload.userId);
        }
      }
    })
})