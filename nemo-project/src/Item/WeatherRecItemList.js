import styled from "styled-components";
import { BsCloudy, BsFillCloudSunFill, BsFillCloudLightningRainFill, BsSnow, BsFillCloudRainFill, BsFillCloudLightningFill, BsSun } from "react-icons/bs";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Shirt from '../img/shirt.jpg';

import moment from 'moment';
import 'moment/locale/ko';

export default function WeatherRecItemList({ match }) {

    const { itemMaincategory } = match.params;

    const [datas, setDatas] = useState([]);


    const mLat = sessionStorage.getItem("lat");
    const mLon = sessionStorage.getItem("lon");

    const tomorrowD = moment().add(1, 'days').format('DD일');
    const tomorrowd = moment().add(1, 'days').format('dd요일');
    const tomorrowDate = moment().add(1, 'days').format('-DD');


    const [weatherArray, setWeatherArray] = useState([]);
    const [itemWeather, setItemWeather] = useState('');


    useEffect(() => {
        if (mLat && mLon) {
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${mLat}&lon=${mLon}&units=metric&lang=kr&appid=8444067fea4eff0a4da0bf54dd76b665`)
                .then(response => {
                    setWeatherArray(response.data.list);

                    if (sessionStorage.getItem("weather")) {
                        axios.get(`http://localhost:8080/api/item/weather/${sessionStorage.getItem("weather")}`)
                            .then(response => {
                                setDatas(response.data);
                            })
                            .catch(error => console.log(error));
                    }


                })
                .catch(error => {
                    console.log(error);
                });


        }

    }, []);


    // useEffect(() => {
    //     if(itemWeather != '') {
    //         axios.get(`http://localhost:8080/api/item/cate/sub/${itemWeather}`)
    //         .then(response => {
    //             setDatas(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(error => console.log(error));
    //     }
    // }, []);


    return (
        <Container>
            <div className="weatherRecItemListWrap">
                <h2>내일 모입지?</h2>
                <div className="tomWetherWrap">
                    <div className="tomDate">내일은 <span>{tomorrowD}</span>{tomorrowd}</div>
                    <div className="tomWetherDetailWrap">
                        {
                            weatherArray && weatherArray.map(function (data) {

                                if (data.dt_txt.includes(tomorrowDate)) {
                                    return (

                                        <div className="tomWetherDetail" key={data.dt_txt}>

                                            <div className="weatherTime">
                                                {
                                                    JSON.stringify(data.dt_txt).replace(/\"/gi, "").split(" ")[1].split(":", 1)
                                                }시
                                            </div>
                                            <div className="weatherIcon">
                                                {data.weather[0].description.includes("흐림") && <img className="weathericonwh" src="../../weather/cloudy.png" alt="흐림"></img>}
                                                {data.weather[0].description.includes("맑음") && <img className="weathericonwh" src="../../weather/sun.png" alt="맑음"></img>}
                                                {data.weather[0].description.includes("구름") && <img className="weathericonwh" src="../../weather/clouddd.png" alt="구름"></img>}
                                                {data.weather[0].description.includes("비") && <img className="weathericonwh" src="../../weather/rainy.png" alt="비"></img>}
                                                {data.weather[0].description.includes("눈") && <img className="weathericonwh" src="../../weather/snow.png" alt="눈"></img>}
                                                {data.weather[0].description.includes("번개") && <img className="weathericonwh" src="../../weather/storm.png" alt="번개"></img>}
                                                {data.weather[0].description.includes("번개" + "비") && <img className="weathericonwh" src="../../weather/thunderstorm.png" alt="천둥번개"></img>}


                                                {/* {data.weather[0].description} */}
                                            </div>
                                            <div className="feelsLikeTemp timeTemp">체감온도<span className="feelTemp temp">{Math.round(data.main.feels_like)}</span>℃</div>
                                            <div className="timeTemp">기온<span className="temp">{Math.round(data.main.temp_max)}</span>℃</div>
                                            {/* <div className="timeTemp">최저<span className="temp">{data.main.temp_min}</span>℃</div> */}
                                        </div>
                                    );
                                }

                            })
                        }
                    </div>
                </div>
                <div className="itemWrap">
                    {
                        datas && datas.map(item => (
                            <div className="itemInfoWrap" key={item.itemNum}>
                                <Link to={`/item/detail/${item.itemNum}`}>
                                    <img className="itemImg" src={`../../files/${item.files}`}></img>
                                    <div className="itemInfo">
                                        <p className="itemPrice"><span className="price">{item.itemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>원</p>
                                        <p className="itemName" id='overflow'>{item.itemName}</p>
                                        <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>원</p>
                                        <p className="itemPeriod">대여기간<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                    {
                        datas.length === 0 && (
                            <tr>
                                <td colSpan="4">일치하는 데이터가 없습니다!.</td>
                            </tr>
                        )
                    }
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    
.weathericonwh {
    width:30px;
}


.weatherRecItemListWrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
}

.tomWetherWrap {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 28px;
}

.tomWetherWrap {
    display: flex;
    flex-direction: column;
}

.tomWetherWrap .tomDate {
    font-size: 16px;
    margin-bottom: 30px;
    background-color: rgb(88, 145, 112);
    border-radius: 50px;
    padding: 7px 0;
    color: #fff;
    width: 165px;
    text-align: center;
}

.tomWetherWrap .tomDate span {
    font-weight: 600;
    font-size: 18px;
    margin-right: 3px;
    margin-left: 2px;
}

.tomWetherDetailWrap {
    display: flex;
    justify-content: space-between;
}

.tomWetherDetailWrap .tomWetherDetail {
    width: 11.2%;
    // border: 1px solid red;
}

.tomWetherDetailWrap .tomWetherDetail:first-child {
    margin-left: 15px;
}

.tomWetherDetailWrap .tomWetherDetail .weatherTime {
    font-size: 17px;
    font-weight: 600;
}

.tomWetherDetailWrap .tomWetherDetail .weatherIcon {
    font-size: 29px;
    display: flex;
    align-items: center;
    margin: 7px 0;
}

.tomWetherDetailWrap .tomWetherDetail .timeTemp {
    margin-top: 3px;    
    display: flex;
    align-items: center;
}

.tomWetherDetailWrap .tomWetherDetail .temp {
    margin-left: 3px;
}

.tomWetherDetailWrap .tomWetherDetail .feelsLikeTemp {
    margin-bottom: 6px;
}

.tomWetherDetailWrap .tomWetherDetail .feelsLikeTemp .temp {
    font-size: 18px;
    font-weight: 600;
}

.tomWetherDetailWrap .tomWetherDetail .timeTemp {
    font-size: 15px;
}

`;