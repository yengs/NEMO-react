import { useState, useEffect } from 'react';
import axios from 'axios';
import jeans from '../img/jeans.jpg';
import styled from "styled-components";


function MypageReview() {

    const [datas, setDatas] = useState([]);                         // 리뷰 전체 데이터
    const [items, setItems] = useState('');                         // 상품 전체 데이터
    const [myReviewData, setmyReviewData] = useState('');           // 내가 작성한 후기
    const [yourReviewData, setYourReviewData] = useState('');       // 내가 등록한 상품에 대한 다른 회원의 후기
    const [reviewIcon, setReviewIcon] = useState('');               // 만족도 

    const reviewWriter = sessionStorage.getItem('memberId');
    const reviewId = sessionStorage.getItem('memberId');

    useEffect(() => {

        // 내가 등록한 상품에 대한 다른 회원의 후기 데이터
        axios.get(`http://localhost:8080/api/mypage/review1/${reviewId}`)
            .then(response => {
                console.log(response);
                setDatas(response.data);
                setYourReviewData(response.data);
                setReviewIcon(response.data);
            })
            .catch(error => console.log(error));

        // 내가 작성한 후기 데이터
        axios.get(`http://localhost:8080/api/mypage/review2/${reviewWriter}`,
        { headers: { "Authorization" : `Bearer ${sessionStorage.getItem("jwtToken")}` }})
            .then(response => {
                console.log(response);
                setDatas(response.data);
                setmyReviewData(response.data);
                setReviewIcon(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const goYourReview = () => {
        window.location.href = `/review/yourReview/${reviewId}`;
    }

    const goMyReview = () => {
        window.location.href = `/review/myReview/${reviewWriter}`;
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
                            {
                                yourReviewData && yourReviewData.map(review => (
                                    <tr key={review.reviewNum}>
                                        <td rowSpan={3} className="rReviewItemImageOrigin">
                                            {/* 내가 등록한 상품사진 */}
                                            {/*  */}
                                        </td>
                                        <td className='rReviewItemNameOrigin' rowSpan={3}>
                                            {/* 내가 등록한 상품이름 */}
                                            { }
                                        </td>
                                        <td className='rReviewWriter' rowSpan={3}>
                                            {/* 내 상품에 대해 후기를 남긴 유저의 닉네임 */}
                                            {review.reviewWriter}</td>
                                        <td>
                                            {/* 다른 유저가 내 상품에 남긴 후기 이미지 */}
                                            <div className='rReviewItemImg'>
                                                {/* {imageSrc && <img src={imageSrc} alt="review-img" />} */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            {
                                datas.length === 0 && (
                                    <tr>
                                        <td colSpan="4"> 작성된 글이 없습니다. </td>
                                    </tr>
                                )
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
                        {
                            myReviewData && myReviewData.map(review => (
                                <tr key={review.reviewNum}>
                                    <td rowSpan={3} className="rReviewItemImageOrigin">
                                        {/* 내가 등록한 상품사진 */}
                                        {/*  */}
                                    </td>
                                    <td className='rReviewItemNameOrigin' rowSpan={3}>
                                        {/* 내가 등록한 상품이름 */}
                                        {items && items.map(item => item.itemName)}
                                    </td>
                                    <td className='rReviewWriter' rowSpan={3}>
                                        {/* 내 상품에 대해 후기를 남긴 유저의 닉네임 */}
                                        {review.reviewWriter}</td>
                                    <td>
                                        {/* 다른 유저가 내 상품에 남긴 후기 이미지 */}
                                        <div className='rReviewItemImg'>
                                            {/* {imageSrc && <img src={imageSrc} alt="review-img" />} */}
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4"> 작성된 글이 없습니다. </td>
                                </tr>
                            )
                        }
                        {
                            myReviewData && myReviewData.map(review => (
                                <tr key={review.reviewNum}>
                                    <td rowSpan={3} className="rReviewItemImageOrigin">
                                        {/* 내가 등록한 상품사진 */}
                                        {/*  */}
                                    </td>
                                    <td className='rReviewItemNameOrigin' rowSpan={3}>
                                        {/* 내가 등록한 상품이름 */}
                                        {items && items.map(item => item.itemName)}
                                    </td>
                                    <td className='rReviewWriter' rowSpan={3}>
                                        {/* 내 상품에 대해 후기를 남긴 유저의 닉네임 */}
                                        {review.reviewWriter}</td>
                                    <td>
                                        {/* 다른 유저가 내 상품에 남긴 후기 이미지 */}
                                        <div className='rReviewItemImg'>
                                            {/* {imageSrc && <img src={imageSrc} alt="review-img" />} */}
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4"> 작성된 글이 없습니다. </td>
                                </tr>
                            )
                        }
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