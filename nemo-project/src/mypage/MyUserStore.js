import Shirt from '../img/shirt.jpg';
import ItemSlider from "./ItemSlider.js";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function MyStore({ itemWriter }) {


    const [data, setData] = useState([]);     

    const history = useHistory();
    const [piName, setPiName] = useState('');
    const params = useParams();

    const YOURREVIEW_COUNT_PER_PAGE = 3;
    const [reviewIcon, setReviewIcon] = useState('');   

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/userstoreinfo/${itemWriter}`)
    //     .then(response => { 
    //         console.log(response);
    //         setPiName(itemWriter);
    //     })
    //     .catch(error => { console.log(error); });
    // }, []);

    const reviewId = params.itemWriter;


    useEffect(() => {

        // 내가 등록한 상품에 대한 다른 회원의 후기 데이터
        axios.get(`http://localhost:8080/api/review/yourReview/${reviewId}`)
            .then(response => {
                console.log(response);
                setData(response.data.slice(0, YOURREVIEW_COUNT_PER_PAGE));
                setReviewIcon(response.data);
            })
            .catch(error => console.log(error));
    }, []);



   const [sliderData, setSliderData] = useState([]);
    useEffect(() => {
        console.log(reviewId);
        axios.get(`http://localhost:8080/api/mypage/yourpageitem/${reviewId}`)
        .then(response => {
            console.log(reviewId, response.data);
            setSliderData(response.data);
        })
        .catch(error => console.log(error));
    }, []);


    const goYourReview = () => {
        window.location.href = `/review/yourReview/${reviewId}`;
    }

    return (
        <MyUserStoreContainer style={{ width: 'calc(100% - 230px)', height: '100%' }}>
            <div className="mypageInnerPage myUserStoreInnerPage">
                <div className="regiUserItemList">
                    <h3 className="pageTitle">대여 가능 목록</h3>
                    <ItemSlider sliderData={sliderData}/>
                </div>
                <div className="myStoreReview">
                    <div className="titleNplusBtn">
                        {/* 상점 후기 두개까지만 출력되도록 수정 */}
                        <h3>상점 후기</h3>
                        <button className="plusBtn" 
                        onClick={goYourReview}>+ 더보기</button>
                    </div>
                </div>
                <div className='tableWrap'>
                    <table className="yourReviewListAboutStore">
                        <colgroup>
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="20%" />
                            <col width="10%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th colSpan={2}>상품 정보</th>
                                <th>작성자</th>
                                <th>내용</th>
                                <th>만족도</th>
                            </tr>
                        </thead>
                        {
                            data && data.map(review => (
                                <tbody>
                                    <tr key={review.reviewNum}>
                                        <td rowSpan={2} className="rReviewItemImageOrigin">
                                            <img className="bookingitemImg" src={`../../files/${review.reviewItemfiles}`} />
                                            {/* <img className="bookingitemImg" src={`../../files_review/${review.reviewFiles}`}/>         -----> 리뷰등록 사진*/}
                                        </td>
                                        <td className='ReviewItemNameOrigin' rowSpan={3} >{review.reviewItemname}</td>
                                        <td className='ReviewWriter' style={{width:'17%'}} rowSpan={3}>{review.reviewWriter}</td>
                                        <td className='ReviewContent' rowSpan={3}>
                                            <div className="myReviewContents">
                                                {review.reviewContents}
                                                </div>
                                        </td>
                                        <td className='ReviewWriter' rowSpan={3}>{review.reviewSatisfaction}
                                            <div>
                                                {
                                                    (function () {
                                                        if (review.reviewSatisfaction === 0) {
                                                            return <img className="reviewSatisImg" src="/clean/zero.png" alt="0percentlass" />
                                                        } else if (review.reviewSatisfaction > 0 && review.reviewSatisfaction <= 20) {
                                                            return <img className="reviewSatisImg" src="/clean/tenp.png" alt="10"></img>
                                                        } else if (review.reviewSatisfaction > 20 && review.reviewSatisfaction <= 40) {
                                                            return <img className="reviewSatisImg" src="/clean/thirtyp.png" alt="40" />
                                                        } else if (review.reviewSatisfaction > 40 && review.reviewSatisfaction <= 50) {
                                                            return <img className="reviewSatisImg" src="/clean/fourtyp.png" alt="40" />
                                                        } else if (review.reviewSatisfaction > 50 && review.reviewSatisfaction <= 60) {
                                                            return <img className="reviewSatisImg" src="/clean/sixtyp.png" alt="40" />
                                                        } else if (review.reviewSatisfaction > 60 && review.reviewSatisfaction <= 70) {
                                                            return <img className="reviewSatisImg" src="/clean/seventyp.png" alt="40" />
                                                        } else if (review.reviewSatisfaction > 70 && review.reviewSatisfaction <= 80) {
                                                            return <img className="reviewSatisImg" src="/clean/eightyp.png" alt="40" />
                                                        } else if (review.reviewSatisfaction > 80 && review.reviewSatisfaction <= 99) {
                                                            return <img className="reviewSatisImg" src="/clean/ninetyp.png" alt="40" />
                                                        } else {
                                                            return <img className="reviewSatisImg" src="/clean/onehundredp.png" alt="81~100" />
                                                        }
                                                    })()
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                        {
                            data.length === 0 && (
                                <tr>
                                    <td colSpan="7"> 작성된 글이 없습니다. </td>
                                </tr>
                            )
                        }
                    </table>
                </div>
            </div>
        </MyUserStoreContainer>
    );
}

const MyUserStoreContainer = styled.div`
.myReviewContents {
    display: flex;
    max-height: 31px;
    overflow: hidden;
    justify-content: left;
    white-space: pre-wrap;
}

.bookingitemImg{
    width: 110px;
    height : 82px;
}
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





.myUserStoreInnerPage {
    width: 100%;
    height: 100%;
}

.myStoreReview {
    margin-top: 35px;
}

.yourReviewListAboutStore {
    border-spacing: 0;
    border-top: 1px solid #bbb;
    border-bottom: 2px solid #ccc;
}

.yourReviewListAboutStore th {
    // border-top: 1px solid #bbb;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    height: 10px;
    width: 300px;
    text-align: center;
    padding: 10px;
}

.yourReviewListAboutStore tr td {
    border-bottom: 1px solid #ddd;
    padding: 5px 8px;
}

.yourReviewListAboutStore tbody:last-child td  {
    border-bottom: none;
}

// .ReviewContent {
//     text-align: left;
// }

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

.slick-slide {
    padding: 5px;
}

.slick-prev:before, .slick-next:before {
    color: #666 !important;
}
`

export default MyStore;