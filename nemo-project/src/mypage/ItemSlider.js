import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

export default class ItemSlider extends Component {

  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };

    return (
      <div style={{ margin: '10px 20px' }}>
        <Slider {...settings}>
          {
            this.props.sliderData && this.props.sliderData.map((item, index) => {
              return (
                <div key={index} style={{width: '226px', height: '300px'}}>
                  <Link to={`/item/detail/${item.itemNum}`} style={{width:'100%',height:'100%'}}> 
                    <img style={{ width: '100%', height: "200px", borderRadius: '4px', border: '1px solid #e8e8e8' }}src={`../../files/${item.files}`} />
                  </Link>
                </div>
              );
            }) 
          }
      </Slider>
      </div>
    );
  }
}