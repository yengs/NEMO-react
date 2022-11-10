import styled from "styled-components";
import Shirt from '../img/shirt.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";
// import "./mybooking.css";

function MyBooking() {
   
    const [bookingNum , setBookingNum] = useState('');
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const bookingItemwriter = sessionStorage.getItem('memberId');
    const bookingMember = sessionStorage.getItem('memberId');
    

    const goReviewWrite = () => {
        window.location.href = "/reivew/reviewWrite";
    }

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
        })
            .catch(error => console.log(error));
    }, []);


    
    //빌려왔어요
    useEffect(() => {
        axios.get(`http://localhost:8080/api/mypagebookingmember/${bookingMember}`)
        .then(response => {
                console.log(response);
                setDatas2(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <MyBookingContainer style={{ width: 'calc(100% - 230px)', height: '100%' }}>
            <div className="mypageInnerPage">

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
                                datas && datas.map(booking => (
                        <tbody>
                           
                                    <tr key={booking.bookingNum}>

                                        <td className='ReviewWriter' rowSpan={3}>{booking.bookingDate}</td>
                                        <td rowSpan={2} className="ReviewItemImageOrigin">
                                            <img className="bookingitemImg" src={`../../files/${booking.bookingItemfiles}`}></img>
                                        </td>
                                        <td className='ReviewItemNameOrigin' rowSpan={3}>{booking.bookingItemname}</td>
                                        <td className='ReviewWriter' rowSpan={3}>{booking.bookingItemprice}</td>
                                        <td className='ReviewWriter' rowSpan={3}>{booking.bookingMember}</td>
                                        <td className='ReviewWriter' rowSpan={3}> {booking.bookingBookingstate}
                                        <td>{booking.bookingBookingstate != "예약중" ? null : <button className="greenBtn btnBok" value={booking.bookingNum} onClick={handlercancel}>예약취소</button>}</td>
                                        </td>
                                        <td className='ReviewWriter' rowSpan={3}>
                                            <select>
                                                <option value="">--</option>
                                                <option value="반팔">수거완료</option>
                                                <option value="긴팔">물품훼손</option>
                                                <option value="니트">미반납</option>
                                            </select>
                                        </td>
                                        <td className='ReviewWriter' rowSpan={3}><button className="greenBtn btnBok">확인</button></td>
                                    </tr>

                                
                        </tbody>
                        ))
                    }
                    {
                        datas.length === 0 && (
                            <tr>
                                <td colSpan="4">일치하는 데이터가 없습니다!.</td>
                            </tr>
                        )
                    }

                    </table>
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
                        datas2 && datas2.map(booking => (
                        <tbody>
                   
                            <tr key={booking.bookingNum}>
                                <td className='ReviewWriter' rowSpan={3}>{booking.bookingDate}</td>
                                <td rowSpan={2} className="ReviewItemImageOrigin">
                                    {/* <Link to={`/booking/detail/${booking.bookingIdx}`}>{booking.title}</Link> */}
                                
                                    <img className="bookingitemImg" src={`../../files/${booking.bookingItemfiles}`}/>
                                </td>
                                <td className='ReviewItemNameOrigin' rowSpan={3}>{booking.bookingItemname}</td>
                                <td className='ReviewWriter' rowSpan={3}>{booking.bookingItemprice}</td>
                                <td className='ReviewWriter' rowSpan={3}>{booking.bookingItemwriter}</td>
                                <td className='ReviewWriter' rowSpan={3}> {booking.bookingBookingstate}
                                <td>{booking.bookingBookingstate != "반납완료" ? null : <button className="greenBtn btnBok" onClick={goReviewWrite}>후기작성</button>}</td>
                                </td>
                                {/* <td className='ReviewWriter' rowSpan={3}> <tr><td>반납완료</td></tr><td><button className="greenBtn btnBok" onClick={goReviewWrite}>후기작성</button></td></td> */}

                                <td className='ReviewWriter' rowSpan={3}>{booking.bookingDepositstate}</td>
                                <td className='ReviewWriter' rowSpan={3}><button className="greenBtn btnBok">취소</button></td>
                            </tr>
                       
                </tbody>

))
}
{
    datas2.length === 0 && (
        <tr>
            <td colSpan="4">일치하는 데이터가 없습니다.</td>
        </tr>
    )
}
                    </table>
                </div>
            </div>
        </MyBookingContainer>
    );
}

const MyBookingContainer = styled.div`

    .bookingitemImg{
        width: 100%;
        height : 82px;
    }

    .mypageInnerPage {
        width: 100%;
        height: 100%;
    }

    .userReviewListAboutStore2 tr td {
        border-bottom: 1px solid #ccc
    }

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
    margin-top: 60px;
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
    width: 10%;
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


.ReviewWriter {
    width: 10%;
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

`

export default MyBooking;