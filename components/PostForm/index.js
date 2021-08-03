import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PostContentForm, PostFormWrapper, PostImageInputWrapper, PostPreviewBoxWrapper } from './style';
import PreviewUploadImage from './PreviewUploadImage';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addPostImage, editPost, uploadPost } from '../../actions/post';
import router from 'next/router';

const PostForm = () => {
  const dispatch = useDispatch();
  const {addedPostImage, loadedPostToEdit, uploadingPost, editingPost} = useSelector(state=>state.post);
  const { handleSubmit, register, watch } = useForm();
  const {ref,...rest} = register('image');
  const imageInputRef = useRef();
  const contentInputValue = watch('content');

  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(()=>{
    if(contentInputValue === '' && addedPostImage.length === 0){
      setSubmitDisabled(true);
    }else{
      setSubmitDisabled(false);
    }
  },[addedPostImage, contentInputValue]);

  const onSubmitPost = useCallback((data) =>{
    if(loadedPostToEdit.length === 0){ 
      dispatch(uploadPost({content : data.content, imageUrl : addedPostImage}))
    }else{
      dispatch(editPost({content : data.content, imageUrl : addedPostImage, postId : loadedPostToEdit.id}))
    }
    router.replace('/');
    console.log(data);
  },[addedPostImage,loadedPostToEdit])

  const onClickImageInput = useCallback(()=>{
    imageInputRef.current.click();
  },[]);
  
  const onChangeImageInput = useCallback((e)=>{
    const ImageFormData = new FormData();
    [].forEach.call(e.target.files, (f)=>{
      ImageFormData.append('image', f);
    });
    dispatch(addPostImage(ImageFormData));
  },[imageInputRef.current]);

  return(
    <PostFormWrapper>
      <PostImageInputWrapper onClick={onClickImageInput}>
        <input {...rest} type="file" onChange={onChangeImageInput} multiple hidden ref={(e)=>{
          ref(e)
          imageInputRef.current = e
        }} />
        <PlusOutlined />
        <div>
          이미지 파일을 끌어다 놓으세요
        </div>
      </PostImageInputWrapper>
      <div className="contentBox">
        <h1>신규 게시글 추가</h1>
        <PostPreviewBoxWrapper>
          <h2>
            업로드 할 이미지 미리보기
          </h2>
          <PreviewUploadImage />
        </PostPreviewBoxWrapper>
        <PostContentForm>
          <h2>
            게시글 작성
          </h2>
          <form onSubmit={handleSubmit(onSubmitPost)}>
            <textarea
              {...register('content')}
              defaultValue={loadedPostToEdit.content}
              placeholder="게시글을 작성해주세요"
              maxLength={600}
            />
            <Button disabled={submitDisabled} type="primary" htmlType="submit">{uploadingPost || editingPost ? <LoadingOutlined /> :<>게시</>}</Button>
          </form>
        </PostContentForm>
      </div>
    </PostFormWrapper>
  )
};

export default PostForm;