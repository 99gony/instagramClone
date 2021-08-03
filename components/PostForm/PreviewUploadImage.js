import React, { useCallback } from "react";
import Slider from "react-slick";
import { PostPreviewWrapper, PostPreviewWrapperWhenMoreThanEight, PreviewSliderWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import emptyImage from '../../public/images/empty_image.png';
import { backendServer } from "../../actions/user";
import { DeleteOutlined } from "@ant-design/icons";
import { postSlice } from "../../reducers/post";

const PreviewUploadImage = () => {
  const dispatch = useDispatch();
  const {addedPostImage} = useSelector(state=>state.post);
  const onDelete = useCallback((imgUrl)=>()=>{
    dispatch(postSlice.actions.deletePostImage(imgUrl))
  },[])

  return (
    <PreviewSliderWrapper>
      <Slider 
        dots
        infinite={false}
        arrows
        swipe={false}
        slidesPerRow={addedPostImage.length >= 8 ? 2 : 1}
        rows={addedPostImage.length >= 8 ? 2 : 1}
      >
        {addedPostImage.length === 0 ? 
          <PostPreviewWrapper>
            <Image width={520} height={290} src={emptyImage} />
          </PostPreviewWrapper>
          : addedPostImage.length >= 8 ?
            addedPostImage.map((imgUrl)=>{
              return(
                <PostPreviewWrapperWhenMoreThanEight key={imgUrl}>
                  <img src={`${backendServer}/${imgUrl}`} />
                  <DeleteOutlined onClick={onDelete(imgUrl)} />
                </PostPreviewWrapperWhenMoreThanEight>
              )
            })
          : addedPostImage.map((imgUrl)=>{
            return(
              <PostPreviewWrapper key={imgUrl}>
                <img src={`${backendServer}/${imgUrl}`} />
                <DeleteOutlined onClick={onDelete(imgUrl)} />
              </PostPreviewWrapper>
            )
          })
        }
      </Slider>
    </PreviewSliderWrapper>
  );
}

export default PreviewUploadImage;