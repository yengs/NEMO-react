import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, Route } from "react-router-dom";
import "./BookingUpload.css";
import Modal from './Modal';

import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import


function BookingUpload({ history,match }) {

  //---------결제모달---------------
  const [modalOpen, setModalOpen] = useState(false);
  const [payment, setPayment] = useState('1');

  const selectcard = (e) => setPayment('1');
  const selectkakao = (e) => setPayment('2');
  const selecttoss = (e) => setPayment('3');
  const selecttransfer = (e) => setPayment('4');
  const selectcell = (e) => setPayment('5');
  console.log(payment)

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const goItemDetail = () => {
    history.goBack();
  }

  //----------결제모달 end--------------
  //--------------대여하기 ------------------

  const {itemNum} = match.params;
  const {itemName} = match.params;
  const {itemDeposit} = match.params;
  const {itemPrice} = match.params;
  const {itemWriter} = match.params;
  const {files} = match.params;
  const {itemRentalstart} = match.params;
  const {itemRentalend} = match.params;

  const bookingItemnum = itemNum;
  const bookingItemname = itemName;
  const Deposit = itemDeposit;
  const bookingItemprice = itemPrice;
  const bookingItemwriter = itemWriter;
  const bookingItemfiles =files;
  const Rentalstart = itemRentalstart;
  const Rentalend = itemRentalend;


  const sum = (parseInt(bookingItemprice)+parseInt(Deposit));
  const bookingMember = sessionStorage.getItem('memberId');
  const [value, setbookingDate] = useState(new Date());
  
  const handlerClickSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/booking/bookingWrite`,
        {
            "bookingMember": bookingMember,
            "bookingDate" :value,
            "bookingItemnum": bookingItemnum,
            "bookingItemname":bookingItemname,
            "bookingItemprice" : bookingItemprice,
            "bookingItemwriter" : bookingItemwriter,
            "bookingItemfiles" : bookingItemfiles
        })
        .then(response => {
          if (response.status === 200) {
              alert("정상적으로 등록되었습니다.");
          } else {
              alert("등록에 실패했습니다.");
              return;
          }
      })
      .catch(error => console.log(error));
  };

  //-----------대여하기 end--------------------


  return (
    <>
      <div className="BookingContainer">
        <h3>대여하기</h3>

        <div className="top">
          <div className="left">
            <div className="tablePlusForm2">
              <tr><td>
                <div className="imageDiv2">
                <img className="memberImg2" src={`../../files/${bookingItemfiles}`}/>
                  
                </div>
              </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;{bookingItemname}</td>
              </tr>
            </div>
          </div>
          <div className="right">
            <div className="tableform2">
              <div className="a">
                <tr>
                  <th>대여료</th>
                  <td></td>
                  <td>{bookingItemprice}원</td>
                </tr>
                <tr>
                  <th >보증금</th>
                  <td><div className="plus">+</div></td>
                  <td>{Deposit}원</td>
                </tr>
              </div>
              <tr>
                <th>결제금액</th>
                <td></td>
                <td>{sum}원</td>
              </tr>
            </div>
          </div>

        </div>
        <h3>결제수단</h3>










        {/* --------------결제모달-------------- */}
        <div className="middle">
          <React.Fragment>
            <div className="custom-search" >
              <input type="text" className="custom-search-input" placeholder="결제수단을 등록해주세요" />
              <button onClick={openModal} className="custom-search-botton" type="submit">등록</button>
            </div>


            {/* header 부분에 텍스트를 입력한다. */}
            <Modal open={modalOpen} close={closeModal} header="결제수단">
              {/* Modal.js <main> {props.children} </main>에 내용이 입력된다.  */}
              <div className='payselect' name="payment" onClick={selectcard}>신용/체크카드</div>
              <div className='payselect' name="payment" onClick={selectkakao}>카카오페이</div>
              <div className='payselect' name="payment" onClick={selecttoss}>토스페이</div>
              <div className='payselect' name="payment" onClick={selecttransfer}>간편계좌결제</div>
              <div className='payselect' name="payment" onClick={selectcell}>휴대폰 결제</div>

              <div className='paytext'>
                {(function () {
                  if (payment == "1") {
                    return <div><select className='payment2'>
                      <option disabled selected>카드선택</option>
                      <option>신한카드</option>
                      <option>롯데카드</option>
                      <option>삼성카드</option>
                      <option>우리카드</option>
                    </select>
                      <div className='paynotice'>
                        결제 수단에 대한 내용 어쩌구 사용안내<br />
                        카드로 결제하시려면 .....<br />
                        ｡・｡∧_∧｡・｡<br />
                        ｡ﾟ 　( ﾟ´Д｀)　 ﾟ｡<br />
                        o( U U<br />
                        'ｰ'ｰ'<br />
                      </div>
                    </div>
                  }
                  else if (payment == "2") {
                    return <div><select className='payment2'>
                      <option disabled selected>선택</option>
                      <option>카카오페이</option>

                    </select>
                      <div className='paynotice'>
                        결제 수단에 대한 내용 어쩌구 사용안내<br />
                        카카오 페이로 결제하시려면 .....<br />
                        ╭ ⁀ ⁀ ╮<br />
                        ( '👅'　　)<br />
                        ╰ ‿ ‿ ╯ <br />
                      </div>
                    </div>
                  }
                  else if (payment == "3") {
                    return <div><select className='payment2'>
                      <option disabled selected>선택</option>
                      <option>토스</option>

                    </select>
                      <div className='paynotice'>
                        결제 수단에 대한 내용 어쩌구 사용안내<br />
                        토스 페이로 결제하시려면 .....<br />
                        . /\__/\<br />
                        ꒰ ˶• ༝ •˶꒱ ~♡︎<br />
                        / v v \<br />
                        |        |<br />
                        づ__づ<br />
                      </div>
                    </div>
                  }
                  else if (payment == "4") {
                    return <div><select className='payment2'>
                      <option disabled selected>선택</option>
                      <option>계좌</option>

                    </select>
                      <div className='paynotice'>
                        결제 수단에 대한 내용 어쩌구 사용안내<br />
                        계좌이체 하시려면 .....<br />
                        *゜    (\ (\<br />
                        c(⌒(_*´ㅅ`)_<br />
                      </div>
                    </div>
                  }
                  else {
                    return <div><select className='payment2'>
                      <option disabled selected>선택</option>
                      <option>핸드폰</option>

                    </select>
                      <div className='paynotice'>
                        결제 수단에 대한 내용 어쩌구 사용안내<br />
                        핸드폰으로 결제하시려면 .....<br />
                        /)/)<br />
                        ( . .)★ ´ ˚ °★<br />
                        ( づ♥︎ ★<br />

                      </div>
                    </div>
                  }
                })()
                }

              </div>

            </Modal>
          </React.Fragment>
          <br /><br />
        </div>






        <h3>대여기간</h3>
        <div className="bottom">

          <div> <div className="inputdate">
            <Calendar onChange={date => setbookingDate(date)} value={value} minDate={new Date()} maxDate={new Date(Rentalend)} />

            <br />
            선택한 날짜 : {moment(value).format("YYYY년 MM월 DD일")}
          </div>
            <br /><br />
            <label className="agree">
              <input type="checkbox" />
              &nbsp;&nbsp;개인정보 제 3자 제공동의와 결제대행 서비스 이용약관에 동의합니다. (필수)
            </label>
          </div>
          <div className="btnGroup">
            <button className="greenBtn btnbk" onClick={handlerClickSubmit}>신청</button>&nbsp;&nbsp;
            <button className="grayBtn btnbk" onClick={goItemDetail}>취소</button>
          </div>
        </div>


      </div>
      <br />

    </>

  );
}

export default BookingUpload;