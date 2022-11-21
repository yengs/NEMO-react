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


function Main({history}) {

    const goWeatherItemList = () => {
        window.location.href = "/item/weatherrecitemlist";
    }

    const goBestItemList = () => {
        window.location.href = "/item/bestItem";
    }

    const [weatherDatas, setWeatherDatas] = useState([]);
    const [randomDatas, setRandomDatas] = useState([]);

    const [bestItemDatas, setBestItemDatas] = useState([]);
    const [bestItemStore, setBestItemStore] = useState([]);
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

        axios.get('http://localhost:8080/api/item/beststore')
        .then(response => {
            setBestItemStore(response.data)
        })
        .catch(error => console.log(error));
    }, []);


    //베스트 스토어 관련
    const goUserStore = () => {
        if(sessionStorage.getItem("memberId") === bestItemStore.itemWriter) {
            history.push(`/mypage/mypageitem/${sessionStorage.getItem("memberId")}`);
            // window.location.href = `/mypage/mypageitem/${sessionStorage.getItem("memberId")}`
        } else {
            history.push(`/userstoreinfo/${bestItemStore.itemWriter},${bestItemStore.memberImg}`);
        }
    }


    return (
        <DirectMenu>
        <div>
            <div className="content">
                <div className="recWeather">
                    {/* <div className="weatherIcon">
                            <BsCloudy />
                        </div> */}
                    {
                        sessionStorage.getItem("jwtToken") ?
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

<div>
  
</div>
                    <div className="itemWrap">
                        {
                            sessionStorage.getItem("jwtToken") ?
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
                    
                        </div>
                    </div>
                </div>
                <div className="recBestStore">
                    <div className="titleNplusBtn">
                        <h3>베스트 클린 스토어</h3>
                    </div>
                  {
                        bestItemStore&&bestItemStore.map(item =>(
                            <div className="storeWrap2"  >
                                <Link to ={`/userstoreinfo/${item.itemWriter},${item.memberImg}`}>
                            <div className="storeInfoWrap">
                                
                                <img className="storeImg" src={`../../memberImg/${item.memberImg}` }   key={item.itemNum} ></img>
                                <div className="storeInfo">
                                <p className="storeName">{item.itemWriter} 스토어</p>
                        
                            </div>
    </div>
    </Link>
    </div>
        ))
    }
                 
                </div>
            </div>
        </div>
        </DirectMenu>
    );
}

const DirectMenu = styled.div`
.storeWrap2 {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
}
 .directMenu {
    position: relative;
 }

 .storeInfoWrap{
    margin-right:40px;
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