import React from "react";
import Slider from "react-slick";
import { PostImageWrapper, PostImageContainerWrapper } from "./style";
import { backendServer } from "../../actions/user";

const PostImage = ({images}) => {
  return (
    <PostImageContainerWrapper>
      <Slider 
        dots
        lazyLoad
        swipe={false}
        infinite={false}
      >
        {images.map((img)=>{
          return(
            <PostImageWrapper key={img.id}>
              <img src={backendServer+'/'+img.url} />
            </PostImageWrapper>
            )
        })}
      </Slider>
    </PostImageContainerWrapper>
  );
}

export default PostImage;