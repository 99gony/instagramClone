import { LoadingOutlined } from '@ant-design/icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, addReply } from '../../actions/post';
import { postSlice } from '../../reducers/post';
import { CommentFormWrapper } from './style';

const CommentForm = ({postId, replyMode, replyCommentId}) => {
  const dispatch = useDispatch();
  const {addingComment, addedComment, addedReply} = useSelector(state=>state.user);
  const {addingReply} = useSelector(state=>state.post);

  const {handleSubmit, register, setValue} = useForm();
  
  const [buttonDisable, setButtonDisable] =useState(true);

  const onSubmit = useCallback((data)=>{
    if(replyMode){
      dispatch(addReply({content : data.content, commentId: replyCommentId}));
    }else{
      dispatch(addComment({content : data.content, PostId: postId}));
    }
    setValue('content','');
    setButtonDisable(true);
  },[replyMode,replyCommentId]);
  
  const onChangeInputText = useCallback((e) =>{
    if(e.target.value !== ''){
      setButtonDisable(false);
    }else{
      setButtonDisable(true);
    }
    setValue('content', e.target.value)
  },[]);

  useEffect(()=>{
    if(addedComment|| addedReply){
      dispatch(postSlice.actions.resetStateComment());
    }
  },[addedComment,addedReply])

  return(
    <CommentFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FontAwesomeIcon icon={faSmile}/>
        <input
          {...register('content')}
          onChange={onChangeInputText}
          autoComplete="off"
          placeholder={replyMode? "댓글에 답글 달기..." : "댓글 달기..."}
        />
        <button type="submit" disabled={buttonDisable}>{addingComment || addingReply? <LoadingOutlined /> :<>게시</>}</button>
      </form>
    </CommentFormWrapper>
  )
}

export default CommentForm;