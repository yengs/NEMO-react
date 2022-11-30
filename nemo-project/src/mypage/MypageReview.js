import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { Link } from 'react-router-dom';

function MypageReview() {

    const YOURREVIEW_COUNT_PER_PAGE = 2;
    const MYREVIEW_COUNT_PER_PAGE = 2;

    const [data, setData] = useState([]);                           // 다른 회원이 쓴 후기
    const [datas, setDatas] = useState([]);                         // 내가 작성한 후기

    const [items, setItems] = useState('');                         // 상품 전체 데이터
    const [reviewIcon, setReviewIcon] = useState('');               // 만족도 

    const reviewWriter = sessionStorage.getItem('memberId');
    const reviewId = sessionStorage.getItem('memberId');

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

    useEffect(() => {
        // 내가 작성한 후기 데이터
        axios.get(`http://localhost:8080/api/review/myReview/${reviewWriter}`)
            .then(response => {
                console.log(response);
                setDatas(response.data.slice(0, MYREVIEW_COUNT_PER_PAGE));
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
                <div className='tableWrap'>
                    <div className="myStoreReview">
                        <div className="titleNplusBtn">
                            <h3 style={{ marginTop: '0' }}>내 상점 후기</h3>
                            <button className="plusBtn" onClick={goYourReview}> + 더보기</button>
                        </div>
                    </div>
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
                                        </td>
                                        <td className='ReviewItemNameOrigin' rowSpan={3} >
                                            <Link to={`/item/detail/${review.reviewProductIdx}`}>
                                                {review.reviewItemname}
                                            </Link>
                                        </td>
                                        <td className='ReviewWriter' rowSpan={3}>{review.reviewWriter}</td>
                                        <td className='ReviewContent' rowSpan={3}>
                                            <div className="myReviewContents">
                                              {review.reviewContents.length < 30 ? review.reviewContents : review.reviewContents  + "..." }
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
                                <tr className='nullReview'>
                                    <td colSpan="5"> 작성된 글이 없습니다. </td>
                                </tr>
                            )
                        }
                    </table>
                </div>

                <div className='marging'></div>
                <div className='tableWrap2'>
                    <div className="myStoreReview">
                        <div className="titleNplusBtn">
                            <h3>내 작성 후기</h3>
                            <button className="plusBtn" onClick={goMyReview}> + 더보기</button>
                        </div>
                    </div>

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
                                <th>대여료</th>
                                <th>내용</th>
                                <th>만족도</th>
                            </tr>
                        </thead>
                        {
                            datas && datas.map(review => (
                                <tbody>
                                    <tr key={review.reviewNum}>
                                        <td rowSpan={2} className="rReviewItemImageOrigin">
                                            <img className="bookingitemImg" src={`../../files/${review.reviewItemfiles}`} />
                                        </td>
                                        <td className='ReviewItemNameOrigin' rowSpan={3} >
                                            <Link to={`/item/detail/${review.reviewProductIdx}`}>
                                                {review.reviewItemname}
                                            </Link>
                                        </td>
                                        <td className='ReviewWriter' rowSpan={3}>{review.reviewItemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td className='ReviewContent' rowSpan={3}>
                                            <div className="myReviewContents">
                                                {review.reviewContents.length < 30 ? review.reviewContents : review.reviewContents  + "..." }
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
                            datas.length === 0 && (
                                <tr className='nullReview'>
                                    <td colSpan="5"> 작성된 글이 없습니다. </td>
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

.tableWrap{
    height : 40%
}

.tableWrap2 {
    margin-top: 20px;
}

.myReviewContents {
    display: flex;
    max-height: 32px;
    max-width: 300px;
    overflow: hidden;
    // justify-content: flex-start;
    white-space: pre-wrap;
    font-size: 14px
}

.bookingitemImg{
    width: 100%;
    height: 82px;
    margin: 5px 5px 0px 5px;
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
    text-align: center;
    padding: 10px;
}

.yourReviewListAboutStore tr td {
    border-bottom: 1px solid #ddd;
    padding: 4px 2px;
    word-break: break-word;
}

.yourReviewListAboutStore tbody:last-child td  {
    border-bottom: none;
    white-space: pre-wrap;
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

.ReviewItemNameOrigin {
    width: 15%;
    text-align: center;
}

.ReviewItemNameOrigin a {
    text-decoration: none;
    color: #333;
    font-weight: 600;
}

.rReviewWriter {
    text-align: center;
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

// .rReviewItemImageOrigin {
//     width: 20%;
// }

.rReviewItemImageOrigin div {
    width: 100%;
    height: 120px;
    /* border: 1px solid #000; */
    background-size: cover;
    background-position: center;
}

.ReviewItemNameOrigin {
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
    width: 100%;

}

.rsatisfing {
    width: 140px;
    font-size: 12px;
}

`

export default MypageReview;