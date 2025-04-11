import React from "react";
import Slider from "react-slick";
import "./SimpleSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";

import sl1 from "../../assets/swiper1.png";
import sl2 from "../../assets/swiper2.png";
import sl3 from "../../assets/swiper3.png";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <img src={leftArrow} alt="Left Arrow" />,
    nextArrow: <img src={rightArrow} alt="Right Arrow" />,
  };
  return (
    <div className="swiperContainer">
      <Slider {...settings}>
        <div className="slider-card">
          <img src={sl1} alt="Card 1" />
        </div>
        <div className="slider-card">
          <img src={sl2} alt="Card 2" />
        </div>
        <div className="slider-card">
          <img src={sl3} alt="Card 3" />
        </div>
      </Slider>
    </div>
  );
}
