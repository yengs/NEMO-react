import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

export default class ItemSlider extends Component {

  render() {
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 900,
      autoplaySpeed: 1800,
      cssEase: "linear"
    };

    return (
      <div style={{ margin: '10px 20px' }}>
        <Slider {...settings} style={{margin: '10px'}}>
          {
            this.props.sliderData && this.props.sliderData.map((item, index) => {
              return (
                <div key={index} style={{width: '226px', height: '300px', margin:'10px'}}>
                  <Link to={`/item/detail/${item.itemNum}`} style={{height:'100%'}}> 
                    <img style={{ width: '100%', height: "100%", margin: '0', borderRadius: '4px' }}src={`../../files/${item.files}`} />
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