import React, { Component } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";


const Container1 = styled.div`
  overflow:hidden;
`;

const StyledSlider1 = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
    `;

const ImageContainer1 = styled.div`
    height: 180px;
    margin: 05px;
  `;

const Image1 = styled.img`
  max-width:100%;
`;

const imgUrl1 = require('../img/shirt.jpg');
const imgUrl2 = require('../img/dress.jpg');
const imgUrl3 = require('../img/jeans.jpg');

const items = [
    { id: 1, url: imgUrl1 },
    { id: 2, url: imgUrl2 },
    { id: 3, url: imgUrl3 },
    { id: 1, url: imgUrl1 },
    { id: 2, url: imgUrl2 },
    { id: 3, url: imgUrl3 }
];


export default class ItemSlider extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }


    render() {
        const settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2200,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            cssEase: "linear",
            swipeToSlide: true,
            afterChange: function (index) {
                console.log(
                    `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
                );
            },
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };
        return (
            <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                <GrFormPrevious className="prev" onClick={this.previous} />
                <Container1>
                    <StyledSlider1 ref={c => (this.slider = c)} {...settings}>
                        {items.map(item => {
                            return (
                                <div key={item.id}>
                                    <ImageContainer1>
                                        <Link to="/"><Image1 src={item.url} /></Link>
                                    </ImageContainer1>
                                </div>
                            );
                        })}
                    </StyledSlider1>
                </Container1>
                <GrFormNext className="back" onClick={this.next} />
            </div>
        );
    }
}