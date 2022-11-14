import styled from "styled-components";
import { BsCloudy } from "react-icons/bs";
import { BsCloudLightningRain } from "react-icons/bs";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Shirt from '../img/shirt.jpg';

export default function WeatherRecItemList({ match }) {

    const { itemMaincategory } = match.params;

    const [datas, setDatas] = useState([]);

    
    const mLat = sessionStorage.getItem("lat");
    const mLon = sessionStorage.getItem("lon");


    const [weatherArray, setWeatherArray] = useState([]);
    useEffect(() => {
        if ((mLat !== null || mLat !== undefined || mLat !== '') && (mLon !== null || mLon !== undefined || mLon !== '')) {
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${mLat}&lon=${mLon}&units=metric&lang=kr&appid=42c3249b2406895e257db260bf90bc97`)
                .then(response => {
                    console.log(response.data);
                    setWeatherArray(response.data.list);
                    console.log(weatherArray);
                })
                .catch(error => {
                    console.log(error);
                    console.log(mLat);
                    console.log(mLon);
                });
        }
    }, []);


    // useEffect(() => {
    //     // 임시로 get주소 넣어둠. 나중에 수정필요
    //     axios.get(`http://localhost:8080/api/item/testlist`)
    //         .then(response => setDatas(response.data))
    //         .catch(error => console.log(error));
    // }, []);

    return (
        <Container>
            <div className="weatherRecItemListWrap">
               
                <div className="itemWrap">
                    {
                        datas && datas.map(item => (
                            <div className="itemInfoWrap" key={item.itemNum}>
                                <Link to={`/item/detail/${item.itemNum}`}>
                                    <div className="itemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                    <div className="itemInfo">
                                        <p className="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                                        <p className="itemName">{item.itemName}</p>
                                        <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit}</span>원</p>
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
    
    .weatherRecItemListWrap {
        margin: 90px auto;
        height: auto;
        max-width: 1200px;
        // padding: 0 2rem;
    }

    .weatherRecItemListWrap .pageTitle h3 {
        margin: 0 0 10px;
        font-size: 23px;
    }

    .tomorrowInfo {
        background-color: #ddd;
        padding: 37px;
        border-radius: 10px;
    }

    .tomorrowInfo .tomDate {
        font-size: 18px;
        margin-bottom: 0px;
        font-weight: 600;
    }

    .tomorrowInfo .tomDate span {
        font-size: 16px;
        margin-left: 4px;
    }

    .tomWeatherWrap {
        display: flex;
        align-items : center;
    }

    .tomWeatherWrap .tomWeatherIcon {
        font-size: 60px;
    }

    .tomWeather {
        margin: 0 30px 0 8px;
        font-weight: 600;
        font-size: 22px;
    }

    .tomTempMin, .tomTempMax {
        font-size: 16px;
        margin-right: 10px;
    }

    .minTemp, .maxTemp {
        font-size: 19px;
        font-weight: 600
    }

    .tomWetherDetailWrap {
        display: flex;
        justify-content: space-between;
    }

    .tomWetherDetail {
        display: flex;
        align-items: flex-end;
        margin-top: 25px;
    }

    .tomWetherDetail .tomWeatherIconMini {
        font-size: 35px;
        line-height: 35px;
        margin-right: 7px;
        display: flex;
        align-items: flex-end;
    }

    .tomWetherDetail .timeNtemp .weatherTime {
        font-size: 14.5px;
    }

    .tomWetherDetail .timeNtemp .timeTemp {
        font-size: 17px;
    }
    
    .tomWetherDetail .timeNtemp .timeTemp > span {
        font-weight: 600
    }

    // .itemWrap {
    //     justify-content: space-between;
    //     margin-top: 50px;
    //     flex-wrap: wrap;
    // }

    // .itemWrap .itemInfoWrap {
    //     // margin-right: 23px;
    //     margin-bottom: 23px;
    //     background-color: #eee;
    //     min-width: 24%;
    //     flex-direction: row;
    // }

`;
