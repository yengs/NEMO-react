// import { useState, useEffect } from 'react';
// import axios from 'axios';
import jeans from '../img/jeans.jpg';
// import mypageReview from "./mypageReview.css";

import styled from "styled-components";

function MypageReview() {

    // const [myReviewData, setmyReviewData] = useState(''); // 내가 작성한 후기
    // const [yourReviewData, setYourReviewData] = useState(''); // 내가 등록한 상품에 대한 다른 회원의 후기


    // // 내가 작성한 후기 데이터
    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/review/myReview')
    //         .then(response => {
    //             console.log(response);
    //             setmyReviewData(response.data)
    //         })
    //         .catch(error => console.log(error));
    // }, []);

    // // 내가 등록한 상품에 대한 다른 회원의 후기 데이터
    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/review/yourReview')
    //         .then(response => {
    //             console.log(response);
    //             setYourReviewData(response.data)
    //         })
    //         .catch(error => console.log(error));
    // }, []);


    return (
        <MypageReviewContainer style={{width:'100%'}}>
        <div className="mypageInnerPage">
            <h2 className='reviewMainTitle'>후기 조회</h2>
            <div className="myStoreReview">
                <div className='reviewTitle'>
                    <h3 className="reviewTitle">내 상점 후기</h3>
                    <span><a href={`/review/yourReview`} className='moreReviewDetailPage'>더보기 </a></span>
                </div>
            </div>
            <hr className='lineH' />
            <div className='tableWrap'>
                <table className="yourReviewListAboutStore">
                    <thead>
                        <th colSpan={2}>상품 정보</th>
                        <th>작성자</th>
                        <th colSpan={2}>내용</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3} className="rReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                            </td>
                            <td className='rReviewItemNameOrigin' rowSpan={3} >메종키츠네 셔츠</td>
                            <td className='rReviewWriter' rowSpan={3}>선희곤듀</td>
                            <td className='rReviewItemImg'>
                                <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                            </td>
                        </tr>
                        <tr>
                            <td className='rReviewContent' style={{ "padding-top": "0px" }}>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</td>
                        </tr>
                        <tr>
                            <td className='rsatisfing'>
                                <div>
                                    만족도 <span>65</span>%
                                    <div style={{ "width": "100%", "height": "13px", "backgroundColor": "rgb(150,150,150)", "borderRadius": "20px" }}></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='marging'></div>

            <div className="myStoreReview">
                <div className='reviewTitle'>
                    <h3 className="reviewTitle">내 작성 후기</h3>
                    <span><a href={`/review/myReview`} className='moreReviewDetailPage'>더보기 </a></span>
                </div>
            </div>
            <hr className='lineH' />
            <div className='tableWrap'>
                <table className="yourReviewListAboutStore">
                    <thead>
                        <th colSpan={2}>상품 정보</th>
                        <th>대여료</th>
                        <th colSpan={2}>내용</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3} className="rReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                            </td>
                            <td className='rReviewItemNameOrigin' rowSpan={3} >메종키츠네 셔츠</td>
                            <td className='rReviewWriter' rowSpan={3}>70,000</td>
                            <td className='rReviewItemImg'>
                                <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                            </td>
                        </tr>
                        <tr>
                            <td className='rReviewContent' style={{ "padding-top": "0px" }}>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</td>
                        </tr>
                        <tr>
                            <td className='rsatisfing'>
                                <div>
                                    만족도 <span>65</span>%
                                    <div style={{ "width": "100%", "height": "13px", "backgroundColor": "rgb(150,150,150)", "borderRadius": "20px" }}></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            </MypageReviewContainer>
    );
}

const MypageReviewContainer = styled.div`
    
/* ----------------------------- */
/* 마이페이지 내의 페이지 */
.mypageInnerPage  {
    width: 100%;
    padding: 0 0 0 50px;
}

.reviewMainTitle {
    margin: 0 0 20px 0;
}


.myStoreReview .reviewTitle {
    margin-left: 0;
    margin-bottom: -8px;
    margin-top: 0;
}

.moreReviewDetailPage { 
    float: right;
    margin-bottom: 6px;
    margin-top: -5px;
    text-decoration: none;
    font-size: 13px;
}

.yourReviewListAboutStore {
    border-spacing: 0;
}

.yourReviewListAboutStore {
    font-size: 15px;
}

.lineH {
    height: 3.1px !important;
    width: 100%;
    color: #747474;
}

.rReviewItemImg div {
    width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
}

.rReviewItemImageOrigin div {
    width: 100%;
    height: 100%;
    /* border: 1px solid #000; */
    background-size: cover;
    background-position: center;
}

.rReviewItemNameOrigin {
    width: 15%;
    text-align: center;
}

.rReviewWriter {
    text-align: center;
}

.yourReviewListAboutStore th {
    border-bottom: 1px solid #444444;
    font-size: 15px;
    height: 10px;
    width: 300px;
    padding-top: 0px;
}

/* .yourReviewListAboutStore td {
    배경색을 줄까 말까 고민하다가 결국 그냥 안넣기로 함. 나중에 넣을수도 ?
} */

.tableWrap {
    border-bottom: 1px solid #444444;
}

.marging {
    height: 50px;
}

table {
table-layout: fixed;
}

.reviewMainTitle {
    padding-bottom: 10px;
}

/* ------------------------ */
/* 다른사람이 보는 마이페이지 */

.rReviewItemImageOrigin {
    width: 10%;
}

.rReviewItemImageOrigin div {
    width: 100%;
    height: 120px;
    /* border: 1px solid #000; */
    background-size: cover;
    background-position: center;
}

.rReviewItemNameOrigin {
    width: 15%;
    text-align: center;
}

.rReviewWriter {
    width: 20%;
    text-align: center;
}

.rReviewItemImg, .rReviewContent, .rsatisfing {
    width: 45%;
}

.rReviewItemImg div {
    width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
}

.rReviewContent {
    font-size: 14px !important;
    padding-bottom: 0px !important;
}

.rsatisfing div {
    width: 150px;
    font-size: 12px;
}



`

export default MypageReview;