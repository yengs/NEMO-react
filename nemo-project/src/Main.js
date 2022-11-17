import { Link } from "react-router-dom";
import { BsFillPlusCircleFill, BsPencilSquare, BsHouse } from "react-icons/bs";

import styled from 'styled-components';

import Shirt from './img/shirt.jpg';
import Dress from './img/dress.jpg';
import Sweater from './img/sweater.jpg';
import Jeans from './img/jeans.jpg';
import Store1 from "./img/store1.jpg";
import Store2 from "./img/store2.jpg";
import Store3 from "./img/store3.jpg";
import { useEffect } from "react";

import moment from 'moment';
import 'moment/locale/ko';
import axios from "axios";
import { useState } from "react";


function Main() {

    const goWeatherItemList = () => {
        window.location.href = "/item/weatherrecitemlist";
    }

    const goBestItemList = () => {
        window.location.href = "/item/bestItem";
    }

    const [weatherDatas, setWeatherDatas] = useState([]);
    const [randomDatas, setRandomDatas] = useState([]);

    const [bestItemDatas, setBestItemDatas] = useState([]);

    const [tomorrowTemp, setTomorrowTemp] = useState(0);


    useEffect(() => {
        if (sessionStorage.getItem("weather") !== null) {
            axios.get(`http://localhost:8080/api/item/weather/${sessionStorage.getItem("weather")}`)
                .then(response => {
                    setWeatherDatas(response.data);
                    if (sessionStorage.getItem("tempAvg")) {
                        setTomorrowTemp(Math.round(sessionStorage.getItem("tempAvg")));
                    }
                })
                .catch(error => console.log(error));
        }
        else {
            axios.get('http://localhost:8080/api/item/random')
                .then(response => {
                    setRandomDatas(response.data);
                })
                .catch(error => console.log(error));
        }

        axios.get('http://localhost:8080/api/item/best')
        .then(response => {setBestItemDatas(response.data)})
        .catch(error => console.log(error));
    }, []);

    const [isShow, setIsShow] = useState('false');

    const handlerHideNshow = () => {
        if(!isShow) {
            setIsShow(true); 
        } else {
            setIsShow(false);
        }
    }


    return (
        <div>
            <DirectMenu style={{position: "absolute", right: "70px", bottom: "60px"}}>
                <div className="directMenu">
                    <div className={"hideNshow" + ' ' + (isShow ? "show" : "hide")}>
                        <div className="directBtn">
                            {
                                !sessionStorage.getItem("memberId") ?
                                <Link to="/member/login">
                                    <div><BsHouse/></div>
                                    <span>내 상점</span>
                                </Link>
                                :
                                <Link to="/mypage/mybooking">
                                    <div><BsHouse/></div>
                                    <span>내 상점</span>
                                </Link>
                            }
                        </div>
                        <div className="directBtn">
                            {
                                !sessionStorage.getItem("memberId") ?
                                <Link to="/member/login">
                                    <div><BsPencilSquare/></div>
                                    <span>상품등록</span>
                                </Link>
                                :
                                <Link to="/item/write">
                                    <div><BsPencilSquare/></div>
                                    <span>상품등록</span>
                                </Link>
                            }
                        </div>
                    </div>
                    <div className="plusBtn" onClick={handlerHideNshow}>
                        <BsFillPlusCircleFill/>
                    </div>
                </div>
            </DirectMenu>
            <div className="content">
                <div className="recWeather">
                    {/* <div className="weatherIcon">
                            <BsCloudy />
                        </div> */}
                    {
                        sessionStorage.getItem("memberId") ?
                        <div className="tomorrowWeather" style={{ marginBottom: "-15px" }}>
                                <h4 style={{ marginBottom: '0px', backgroundColor: "rgb(88, 145, 112)", color: "#fff", padding: '4px 14px', borderRadius: '50px' }}>내일은 <span className="temp">
                                    {tomorrowTemp}
                                </span>℃</h4>
                                <div className="titleNplusBtn">
                                    <h3>이런 옷 어때요?</h3>
                                    <button className="plusBtn" onClick={goWeatherItemList}>+ 더보기</button>
                                </div>
                            </div>
                            :
                            <div className="tomorrowWeather" style={{ marginBottom: "-35px" }}>
                                <div className="titleNplusBtn">
                                    <h3 style={{ marginBottom: "35px" }}>로그인하고 추천아이템을 확인해보세요!</h3>
                                </div>
                            </div>

    }

                    <div className="itemWrap">
                        {
                            sessionStorage.getItem("memberId") ?
                            weatherDatas && weatherDatas.map(item => (
                                
                                <div className="itemInfoWrap" key={item.itemNum}>
                                        <Link to={`/item/detail/${item.itemNum}`}>
                                            <img className="itemImg" src={`../../files/${item.files}`}></img>
                                            <div className="itemInfo">
                                                <p className="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                                                <p className="itemName">{item.itemName}</p>
                                                <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit}</span>원</p>
                                                <p className="itemPeriod">대여기간<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
                                            </div>
                                        </Link>
                                    </div>
                                )).slice(0, 4)
                                :
                                randomDatas && randomDatas.map(item => (
                                    <div className="itemInfoWrap" key={item.itemNum}>
                                        <Link to={`/item/detail/${item.itemNum}`}>
                                            <img className="itemImg" src={`../../files/${item.files}`}></img>
                                            <div className="itemInfo">
                                                <p className="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                                                <p className="itemName">{item.itemName}</p>
                                                <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit}</span>원</p>
                                                <p className="itemPeriod">대여기간<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
                                            </div>
                                        </Link>
                                    </div>
                                )).slice(0, 4)
                            }
                        {/* {
                            weatherDatas.length === 0 && randomDatas.length === 0 && (
                                <tr>
                                <td colSpan="4">일치하는 데이터가 없습니다!.</td>
                                </tr>
                                )
                            } */}
                    </div>

                </div>
                <div className="recWeekly">
                    <div className="recWeeklyWrap">
                        <div className="titleNplusBtn" style={{ marginBottom: "-15px" }}>
                            <h3>주간 베스트</h3>
                            <button className="plusBtn" onClick={goBestItemList}>+ 더보기</button>
                        </div>
                        <div className="itemWrap">
                            {
                                bestItemDatas && bestItemDatas.map(item => (
                                    
                                    <div className="itemInfoWrap" key={item.itemNum}>
                                        <Link to={`/item/detail/${item.itemNum}`}>
                                            <img className="itemImg" src={`../../files/${item.files}`}></img>
                                            <div className="itemInfo">
                                                <p className="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                                                <p className="itemName">{item.itemName}</p>
                                                <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit}</span>원</p>
                                                <p className="itemPeriod">대여기간<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
                                            </div>
                                        </Link>
                                    </div>
                                )).slice(0, 4)
                            }
                            {/* <div className="itemInfoWrap">
                                <div className="itemImg" style={{ backgroundImage: `url(${Dress})` }}></div>
                                <div className="itemInfo">
                                <p className="itemPrice"><span className="price">19,000</span>원</p>
                                <p className="itemName">알렉산더왕 셔츠</p>
                                <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">300,000</span>원</p>
                                <p className="itemPeriod">대여기간<br /><span className="period">2022-10-31 ~ 2022-11-06</span></p>
                                </div>
                                </div>
                                <div className="itemInfoWrap">
                                <div className="itemImg" style={{ backgroundImage: `url(${Jeans})` }}></div>
                                <div className="itemInfo">
                                <p className="itemPrice"><span className="price">19,000</span>원</p>
                                <p className="itemName">알렉산더왕 셔츠</p>
                                <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">300,000</span>원</p>
                                <p className="itemPeriod">대여기간<br /><span className="period">2022-10-31 ~ 2022-11-06</span></p>
                                </div>
                            </div>
                            <div className="itemInfoWrap">
                            <div className="itemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                            <div className="itemInfo">
                            <p className="itemPrice"><span className="price">19,000</span>원</p>
                            <p className="itemName">알렉산더왕 셔츠</p>
                                    <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">300,000</span>원</p>
                                    <p className="itemPeriod">대여기간<br /><span className="period">2022-10-31 ~ 2022-11-06</span></p>
                                </div>
                                </div>
                                <div className="itemInfoWrap">
                                <div className="itemImg" style={{ backgroundImage: `url(${Sweater})` }}></div>
                                <div className="itemInfo">
                                <p className="itemPrice"><span className="price">19,000</span>원</p>
                                <p className="itemName">알렉산더왕 셔츠</p>
                                    <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">300,000</span>원</p>
                                    <p className="itemPeriod">대여기간<br /><span className="period">2022-10-31 ~ 2022-11-06</span></p>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div className="recBestStore">
                    <div className="titleNplusBtn">
                        <h3>베스트 클린 스토어</h3>
                    </div>
                    <div className="storeWrap">
                        <div className="storeInfoWrap">
                            <div className="storeImg" style={{ backgroundImage: `url(${Store1})` }}></div>
                            <div className="storeInfo">
                                <p className="storeName">매니쉬 스토어</p>
                            </div>
                        </div>
                        <div className="storeInfoWrap">
                            <div className="storeImg" style={{ backgroundImage: `url(${Store3})` }}></div>
                            <div className="storeInfo">
                                <p className="storeName">페미닌 스토어</p>
                            </div>
                        </div>
                        <div className="storeInfoWrap">
                            <div className="storeImg" style={{ backgroundImage: `url(${Store2})` }}></div>
                            <div className="storeInfo">
                                <p className="storeName">빈티지 스토어</p>
                            </div>
                        </div>
                        <div className="storeInfoWrap">
                            <div className="storeImg" style={{ backgroundImage: `url(${Store1})` }}></div>
                            <div className="storeInfo">
                                <p className="storeName">하이틴 스토어</p>
                            </div>
                        </div>
                        <div className="storeInfoWrap">
                            <div className="storeImg" style={{ backgroundImage: `url(${Store2})` }}></div>
                            <div className="storeInfo">
                                <p className="storeName">러블리 스토어</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DirectMenu = styled.div`
 .directMenu {
    position: relative;
 }

 .hideNshow {
    width: 90px;
    height: 270px;
    background-color: rgba(88, 145, 112, 0.1);
    border-radius: 50px;
    position: relative;
 }

 .plusBtn, .directBtn > a {
    width: 90px;
    height: 90px;
    // background-color: pink;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
 }

 .plusBtn {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    cursor: pointer;
 }

 .plusBtn > svg {
    width: 100%;
    height: 100%;
    color: rgb(88, 145, 112);
 }

 .directBtn > a {
    text-decoration: none;
    font-size: 14px;
 }

 .directBtn > a > div > svg {
    font-size: 37px;
    margin-bottom: 3px;
 }

 .show {
    visibility: visible;
 }

 .hide {
    visibility: hidden;
 }
 
`

export default Main;