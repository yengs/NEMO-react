import { Link } from "react-router-dom";

import styled from 'styled-components';

import { useEffect } from "react";

import moment from 'moment';
import 'moment/locale/ko';
import axios from "axios";
import { useState } from "react";


function Main({ history }) {

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
    
    const [storeUrl, setStoreUrl] =useState();

    const handleImgError = (e) => {
        e.target.src = '../../../noimage/noimage.gif';
    }

    useEffect(() => {
        if (sessionStorage.getItem("weather") !== null) {
            axios.get(`http://localhost:8080/api/item/weather/${sessionStorage.getItem("weather")}`)
                .then(response => {
                    setWeatherDatas(response.data);
                    if (sessionStorage.getItem("tempAvg")) {
                        setTomorrowTemp(Math.round(sessionStorage.getItem("tempAvg")*10)/10);
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
            .then(response => { setBestItemDatas(response.data) })
            .catch(error => console.log(error));

        axios.get('http://localhost:8080/api/item/beststore')
            .then(response => {
                setBestItemStore(response.data)
                
            })
            .catch(error => console.log(error));
        }, []);


    // //????????? ????????? ??????
    // const goUserStore = () => {
    //     if (sessionStorage.getItem("memberId") === bestItemStore.itemWriter) {
    //         // history.push(`/mypage/mypageitem/${sessionStorage.getItem("memberId")}`);
    //         // window.location.href = `/mypage/mypageitem/${sessionStorage.getItem("memberId")}`
    //         setStoreUrl(`/mypage/mypageitem/${bestItemStore.itemWriter}`);
    //     } else {
    //         // history.push(`/userstoreinfo/${bestItemStore.itemWriter},${bestItemStore.memberImg}`);
    //         setStoreUrl(`/userstoreinfo/${bestItemStore.itemWriter},${bestItemStore.memberImg}`);
    //     }
    // }


    return (
        <div>
            <div className="content">
                <div className="recWeather">
                    {/* <div className="weatherIcon">
                            <BsCloudy />
                        </div> */}
                    {
                        sessionStorage.getItem("jwtToken") ?
                            <div className="tomorrowWeather" style={{ marginBottom: "-15px" }}>
                                <h4 style={{ marginBottom: '0px', backgroundColor: "rgb(88, 145, 112)", color: "#fff", padding: '4px 14px', borderRadius: '50px' }}>????????? <span className="temp">
                                    {tomorrowTemp}
                                </span> ???</h4>
                                <div className="titleNplusBtn">
                                    <h3 style={{fontSize:'23px'}}>?????? ??? ??????????</h3>
                                    <button className="plusBtn" onClick={goWeatherItemList}>+ ?????????</button>
                                </div>
                            </div>
                            :
                            <div className="tomorrowWeather" style={{ marginBottom: "-35px" }}>
                                <div className="titleNplusBtn">
                                    <h3 style={{ marginBottom: "35px", fontSize:'23px' }}>??????????????? ?????????????????? ??????????????????!</h3>
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
                                            <img className="itemImg" onError={handleImgError} src={`../../files/${item.files}` }></img>
                                            <div className="itemInfo">
                                                <p className="itemPrice"><span className="price">{item.itemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>???</p>
                                                <p className="itemName" id="overflow">{item.itemName}</p>
                                                <p className="itemDeposit"><span className="depositTitle">?????????</span><span className="deposit">{item.itemDeposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>???</p>
                                                <p className="itemPeriod">????????????<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
                                            </div>
                                        </Link>
                                    </div>
                                )).slice(0, 4)
                                :
                                randomDatas && randomDatas.map(item => (
                                    <div className="itemInfoWrap" key={item.itemNum}>
                                        <Link to={`/item/detail/${item.itemNum}`}>
                                            <img className="itemImg" onError={handleImgError} src={`../../files/${item.files}`}></img>
                                            <div className="itemInfo">
                                                <p className="itemPrice"><span className="price">{item.itemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>???</p>
                                                <p className="itemName" id="overflow">{item.itemName}</p>
                                                <p className="itemDeposit"><span className="depositTitle">?????????</span><span className="deposit">{item.itemDeposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>???</p>
                                                <p className="itemPeriod">????????????<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
                                            </div>
                                        </Link>
                                    </div>
                                )).slice(0, 4)
                        }
                        {/* {
                            weatherDatas.length === 0 && randomDatas.length === 0 && (
                                <tr>
                                <td colSpan="4">???????????? ???????????? ????????????!.</td>
                                </tr>
                                )
                            } */}
                    </div>

                </div>
                <div className="recWeekly">
                    <div className="recWeeklyWrap">
                        <div className="titleNplusBtn" style={{ marginBottom: "-15px" }}>
                            <h3 style={{fontSize:'23px'}}>?????? ?????????</h3>
                            <button className="plusBtn" onClick={goBestItemList}>+ ?????????</button>
                        </div>
                        <div className="itemWrap">
                            {
                                bestItemDatas && bestItemDatas.map(item => (

                                    <div className="itemInfoWrap" key={item.itemNum}>
                                        <Link to={`/item/detail/${item.itemNum}`}>
                                            <img className="itemImg" src={`../../files/${item.files}`} onError={handleImgError}></img>
                                            <div className="itemInfo">
                                                <p className="itemPrice"><span className="price">{item.itemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>???</p>
                                                <p className="itemName" id="overflow">{item.itemName}</p>
                                                <p className="itemDeposit"><span className="depositTitle">?????????</span><span className="deposit">{item.itemDeposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>???</p>
                                                <p className="itemPeriod">????????????<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
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
                        <h3 style={{fontSize:'23px'}}>????????? ?????????</h3>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                        {console.log(storeUrl)}
                    {
                        bestItemStore && bestItemStore.map(item => (
                            <div className="storeWrap2" >
                                    <Link to={`/userstoreinfo/${item.memberNickname},${item.itemWriter},${item.memberImg}`}
                                    style={{color: '#333', textDecoration:"none"}}>
                                        <div className="storeInfoWrap">

                                            <img className="storeImg" src={`../../memberImg/${item.memberImg}`} key={item.itemNum} ></img>
                                            <div className="storeInfo">
                                                <p className="storeName">{item.memberNickname} ?????????</p>

                                            </div>
                                        </div>
                                    </Link>
                                </div>
                        ))
                    }
                    {console.log(storeUrl)}
                    </div>

                </div>
            </div>
        </div>
    );
}




 


export default Main;