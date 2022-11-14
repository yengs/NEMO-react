import axios from "axios";
import { useEffect, useState } from "react";

import { BsCloudy } from "react-icons/bs";
import { BsCloudLightningRain } from "react-icons/bs";
import { json } from "react-router-dom";

import styled from "styled-components";

export default function Weather(props) {

    const [weatherDatas, setWeatherDatas] = useState({});
    const [regionDatas, setRegionDatas] = useState({});

    // useEffect(() => {
    //     axios.get( `http://localhost:8080/api/weather`)
    //     .then(response =>{ 
    //         setDatas(response.data);
    //         console.log("responseData::::::"+response.data);
    //         console.log("::::::::::::"+datas);
    //     })
    //     .catch(error => console.log(error));
    // });

    
    
    const [maxTemp, setMaxTemp] = useState([]);
    const [minTemp, setMinTemp] = useState([]);
    const [weather, setWeather] = useState("");
    
    
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [zipCode, setZipCode] = useState(13101);

    const [mAddressEng, setMaddressEng] = useState('');


    // const regionZipcode = (e) => {
    //     e.preventDefault();
    //     axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},KR&appid=42c3249b2406895e257db260bf90bc97`)
    //     .then(response =>{ 

    //         const responseDataStr = JSON.stringify(response.data);

            
    //         console.log("responseDataStr::::::"+responseDataStr);
            
    //         setZipCode(response.data.zip);
    //         setLat(response.data.lat);
    //         setLon(response.data.lon);

    //         console.log(zipCode);
    //         console.log(lat);
    //         console.log(lon);
          
    //     })
    //     .catch(error => console.log(error));
    // }
    
    // const [weatherArray, setWeatherArray] = useState([]);
    // const weatherCheck = (e) => {
    //     e.preventDefault();
    //     // const weatherUrl = 'api.openweathermap.org/data/2.5/forecast?lat='+`${lat}`+'&lon='+`${lon}`+'&appid=42c3249b2406895e257db260bf90bc97';
    //     axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=42c3249b2406895e257db260bf90bc97`)
    //     // axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${mAddressEng},kr&units=metric&lang=kr&appid=42c3249b2406895e257db260bf90bc97`)
    //     .then(response =>{ 
    //         console.log(response.data);

    //         // setWeatherDatas(response.data);

    //         setWeatherArray(response.data.list);
    //     })
    //     .catch(error => {console.log(error);
    //         console.log(lat);
    //         console.log(lon);
    //     });
    // };
    
    // const [weatherArray, setWeatherArray] = useState([]);
    // useEffect(() => {
    //     console.log(props.mLat);
    //     if (props.mLat !== null && props.mLon !== null) {
    //         axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${props.mLat}&lon=${props.mLon}&units=metric&lang=kr&appid=42c3249b2406895e257db260bf90bc97`)
    //             .then(response => {
    //                 console.log(response.data);
    //                 setWeatherArray(response.data.list);
    //                 console.log(weatherArray);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //                 console.log(props.mLat);
    //                 console.log(props.mLon);
    //             });
    //     }
    // }, []);



    return (
        <>
            <div>
                <div className="pageTitle">
                    <h3>내일 날씨는?</h3>
                </div>
                <div className="tomorrowInfo">
                    <div className="tomDate">03일<span>(목)</span></div>
                    {/* <button onClick={weatherCheck}>날씨체크</button> */}
                    {/* <button onClick={region}>지역체크</button> */}
                    {/* <button onClick={regionZipcode}>우편번호별지역체크</button> */}
                    {/* <p style={{border:"1px solid #000", height:"30px"}}>{
                        weatherArray && weatherArray.map(() => {
                            <div className="tomWetherDetail">
                                <div className="tomWeatherIconMini"></div>
                                <div className="timeNtemp">
                                    <div className="weatherTime"><span className="tempTime">{props.weatherArray.dt_txt}</span>시</div>
                                    <div className="timeTemp"><span className="timeTemp">{props.weatherArray.list.temp_max}</span>℃</div>
                                </div>
                            </div>
                        })
                    }</p> */}
                    {/* <div className="tomWeatherWrap">
                        <span className="tomWeatherIcon"><BsCloudy /></span>
                        <span className="tomWeather">흐림</span>
                        <span className="tomTempMin">최저기온 <span className="minTemp">4</span>℃</span>
                        <span className="tomTempMax">최고기온 <span className="maxTemp">15</span>℃</span>
                    </div>
                    <div className="tomWetherDetailWrap">
                        <div className="tomWetherDetail">
                            <div className="tomWeatherIconMini"><BsCloudy /></div>
                            <div className="timeNtemp">
                                <div className="weatherTime"><span className="tempTime">6</span>시</div>
                                <div className="timeTemp"><span className="timeTemp">6</span>℃</div>
                            </div>
                        </div>
                        <div className="tomWetherDetail">
                            <div className="tomWeatherIconMini"><BsCloudy /></div>
                            <div className="timeNtemp">
                                <div className="weatherTime"><span className="tempTime">9</span>시</div>
                                <div className="timeTemp"><span className="timeTemp">10</span>℃</div>
                            </div>
                        </div>
                        <div className="tomWetherDetail">
                            <div className="tomWeatherIconMini"><BsCloudy /></div>
                            <div className="timeNtemp">
                                <div className="weatherTime"><span className="tempTime">12</span>시</div>
                                <div className="timeTemp"><span className="timeTemp">12</span>℃</div>
                            </div>
                        </div>
                        <div className="tomWetherDetail">
                            <div className="tomWeatherIconMini"><BsCloudLightningRain /></div>
                            <div className="timeNtemp">
                                <div className="weatherTime"><span className="tempTime">15</span>시</div>
                                <div className="timeTemp"><span className="timeTemp">15</span>℃</div>
                            </div>
                        </div>
                        <div className="tomWetherDetail">
                            <div className="tomWeatherIconMini"><BsCloudLightningRain /></div>
                            <div className="timeNtemp">
                                <div className="weatherTime"><span className="tempTime">18</span>시</div>
                                <div className="timeTemp"><span className="timeTemp">13</span>℃</div>
                            </div>
                        </div>
                        <div className="tomWetherDetail">
                            <div className="tomWeatherIconMini"><BsCloudLightningRain /></div>
                            <div className="timeNtemp">
                                <div className="weatherTime"><span className="tempTime">21</span>시</div>
                                <div className="timeTemp"><span className="timeTemp">9</span>℃</div>
                            </div>
                        </div>
                        <div className="tomWetherDetail">
                            <div className="tomWeatherIconMini"><BsCloudy /></div>
                            <div className="timeNtemp">
                                <div className="weatherTime"><span className="tempTime">24</span>시</div>
                                <div className="timeTemp"><span>5</span>℃</div>
                            </div>
                        </div>
                        <div className="tomWetherDetail">
                            <div className="tomWeatherIconMini"><BsCloudy /></div>
                            <div className="timeNtemp">
                                <div className="weatherTime"><span className="tempTime">2</span>시</div>
                                <div className="timeTemp"><span>5</span>℃</div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

const Container = styled.div`

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

`;