import { Link } from "react-router-dom";
import { BsCloudy } from "react-icons/bs";

import Shirt from './img/shirt.jpg';
import Dress from './img/dress.jpg';
import Sweater from './img/sweater.jpg';
import Jeans from './img/jeans.jpg';
import Store1 from "./img/store1.jpg";
import Store2 from "./img/store2.jpg";
import Store3 from "./img/store3.jpg";

function Main() {

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
                    <button className="plusBtn">+ 더보기</button>
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