import Shirt from '../img/shirt.jpg';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import './mypageitem.css'
import styled from 'styled-components';

function MyPageItem() {


    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/mypage`)
            .then(response => setDatas(response.data))
            .catch(error => console.log(error));
    }, []);
    return (
        <MyPageItemContainer style={{width:'100%', height:'100%'}}>
            <div className="mypageInnerPage2">

                <div className="titleNplusBtn">
                    <h3>내 상품 목록</h3>
                    <Link className="btn" to="/item/write">상품등록</Link>
                </div>
                <div className="itemWrap3">
                    {
                        datas && datas.map(item => (
                            <div className="itemInfoWrap" key={item.itemNum} style={{'backgroundColor':"rgb(235,235,235)"}}>
                              <Link to={`/mypage/mypageitemdetail/${item.itemNum}`} style={{'textDecoration':'none'}}>
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
        </MyPageItemContainer>
    );
}

const MyPageItemContainer = styled.div`
/* ----------------------------- */
/* 마이페이지 내의 페이지 */
.mypageInnerPage2 {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    overflow: auto;
}

/* 스크롤바 숨김 */
.mypageInnerPage2::-webkit-scrollbar {
    display: none; 
}


.mypageInnerPage .pageTitle {
    padding: 0;
    margin: 0 0 10px 0;
}

/* 다른사람이 보는 마이페이지 */
.regiUserItemWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.regiUserItemWrap .prev {
    font-size: 35px;
    color: #666;
    cursor: pointer;
}

.regiUserItemWrap .back {
    font-size: 35px;
    cursor: pointer;
}

.regiUserItemWrap .regiUserItem {
    width: 17%;
    height: 210px;
    border: 1px solid #ddd;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
}

.userReviewListAboutStoreWrap {
    margin-top: 58px;
}

.userReviewListAboutStoreWrap .userReviewListAboutStore {
    width: 100%;
    height: 100%;
    border-spacing: 0;
}

.userReviewListAboutStoreWrap .userReviewListAboutStore thead th {
    border-bottom: 1px solid #bbb;
    padding: 10px 5px;
}

.userReviewListAboutStoreWrap .userReviewListAboutStore tbody td {
    border-bottom: 1px solid #ddd;
    padding: 7px 3px;
    font-size: 15px;
}

.userReviewListAboutStoreWrap .userReviewListAboutStore tbody .ReviewItemImg, .userReviewListAboutStoreWrap .userReviewListAboutStore tbody .ReviewContent {
    border: none;
}
.userReviewListAboutStoreWrap .userReviewListAboutStore tbody .ReviewContent{
    padding: 0;
}

.ReviewItemImageOrigin {
    width: 10%;
}

.ReviewItemImageOrigin div {
    width: 100%;
    height: 100%;
    /* border: 1px solid #000; */
    background-size: cover;
    background-position: center;
}

.ReviewItemNameOrigin {
    width: 15%;
    text-align: center;
}

.Write {
    width: 20%;
    text-align: center;
}

.ReviewItemImg, .ReviewContent, .satisfing {
    width: 45%;
}

.ReviewItemImg div {
    width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
}

.ReviewContent {
    font-size: 13px !important;
}

.satisfing div {
    width: 150px;
    font-size: 12px;
}

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  }
  
  * {
    font-family: 'Pretendard-Regular' !important;
  }
  
  .wholeWrap {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .containerWrap {
    flex: 1;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .requiredInfo {
    text-align: end;
  }
  
  .requiredMark::before {
    content: "*";
    color: rgb(202, 43, 43);
  }
  
  .requiredMark>span {
    font-size: 13px;
    font-weight: 100;
    color: #777;
  }
  
  .btn {
    cursor: pointer;
    text-decoration: none;
  }
  
  .btnWrap .btn {
    font-weight: 100;
    margin: 20px 15px 0;
    font-size: 15px;
    padding: 10px 50px;
    border-radius: 3px;
    font-weight: 100;
  }
  
  .btnWrap a {
    display: inline-block;
  } 
  
  .grayBtn {
    border: 2px solid #999 !important;
    background-color: #999;
    color: #fff;
  }
  
  .grayLineBtn {
    border: 2px solid #ccc !important;
    background-color: transparent;
    color: #777;
  }
  
  .greenBtn {
    border: rgb(100, 165, 127);
    background-color: rgb(100, 165, 127);
    color: #fff;
  }
  
  .redBtn {
    border: rgb(196, 98, 98);
    background-color: rgb(196, 98, 98);
    color: #fff;
  }
  
  .greenLineBtn {
    border: 2px solid rgb(100, 165, 127) !important;
    background-color: transparent;
    color: rgb(88, 145, 112);
  }
  
  .beigeBtn {
    border: 2px solid rgb(252, 233, 173) !important;
    background-color: rgb(252, 233, 173);
    color: rgb(153, 129, 49);
  }
  
  .beigeLineBtn {
    border: 2px solid rgb(243, 222, 155) !important;
    background-color: transparent;
    color: rgb(153, 129, 49);
  }
  
  .plusBtn {
    border: none;
    background-color: transparent;
    font-size: 13px;
    color: #666;
  }
  
  
  
  
  
  /* ------------------------------------------------------------ */
  
  /* item */
  
  .titleNplusBtn {
    display: flex;
    justify-content: space-between;
  }
  
  .titleNplusBtn>h3 {
    margin: 10px 0;
    font-size: 23px;
  }
  
  .tomorrowWeather {
    display: flex;
    align-items: center;
    margin-bottom: -18px;
  }
  
  .tomorrowWeather .weatherIcon {
    font-size: 38px;
    margin-right: 7px;
  }
  
  .tomorrowWeather .temp {
    font-size: 23px;
    font-weight: 800;
  }
  
  .recWeather,
  .recBestStore,
  .recWeeklyWrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 90px 0;
  }
  
  .recWeekly {
    background-color: #eee;
  }
  
  .itemWrap, .storeWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .itemWrap3 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;    
  }
  
  .itemInfoWrap {
    width: 22%;
    height: 360px;
    background-color: rgb(250, 250, 250);
    border-radius: 10px;
    padding: 1%;
  }
  
  .itemInfoWrap > .itemImg {
    width: 100% !important;
    height: 65%;
    
    border-radius: 5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  .itemInfoWrap .itemInfo p {
    margin: 5px 0;
  }
  
  .itemInfoWrap .itemInfo .price {
    font-size: 20px;
    font-weight: 800;
    margin-right: 2px;
    color: rgb(88, 145, 112);
  }
  
  .itemInfoWrap .itemInfo .itemDeposit {
    font-size: 15px;
    color: #444;
  }
  
  .itemInfoWrap .itemInfo .itemDeposit .depositTitle {
    font-size: 14px;
    color: #666;
    margin-right: 5px;
  }
  
  .itemInfoWrap .itemInfo .itemDeposit .deposit {
    font-size: 15px;
    font-weight: bold;
    color: #555;
  }
  
  .itemInfoWrap .itemInfo .itemName {
    font-size: 17px;
    font-weight: 800;
  }
  
  .itemInfoWrap .itemInfo .itemPeriod {
    font-size: 14px;
    color: #666;
    margin-top: 12px;
  }
  
  .itemInfoWrap .itemInfo .period {
    font-size: 14px;
  }
  
  .storeInfoWrap {
   
    width: 200px;
    height: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .storeInfoWrap > .storeImg {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  .storeInfo {
    width:100%;
    text-align: center;
  }
  
  .storeInfo .storeName {
    font-size: 20px;
    font-weight: 800;
    margin: 7px 0;
  }
`

export default MyPageItem;