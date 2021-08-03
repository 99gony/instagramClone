import React from "react";
import Slider from "react-slick";
import { PostImageContainerWrapper, PostImageWrapper } from "./style";
import { backendServer } from "../../actions/user";

const PostImage = ({postImage}) => {
  return (
    <PostImageContainerWrapper>
      <Slider 
        dots
        lazyLoad
        swipe={false}
        infinite={false}
      >
        {postImage.map((img)=>{
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