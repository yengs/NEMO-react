import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

export default class ItemSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settings: {}
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.sliderData.length > 5) {
      state.settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear"
      }
    } else {
      state.settings = {
        dots: false,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear"
      }
    }

  };
  render() {


    return (
      <div style={{ margin: '10px 20px' }}>
        <Slider ref={c => (this.slider = c)} {...this.state.settings}>
          {
            this.props.sliderData && this.props.sliderData.map((item, index) => {
              return (
                <div key={index} style={{ width: '226px', height: '300px' }}>
                  <Link to={`/item/detail/${item.itemNum}`} style={{ width: '100%', height: '100%' }}>
                    <img style={{ width: '100%', height: "200px", borderRadius: '4px', border: '1px solid #e8e8e8' }} src={`../../files/${item.files}`} />
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