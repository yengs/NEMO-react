import styled from "styled-components";
import Shirt from '../img/shirt.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./mybooking.css";

import '../../src/pagination/Paging.css';
import Pagination from "react-js-pagination"

function MyBooking({ history }) {

    const ITEM_COUNT_PER_PAGE = 2;

    const [bookingNum, setBookingNum] = useState('');
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const [count1, setCount1] = useState(0);
    const [page1, setPage1] = useState(1);
    const [items1, setItems1] = useState([]);

    const [count2, setCount2] = useState(0);
    const [page2, setPage2] = useState(1);
    const [items2, setItems2] = useState([]);

    const bookingItemwriter = sessionStorage.getItem('memberId');
    const bookingMember = sessionStorage.getItem('memberId');


    // const goReviewWrite = () => {
    //     alert(bookingItemnum);
    //     window.location.href = `/review/reviewWrite/${bookingItemnum}`;
    // }

    //후기작성 했을 시 알림창
    const handlerreview = (e) => alert("작성하신 후기가 있습니다.")



    //예약중 -> 대여중
    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookingState`)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
    }, []);



    //대여중 -> 기간만료
    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookingState2`)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
    }, []);



    //물품상태 수정
    const [itemstate, setItemstate] = useState('');

    const handleritemstate = (e) => setItemstate(e.target.value);
    // console.log(itemstate);

    const statechangebtn = (e) => {

        setBookingNum(e.target.value);
        console.log(bookingNum);
        console.log(itemstate);
        if (window.confirm("물품상태를 수정하시겠습니까?")) {

            axios.put(`http://localhost:8080/api/mypage/mybooking/${e.target.value}`, { 'bookingDepositstate': itemstate })
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        alert("성공");
                        window.location.reload();
                    } else {
                        alert("실패");
                        return;
                    }
                })
                .catch(error => console.log(error));

        } else {

            return;

        }

    };


    //예약취소
    const handlercancel = (e) => {

        setBookingNum(e.target.value);

        if (window.confirm("정말 예약을 취소하시겠습니까?")) {

            axios.delete(`http://localhost:8080/api/mypage/mybooking/${e.target.value}`)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        alert("예약이 취소되었습니다.");
                        window.location.reload();
                    } else {
                        alert("예약취소 실패");
                        return;
                    }
                })
                .catch(error => console.log(error));

        } else {

            return;

        }

    };


    //빌려줬어요
    useEffect(() => {
        axios.get(`http://localhost:8080/api/mypage/mybooking/${bookingItemwriter}`)
            .then(response => {
                console.log(response);
                setDatas(response.data);
                setCount1(response.data.length);
                setItems1(response.data.slice((page1 - 1) * ITEM_COUNT_PER_PAGE, page1 * ITEM_COUNT_PER_PAGE));
            })
            .catch(error => console.log(error));
    }, []);

    const handlerPageChange1 = (page1) => {
        setPage1(page1);
        setItems1(datas.slice((page1 - 1) * ITEM_COUNT_PER_PAGE, page1 * ITEM_COUNT_PER_PAGE));
    };


    //빌려왔어요
    useEffect(() => {
        axios.get(`http://localhost:8080/api/mypagebookingmember/${bookingMember}`)
            .then(response => {
                console.log(response);
                setDatas2(response.data);
                setCount2(response.data.length);
                setItems2(response.data.slice((page2 - 1) * ITEM_COUNT_PER_PAGE, page2 * ITEM_COUNT_PER_PAGE));
            })
            .catch(error => console.log(error));
    }, []);

    const handlerPageChange2 = (page2) => {
        setPage2(page2);
        setItems2(datas2.slice((page2 - 1) * ITEM_COUNT_PER_PAGE, page2 * ITEM_COUNT_PER_PAGE));
    };

    return (
        <MyBookingContainer style={{ width: 'calc(100% - 230px)', height: '100%' }}>
            <div className="mypageInnerPage">
                <div className="tableWrap">
                    <div className="userReviewListAboutStoreWrapBooking">
                        <h3 className="pageTitle">빌려줬어요</h3>
                        <table className="userReviewListAboutStore2">
                            <thead>
                                <tr>
                                    <th>대여기간</th>
                                    <th colSpan={2}>상품 정보</th>
                                    <th>대여료</th>
                                    <th>빌려간 이</th>
                                    <th>대여상태</th>
                                    <th>물품상태</th>
                                    <th>상태수정</th>
                                </tr>
                            </thead>
                            {
                                items1 && items1.map(booking => (
                                    <tbody>

                                        <tr key={booking.bookingNum}>

                                            <td className='ReviewWriter' rowSpan={3}>{booking.bookingDate}</td>
                                            <td rowSpan={2} className="ReviewItemImageOrigin">
                                                <img className="bookingitemImg" src={`../../files/${booking.bookingItemfiles}`}></img>
                                            </td>
                                            <td className='ReviewItemNameOrigin' >
                                                <Link to={`/item/detail/${booking.bookingItemnum}`}>{booking.bookingItemname}</Link>
                                            </td>
                                            <td className='ReviewWriter' rowSpan={3}>{booking.bookingItemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td className='ReviewWriter' rowSpan={3} onClick={()=>  history.push(`/userstoreinfo/${booking.memberNickname},${booking.bookingMember},${booking.memberImg}`)} style={{cursor:'pointer'}}>{booking.memberNickname}</td>
                                            <td className='ReviewWriter' rowSpan={3}> {booking.bookingBookingstate}
                                                {booking.bookingBookingstate != "예약중" ? null : <button className="greenBtn btnBok" value={booking.bookingNum} onClick={handlercancel}>예약취소</button>}
                                            </td>
                                            <td className='ReviewWriter' rowSpan={3}>
                                                {booking.bookingDepositstate === "반환완료" ?  <p>{booking.bookingDepositstate}</p> : booking.bookingDepositstate === "미반환(물품훼손)" || booking.bookingDepositstate === "미반환(미반납)" ? <p>{booking.bookingDepositstate.slice(4,-1)}</p> :
                                                    booking.bookingBookingstate === "기간만료" ?
                                                        <select onChange={handleritemstate}>
                                                            <option value="">--</option>
                                                            <option value="반환완료">수거완료</option>
                                                            <option value="미반환(물품훼손)">물품훼손</option>
                                                            <option value="미반환(미반납)">미반납</option>
                                                        </select>
                                                        : '--'
                                                }
                                            </td>
                                            <td className='ReviewWriter' rowSpan={3}>{booking.bookingBookingstate === "기간만료" && booking.bookingDepositstate === "보관중" ? <button className="greenBtn btnBok" value={booking.bookingNum} onClick={statechangebtn}>확인</button> : <button className="grayBtn btnBok">확인</button>}</td>
                                        </tr>


                                    </tbody>
                                ))
                            }
                            {
                                datas.length === 0 && (
                                    <tr>
                                        <td colSpan="8" style={{ height: '172px', textAlign: 'center', borderBottom: 'none' }}>빌려준 내역이 존재하지 않습니다.</td>
                                    </tr>
                                )
                            }

                        </table>
                        <div>
                            {/* <MyPageItemPaging page={page1} count={count1} setPage={changePage1} /> */}
                            <Pagination
                                activePage={page1}   // 현재 페이지
                                itemsCountPerPage={2}  // 한 페이지당 보여줄 게시글 개수
                                totalItemsCount={count1}   // 모든 게시글 수
                                pageRangeDisplayed={10}  // paginator안에서 보여줄 페이지의 범위
                                prevPageText={"<"}  // 이전을
                                nextPageText={">"}  // 다음
                                onChange={handlerPageChange1}    // 페이지가 바뀔 때 핸들러 함수 
                            />
                        </div>
                    </div>

                </div>
                <div className="userReviewListAboutStoreWrapBooking2">
                    <h3 className="pageTitle">빌려왔어요</h3>
                    <table className="userReviewListAboutStore2">
                        <thead>
                            <tr>

                                <th>대여기간</th>
                                <th colSpan={2}>상품 정보</th>
                                <th>대여료</th>
                                <th>빌려준 이</th>
                                <th>대여상태</th>
                                <th>보증금상태</th>
                                <th>예약취소</th>

                            </tr>
                        </thead>
                        {
                            items2 && items2.map(booking => (
                                <tbody>

                                    <tr key={booking.bookingNum}>
                                        <td className='ReviewWriter' >{booking.bookingDate}</td>
                                        <td className="ReviewItemImageOrigin">
                                            {/* <Link to={`/booking/detail/${booking.bookingIdx}`}>{booking.title}</Link> */}

                                            <img className="bookingitemImg" src={`../../files/${booking.bookingItemfiles}`} />
                                        </td>
                                        <td className='ReviewItemNameOrigin'>
                                            <Link to={`/item/detail/${booking.bookingItemnum}`}>{booking.bookingItemname}</Link>
                                        </td>

                                <td className='ReviewWriter' rowSpan={3}>{booking.bookingItemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td className='ReviewWriter' rowSpan={3}>{booking.memberNickname}</td>
                                <td className='ReviewWriter' rowSpan={3}> { booking.bookingBookingstate == "예약취소" ?  <div>{booking.bookingBookingstate}</div> : booking.bookingDepositstate != "반환완료" ? <div>{booking.bookingBookingstate}</div>:"반납완료"}
                                {booking.bookingDepositstate != "반환완료" ? null : booking.reviewCount > 0 ? <button className="grayBtn reviewBtn " onClick={handlerreview}>후기작성</button> : <button className="greenBtn reviewBtn"><Link to = {`/review/reviewWrite/${booking.bookingNum},${booking.bookingItemnum},${booking.bookingItemwriter},${booking.bookingItemfiles},${booking.bookingItemname},${booking.bookingItemprice}`}>후기작성</Link></button>}

                                        </td>

                                        {/* <td className='ReviewWriter' rowSpan={3}> <tr><td>반납완료</td></tr><td><button className="greenBtn btnBok" onClick={goReviewWrite}>후기작성</button></td></td> */}

                                        <td className='ReviewWriter' style={{ whiteSpace: "pre-line" }}>{booking.bookingDepositstateN}</td>
                                        <td className='ReviewWriter' >{booking.bookingBookingstate == "예약중" ? <button className="greenBtn btnBok" value={booking.bookingNum} onClick={handlercancel}>취소</button> : <button className="grayBtn btnBok">취소</button>}</td>
                                    </tr>

                                </tbody>

                            ))
                        }
                        {
                            datas2.length === 0 && (
                                <tr>
                                    <td colSpan='8' style={{ height: '172px', textAlign: 'center' }}>빌린 내역이 존재하지 않습니다.</td>
                                </tr>
                            )
                        }
                    </table>
                    <Pagination
                        activePage={page2}   // 현재 페이지
                        itemsCountPerPage={2}  // 한 페이지당 보여줄 게시글 개수
                        totalItemsCount={count2}   // 모든 게시글 수
                        pageRangeDisplayed={10}  // paginator안에서 보여줄 페이지의 범위
                        prevPageText={"<"}  // 이전을
                        nextPageText={">"}  // 다음
                        onChange={handlerPageChange2}    // 페이지가 바뀔 때 핸들러 함수 
                    />
                </div>
            </div>
        </MyBookingContainer>
    );
}

const MyBookingContainer = styled.div`

    .reviewBtn {
        back
        font-size: 15px;
        border-radius: 3px;
        width: 80px;
        padding: 5px 10px;
        color: #fff;
        text-decoration: none;
        background-color: rgb(88,145,112);
    }

    .tableWrap{
        height : 45%;
    }

    .bookingitemImg{
        width: 90px;
        height : 82px;
    }

    .mypageInnerPage {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    // .userReviewListAboutStore2 tr td {
    //     border-bottom: 1px solid #ccc
    // }

    /* 마이페이지 내의 페이지 */
// .mypageInnerPage {
//     width: calc(100% - 230px);
//     padding: 20px;
//     box-sizing: border-box;
//     background-color: rgb(245, 245, 245);
//     border-top-right-radius: 20px;
//     border-bottom-right-radius: 20px;
// }

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


/* 빌려줬어요 */
.userReviewListAboutStoreWrapBooking{
    margin-top: 2px;
}

.userReviewListAboutStoreWrapBooking .userReviewListAboutStore2 {
    width: 100%;
    height: 100%;
    border-spacing: 0;
    border-bottom: 2px solid #ccc;
}

.userReviewListAboutStoreWrapBooking .userReviewListAboutStore2 thead th {
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #bbb;
    padding: 10px 5px;
}



.userReviewListAboutStoreWrapBooking .userReviewListAboutStore2 tbody td {
    border-bottom: 1px solid #ddd;
    padding: 7px 3px;
    font-size: 15px;
}

.userReviewListAboutStoreWrapBooking .userReviewListAboutStore2 tbody:last-child td {
    border-bottom: none;
}

.userReviewListAboutStoreWrapBooking .userReviewListAboutStore2 tbody .ReviewItemImg, .userReviewListAboutStoreWrap .userReviewListAboutStore tbody .ReviewContent {
    border: none;
}
.userReviewListAboutStoreWrapBooking .userReviewListAboutStore2 tbody .ReviewContent{
    padding: 0;
}
/* ---------------------- */


/* 빌려왔어요 */
.userReviewListAboutStoreWrapBooking2{
    margin-top: 43px;
}

.userReviewListAboutStoreWrapBooking2 .userReviewListAboutStore2 {
    width: 100%;
    height: 100%;
    border-spacing: 0;
    border-bottom: 2px solid #ccc;
}

.userReviewListAboutStoreWrapBooking2 .userReviewListAboutStore2 thead th {
    border-bottom: 1px solid #bbb;
    border-top: 1px solid #bbb;
    padding: 10px 5px;
}

.userReviewListAboutStoreWrapBooking2 .userReviewListAboutStore2 tbody td {
    border-bottom: 1px solid #ddd;
    padding: 7px 3px;
    font-size: 15px;
}

.userReviewListAboutStoreWrapBooking2 .userReviewListAboutStore2 tbody:last-child td {
    border-bottom: none;
}

.userReviewListAboutStoreWrapBooking2 .userReviewListAboutStore2 tbody .ReviewItemImg, .userReviewListAboutStoreWrap .userReviewListAboutStore tbody .ReviewContent {
    border: none;
}
.userReviewListAboutStoreWrapBooking2 .userReviewListAboutStore2 tbody .ReviewContent{
    padding: 0;
}
 
/* ---------------------------- */



.ReviewItemImageOrigin {
    width: 4%;
    height: 52px;
}

.ReviewItemImageOrigin div {
    width: 100%;
    height: 75px;
    /* border: 1px solid #000; */
    background-size: cover;
    background-position: center;
}

.ReviewItemNameOrigin {
    width: 10%;
    text-align: center;
}

.ReviewItemNameOrigin a {
    text-decoration: none;
    color: #333;
    font-weight: 600;
}


.ReviewWriter {
    width: 8%;
    text-align: center;
}

.ReviewWriter td{
    width: 10%;
    text-align: center;

}
.ReviewWriter td{
    border-bottom: none !important;
}

.btnBok{
  font-size: 15px;
  border-radius: 3px;
  width: 80px;
  padding: 5px 10px;
}

.btnBok a {
    color: #fff;
    text-decoration: none;
}

.reviewBtn {
    margin-top: 5px;
    font-size: 15px;
    border-radius: 3px;
    width: 80px;
    padding: 5px 10px;
}

.reviewBtn a {
    color: #fff;
    text-decoration: none;
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

// .pagination li {
//     background-color: #fff;
// }

.pagination li.active {
    font-weight: 800
}

`

export default MyBooking;