import React from "react";
import Slider from "react-slick";
import Image from 'next/image';
import image1 from '../../public/images/image1.jpg'
import image2 from '../../public/images/image2.jpg'
import image3 from '../../public/images/image3.jpg'
import image4 from '../../public/images/image4.jpg'
import image5 from '../../public/images/image5.jpg'
import phoneImage from '../../public/images/phone.png'
import { PhoneWrapper, SliderWrapper } from "./style";

const PhoneSlider = () => {
  return (
    <PhoneWrapper>
      <Image quality={100} src={phoneImage}/>
      <SliderWrapper>
        <Slider
          accessibility = {false}
          fade
          infinite
          speed = {2000}
          autoplay
          autoplaySpeed={6000}
          touchMove={false}
          arrows={false}
        >
          <div>
            <Image src={image1} alt="exImage"/>
          </div>
          <div>
            <Image src={image2} alt="exImage"/>
          </div>
          <div>
            <Image src={image3} alt="exImage"/>
          </div>
          <div>
            <Image src={image4} alt="exImage"/>
          </div>
          <div>
            <Image src={image5} alt="exImage"/>
          </div>
        </Slider>
      </SliderWrapper>
    </PhoneWrapper>
  );
}

export default PhoneSlider;