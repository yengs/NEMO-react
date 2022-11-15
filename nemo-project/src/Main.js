import { Link } from "react-router-dom";
import { BsCloudy } from "react-icons/bs";

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


function Main() {

    const tomorrowDate = moment().add(1, 'days').format('-DD');

    const goWeatherItemList = () => {
        window.location.href = "/item/weatherrecitemlist";
    }

    // useEffect(() => {
    //     if (sessionStorage.getItem("lat") && sessionStorage.getItem("lon")) {
    //         axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${sessionStorage.getItem("lat")}&lon=${sessionStorage.getItem("lon")}&units=metric&lang=kr&appid=42c3249b2406895e257db260bf90bc97`)
    //             .then(response => {
    
    //                 const tempSum = response.data.list
    //                     .filter(data => data.dt_txt.includes(tomorrowDate))
    //                     .reduce((accumulator, currentValue) => Number(accumulator) + currentValue.main.temp_max, 0);
    
    //                 const tempAvg = tempSum / 8;
    
    //                 if (tempAvg < 11) {
    //                     return sessionStorage.setItem("weather","겨울");
    //                 } else if (11 <= tempAvg && tempAvg < 17) {
    //                     return sessionStorage.setItem("weather","봄");
    //                 } else if (17 <= tempAvg && tempAvg < 23) {
    //                     return sessionStorage.setItem("weather","가을");
    //                 } else {
    //                     return sessionStorage.setItem("weather","여름");
    //                 }
    
                    
                    
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    
    //     }
    // });

    return (
        <div>
            {/* <div>
                <div><Link to="/item">상품리스트</Link></div>
                <div><Link to="/member/join">회원가입</Link></div>
            </div> */}
            <div className="recWeather">
                <div className="tomorrowWeather">
                    <div className="weatherIcon">
                        <BsCloudy />
                    </div>
                    <h4>내일은 <span className="temp">9</span>℃ <span className="weather">흐림</span></h4>
                </div>
                <div className="titleNplusBtn">
                    <h3>내일 이런 옷 어때요?</h3>
                    <button className="plusBtn" onClick={goWeatherItemList}>+ 더보기</button>
                </div>
                <div className="itemWrap">
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
                        <div className="itemImg" style={{ backgroundImage: `url(${Dress})` }}></div>
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
                </div>
            </div>
            <div className="recWeekly">
                <div className="recWeeklyWrap">
                    <div className="titleNplusBtn">
                        <h3>주간 베스트</h3>
                        <button className="plusBtn">+ 더보기</button>
                    </div>
                    <div className="itemWrap">
                        <div className="itemInfoWrap">
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="recBestStore">
                <div className="titleNplusBtn">
                    <h3>베스트 클린 스토어</h3>
                    {/* <button className="plusBtn">+ 더보기</button> */}
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
    );
}

export default Main;