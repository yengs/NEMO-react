import { useState, useEffect } from 'react';
import axios from 'axios';
import jeans from '../img/jeans.jpg';
import styled from "styled-components";


function MypageReview() {

    const [data, setDatas] = useState([]);                          // 리뷰 전체 데이터
    const [items, setItems] = useState('');                         // 상품 전체 데이터
    const [myReviewData, setmyReviewData] = useState('');           // 내가 작성한 후기
    const [yourReviewData, setYourReviewData] = useState('');       // 내가 등록한 상품에 대한 다른 회원의 후기
    const [imageSrc, setImageSrc] = useState('');                   // 상품 이미지
    const [reviewIcon, setReviewIcon] = useState('');               // 만족도 

    useEffect(() => {

        // 내가 등록한 상품에 대한 다른 회원의 후기 데이터
        axios.get('http://localhost:8080/api/review/myReview1')
            .then(response => {
                console.log(response);
                setYourReviewData(response.data);
                setReviewIcon(response.data);
            })
            .catch(error => console.log(error));

        // 내가 작성한 후기 데이터
        axios.get('http://localhost:8080/api/review/myReview2')
            .then(response => {
                console.log(response);
                setmyReviewData(response.data);
                setReviewIcon(response.data);
            })
            .catch(error => console.log(error));
            
    }, []);

    const goYourReview = () => {
        window.location.href = "/review/yourReview";
    }

    const goMyReview = () => {
        window.location.href = "/review/myReview";
    }

    return (
        <MypageReviewContainer style={{ width: 'calc(100% - 230px)', height: '100%' }}>
            <div className="mypageInnerPage">
                <div className="myStoreReview">
                    <div className="titleNplusBtn">
                        <h3 style={{ marginTop: '0' }}>내 상점 후기</h3>
                        <button className="plusBtn" onClick={goYourReview}> + 더보기</button>
                    </div>
                </div>
                <div className='tableWrap'>
                    <table className="yourReviewListAboutStore">
                        <thead>
                            <th colSpan={2}>상품 정보</th>
                            <th>작성자</th>
                            <th colSpan={2}>내용</th>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td rowSpan={3} className="rReviewItemImageOrigin">
                                    <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                                </td>
                                <td className='rReviewItemNameOrigin' rowSpan={3}>메종키츠네 셔츠</td>
                                <td className='rReviewWriter' rowSpan={3}>선희곤듀</td>
                                <td>
                                    <div className='rReviewItemImg' style={{ "backgroundImage": `url(${jeans})` }}></div>
                                    <p className='rReviewContent'>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</p>
                                    <div className='rsatisfing'>
                                        만족도 <span>65</span>%
                                        <div style={{ "width": "100%", "height": "13px", "backgroundColor": "rgb(150,150,150)", "borderRadius": "20px" }}></div>
                                    </div>
                                </td>
                            </tr> */}
                            {
                                data && data.map(review => (
                                    <tr key={review.reviewNum}>
                                        <td rowSpan={3} className="rReviewItemImageOrigin">
                                            <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                                        </td>
                                        <td className='rReviewItemNameOrigin' rowSpan={3}>
                                            {items && items.map(item => item.itemName)}
                                        </td>
                                        <td className='rReviewWriter' rowSpan={3}>{review.reviewWriter}</td>
                                        <td>
                                            <div className='rReviewItemImg'>
                                                {imageSrc && <img src={imageSrc} alt="review-img" />}</div>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className='marging'></div>

                <div className="myStoreReview">
                    <div className="titleNplusBtn">
                        <h3>내 작성 후기</h3>
                        <button className="plusBtn" onClick={goMyReview}> + 더보기</button>
                    </div>
                </div>
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
                                <td className='rReviewWriter' rowSpan={3}>선희곤듀</td>
                                <td>
                                    <div className='rReviewItemImg' style={{ "backgroundImage": `url(${jeans})` }}></div>
                                    <p className='rReviewContent'>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</p>
                                    <div className='rsatisfing'>
                                        만족도 <span>65</span>%
                                        <div style={{ "width": "100%", "height": "13px", "backgroundColor": "rgb(150,150,150)", "borderRadius": "20px" }}></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td rowSpan={3} className="rReviewItemImageOrigin">
                                    <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                                </td>
                                <td className='rReviewItemNameOrigin' rowSpan={3} >메종키츠네 셔츠</td>
                                <td className='rReviewWriter' rowSpan={3}>선희곤듀</td>
                                <td>
                                    <div className='rReviewItemImg' style={{ "backgroundImage": `url(${jeans})` }}></div>
                                    <p className='rReviewContent'>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</p>
                                    <div className='rsatisfing'>
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
.myPageWrap {
    width: 100%;
    height: calc(100vh - 250px);
    max-width: 1200px;
    margin: 55px auto;
    display: flex;
}

.myMenuWrap {
    width: 230px;
    background-color: rgba(88, 145, 112, 0.253);
    padding: 50px 35px;
    box-sizing: border-box;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.myMenuWrap .memberImg, .myMenuWrap .cleanG, .myMenuWrap .myMenuWrap {
    margin: auto;
}

.myMenuWrap .cleanG {
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
}

.myMenuWrap .memberImg {
    background-color: rgb(255, 255, 255);
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.myMenuWrap .menu {
    height: calc(100% - 160px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.myMenuWrap .menu ul {
    margin: 50px 0 0 0;
    padding: 0;
    width: 100%;
}

.myMenuWrap .menu li {
    list-style: none;
    padding: 10px 0;
    font-size: 15px;
    color: #333;
    cursor: pointer;
}

.warnBtn {
    border: none;
    background-color: transparent;
    text-align: center;
    font-size: 13px;
    color: #666;
    text-decoration: underline;
    cursor: pointer;
}


/* ----------------------------- */
/* 마이페이지 내의 페이지 */
.mypageInnerPage {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.mypageInnerPage .titleNplusBtn h3 {
    font-size: 1.17em;
}

.myStoreReview .reviewTitle {
    margin-left: 5px;
    margin-bottom: -8px;
    margin-top: 15px;
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
    border-top: 1px solid #bbb;
    border-bottom: 2px solid #ccc;
}

.yourReviewListAboutStore {
    font-size: 15px;
}

.yourReviewListAboutStore th {
    // border-top: 1px solid #bbb;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    height: 10px;
    width: 300px;
}

.yourReviewListAboutStore tr td {
    border-bottom: 1px solid #ddd;
}

.yourReviewListAboutStore tbody:last-child td  {
    border-bottom: none;
}

/* .yourReviewListAboutStore td {
    배경색을 줄까 말까 고민하다가 결국 그냥 안넣기로 함. 나중에 넣을수도 ?
} */

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

/* .tableWrap {
    border-bottom: 1px solid #444444;
} */

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

.rReviewItemImg {
    width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
}

.rReviewContent {
    font-size: 13px !important;
    padding-bottom: 0px !important;
    margin: 10px 0;
    width: 100%;;
}

.rsatisfing {
    width: 140px;
    font-size: 12px;
}
`

export default MypageReview;