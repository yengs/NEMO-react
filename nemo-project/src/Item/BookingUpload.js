import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, Route } from "react-router-dom";
import "./BookingUpload.css";
import Modal from './Modal';

import moment from 'moment';
import 'moment/locale/ko';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import



function BookingUpload({ history, match }) {

  //---------결제모달---------------
  const [modalOpen, setModalOpen] = useState(false);
  const [payment, setPayment] = useState('1');
  const [paypay, setPaypay] = useState('')

  const handlerpaypay = (e) => {
    if (payment === '1') {

    }
    setPaypay(e.target.value)
  }
  const selectcard = (e) => setPayment('1');
  const selectkakao = (e) => {
    setPayment('2');
    setPaypay('카카오페이');
  };
  const selecttoss = (e) => {
    setPayment('3');
    setPaypay('토스페이');
  };
  const selecttransfer = (e) => setPayment('4');
  const selectaccount = (e) => setPayment('5');
  const selectcell = (e) => setPayment('6');
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

  const { itemNum } = match.params;
  const { itemName } = match.params;
  const { itemDeposit } = match.params;
  const { itemPrice } = match.params;
  const { itemWriter } = match.params;
  const { files } = match.params;
  const { itemRentalstart } = match.params;
  const { itemRentalend } = match.params;

  const bookingItemnum = itemNum;
  const bookingItemname = itemName;
  const Deposit = itemDeposit;
  const bookingItemprice = itemPrice;
  const bookingItemwriter = itemWriter;
  const bookingItemfiles = files;
  const Rentalstart = itemRentalstart;
  const Rentalend = itemRentalend;


  const sum = (parseInt(bookingItemprice) + parseInt(Deposit));
  const bookingMember = sessionStorage.getItem('memberId');

  const Deposit2 = Deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const bookingItemprice2 = bookingItemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const sum2 = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const handlerClickSubmit = (e) => {
    e.preventDefault();
    if (paypay === '') {
      alert("결제수단을 선택해주세요.")
    }
    else if (value === '') {
      alert("대여날짜를 선택해주세요.")
    }
    else if (checkAgree !== true) {
      alert("필수약관에 동의해주세요.")
    }
    else if (checkAgree === true && value !== '') {

      axios.post(`http://localhost:8080/api/booking/bookingWrite`,
        {
          "bookingMember": bookingMember,
          "bookingDate": value,
          "bookingItemnum": bookingItemnum,
          "bookingItemname": bookingItemname,
          "bookingItemprice": bookingItemprice,
          "bookingItemwriter": bookingItemwriter,
          "bookingItemfiles": bookingItemfiles
        })
        .then(response => {
          if (response.status === 200) {
            alert("정상적으로 등록되었습니다.");
            window.location.href = "/mypage/mybooking"
          } else {
            alert("등록에 실패했습니다.");
            return;
          }
        })
        .catch(error => console.log(error));
    }
  };

  //-----------대여하기 end--------------------

  //==========================대여날짜 --------------------------
  const [datas, setDatas] = useState([]);
  const bookingItemnumber = bookingItemnum;
  const [value, setbookingDate] = useState('');
  const [dates, setDates] = useState([]);





  const list = dates.map((date) => {
    return (new Date(date))
  })

  const disableDates = list;

  useEffect(() => {
    axios.get(`http://localhost:8080/api/allbooking/${bookingItemnumber}`)
      .then(response => {
        setDatas(response.data);

        const dateList = response.data.map((datalist, i) => datalist.bookingDate);
        setDates(dateList);

      })
      .catch(error => console.log(error));
  }, []);

  var now = new Date();
  var tomorrow = new Date(now.setDate(now.getDate() + 1));

  // 필수약관체크
  const [checkAgree, setCheckAgree] = useState(false);
  const onchangeCheckAgree = () => {
    if (checkAgree == false) {
      setCheckAgree(true);
    } else {
      setCheckAgree(false);
    }
  }
  console.log(checkAgree)





  //------------------------------End------------------------------


  return (
    <>

      <div className="BookingContainer" style={{ maxWidth: '730px' }}>
        <h3>대여하기</h3>

        <div className="top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', height: '280px' }}>
          <div className="left" style={{ width: '100%' }}>
            <div className="tablePlusForm2" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <img className="memberImg2" src={`../../files/${bookingItemfiles}`} style={{
                width: '240px',
                height: '260px'
              }} />
              <div style={{ width: "50%" }}>
                <p style={{ fontSize: '22px', fontWeight: '600', textAlign: 'left' }}>{bookingItemname}</p>
                <table style={{ verticalAlign: 'center', textAlign: 'right', borderSpacing: "0", width: '100%', float: 'right' }}>
                  <colgroup>
                    <col width='33%' />
                    <col width='' />
                  </colgroup>
                  <tr>
                    <th style={{ fontWeight: '400', padding: '10px 0', textAlign: 'left' }}>대여료</th>
                    <td colSpan={2} style={{ padding: '10px 0' }} ><span style={{ fontWeight: '700' }}>{bookingItemprice2}</span> 원</td>
                  </tr>
                  <tr>
                    <th style={{ borderBottom: '1px solid #aaa', fontWeight: '400', padding: '10px 0 13px 0', textAlign: 'left' }}>보증금</th>
                    <td style={{ borderBottom: '1px solid #aaa', padding: '10px 0 13px 0' }}>+ <span style={{ fontWeight: '700' }}>{Deposit2}</span> 원</td>
                  </tr>
                  <tr>
                    <th style={{ fontWeight: '400', padding: '13px 0 0 0', textAlign: 'left' }}>결제금액</th>
                    <td colSpan={2} style={{ padding: '13px 0 0 0' }}><span style={{ fontWeight: '700', color: 'rgb(229 92 27)' }}>{sum2}</span> 원</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

        </div>
        <h3>결제수단</h3>


        {/* --------------결제모달-------------- */}
        <div className="middle" style={{ borderBottom: '1px solid #ddd' }}>
          <React.Fragment>
            <div className="custom-search" >
              <input type="text" className="custom-search-input" placeholder="결제수단을 등록해주세요" value={paypay} style={{ fontSize: '15px' }} />
              <button onClick={openModal} className="custom-search-botton" type="submit" style={{ backgroundColor: "rgb(88, 145, 112)" }}>등록</button>
            </div>


            {/* header 부분에 텍스트를 입력한다. */}
            <Modal open={modalOpen} close={closeModal} header="결제수단">
              {/* Modal.js <main> {props.children} </main>에 내용이 입력된다.  */}
              <div className='payselect' name="payment" onClick={selectcard}>신용/체크카드</div>
              <div className='payselect' name="payment" onClick={selectkakao}>카카오페이</div>
              <div className='payselect' name="payment" onClick={selecttoss}>토스페이</div>
              {/* <div className='payselect' name="payment" onClick={selecttransfer}>간편계좌결제</div> */}
              <div className='payselect' name="payment" onClick={selectaccount}>무통장입금</div>
              <div className='payselect' name="payment" onClick={selectcell}>휴대폰 결제</div>

              <div className='paytext' onChange={handlerpaypay} style={{ height: '180px' }}>
                {(function () {
                  if (payment == "1") {
                    return <div><select className='payment2' style={{ borderRadius: '3px', border: '1px solid #ccc', padding: '0 5px', outline: 'none' }}>
                      <option disabled selected>카드선택</option>
                      <option value='신한카드'>신한카드</option>
                      <option value='롯데카드'>롯데카드</option>
                      <option value='삼성카드'>삼성카드</option>
                      <option value='우리카드'>우리카드</option>
                    </select>

                      <div className='paynotice'>
                      </div>
                    </div>
                  }
                  else if (payment == "2") {
                    return <div><select className='payment2' style={{ borderRadius: '3px', border: '1px solid #ccc', padding: '0 5px', outline: 'none' }}>
                      {/* <option disabled selected>선택</option> */}
                      <option value='카카오페이'>카카오페이</option>

                    </select>
                      <div className='paynotice'>
                      </div>
                    </div>
                  }
                  else if (payment == "3") {
                    return <div>
                      <select className='payment2' style={{ borderRadius: '3px', border: '1px solid #ccc', padding: '0 5px', outline: 'none' }}>
                        <option value='토스'>토스페이</option>
                  </select>
                      {/* <div className='paynotice'>
                      </div> */}
                    </div>
                  }
                  // else if (payment == "4") {
                  //   return <div><select className='payment2' style={{borderRadius:'3px', border:'1px solid #ccc', padding:'0 5px'}}>
                  //     {/* <option disabled selected>선택</option> */}
                  //     <option value='계좌'>가상계좌</option>

                  //   </select>
                  //     <div className='paynotice'>
                  //     </div>
                  //   </div>
                  // }
                  else if (payment == "5") {
                    return <div><select className='payment2' style={{ borderRadius: '3px', border: '1px solid #ccc', padding: '0 5px', outline: 'none' }}>
                      {/* <option disabled selected>선택</option> */}
                      <option disabled selected>은행선택</option>
                      <option value='농협은행'>농협은행</option>
                      <option value='국민은행'>국민은행</option>
                      <option value='신한은행'>신한은행</option>
                      <option value='우리은행'>우리은행</option>
                      <option value='기업은행'>기업은행</option>

                    </select>
                      <div className='paynotice'>
                        입금기한&nbsp;&nbsp;<span style={{ fontWeight: '700' }}>{moment(Date()).add(1, 'days').format('yy년 MM월 DD일 23시 59분')}</span> 까지
                      </div>
                    </div>
                  }
                  else {
                    return <div><select className='payment2' style={{ borderRadius: '3px', border: '1px solid #ccc', padding: '0 5px', outline: 'none' }}>
                      <option disabled selected>통신사 선택</option>
                      <option value='KT'>KT</option>
                      <option value='SKT'>SKT</option>
                      <option value='헬로모바일'>헬로모바일</option>
                      <option value='KCT'>KCT</option>
                    </select>
                      <div className='paynotice'>
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






        <h3>대여날짜</h3>
        <div className="bottom">

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Calendar onChange={date => setbookingDate(date)} value={value} minDate={tomorrow} maxDate={new Date(Rentalend)}
              formatDay={(locale, date) => moment(date).format("DD")}
              tileDisabled={({ date, view }) =>
                (view === 'month') && // Block day tiles only
                disableDates.some(disabledDate =>
                  date.getFullYear() === disabledDate.getFullYear() &&
                  date.getMonth() === disabledDate.getMonth() &&
                  date.getDate() === disabledDate.getDate()
                )} />
            <p>선택한 날짜 : {
              value === '' ?
                <span style={{ color: '#666' }}>대여날짜를 선택해주세요</span>
                :
                <span style={{ fontWeight: '800' }}>{moment(value).format("YYYY년 MM월 DD일")}</span>
            }
            </p>
            <label className="agree" style={{ margin: '20px 0 0 0' }}>
              <input type="checkbox" onChange={onchangeCheckAgree} style={{ margin: '0 7px 0 0' }} />
              개인정보 제 3자 제공동의와 결제대행 서비스 이용약관에 동의합니다. (필수)
            </label>
          </div>
          <div className="btnGroup" style={{ marginLeft: '50%', transform: 'translateX(-50%)', width: 'fit-content' }}>
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