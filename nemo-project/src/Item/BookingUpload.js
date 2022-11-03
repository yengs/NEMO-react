import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, Route } from "react-router-dom";
import "./BookingUpload.css";
import Modal from './Modal';

import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import


function BookingUpload({ }) {

    const [value, onChange] = useState(new Date());

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
  //----------결제모달 end--------------

    return (
        <>
            <div className="BookingContainer">
                 <h3>대여하기</h3>
    
                <div className="top">
                <div class="left">
                 <div className="tablePlusForm2"> 
                   <tr><td> 
                        <div className="imageDiv2"> 
                           <p className="memberImg2"></p> 
                        {/* <td>{data.itemImage}</td> */}
                         </div> 
                      </td> 
                       <td>&nbsp;&nbsp;&nbsp;&nbsp;언더아머 트레이닝복</td> 
                    </tr>  
                     </div> 
                        </div>
                <div class="right">
                    <div className="tableform2">
                        <div className="a">
                            <tr>
                                <th>대여료</th>
                                <td></td>
                                <td>100000원</td>                  
                            </tr>
                            <tr>
                                <th >보증금</th>
                                <td><div className="plus">+</div></td>
                                <td>200000원</td>                  
                            </tr>
                            </div>
                           <tr >
                           <th scope="2"></th>
                           </tr>
                            <tr>
                                <th>결제금액</th>
                                <td></td>
                                <td>300000원</td>                  
                            </tr>
                    </div>
                </div>

                </div>
                <h3>결제수단</h3>
                

               
                






{/* --------------결제모달-------------- */}
<div className="middle">
<React.Fragment>
<div class="custom-search" >
                <input type="text" class="custom-search-input" placeholder="결제수단을 등록해주세요"/>
                <button onClick={openModal} class="custom-search-botton" type="submit">등록</button>  
                </div>
                
      
      {/* header 부분에 텍스트를 입력한다. */}
      <Modal open={modalOpen} close={closeModal} header="결제수단">
        {/* Modal.js <main> {props.children} </main>에 내용이 입력된다.  */}
        <div className='payselect' name = "payment" onClick={selectcard}>신용/체크카드</div>
        <div className='payselect' name = "payment" onClick={selectkakao}>카카오페이</div>
        <div className='payselect' name = "payment" onClick={selecttoss}>토스페이</div>
        <div className='payselect' name = "payment" onClick={selecttransfer}>간편계좌결제</div>
        <div className='payselect' name = "payment" onClick={selectcell}>휴대폰 결제</div>

        <div className='paytext'>
        {(function() {
        if(payment == "1"){
            return <div><select className='payment2'>
            <option disabled selected>카드선택</option>
            <option>신한카드</option>
            <option>롯데카드</option>
            <option>삼성카드</option>
            <option>우리카드</option>
        </select>
        <div className='paynotice'>
                결제 수단에 대한 내용 어쩌구 사용안내<br/>
                카드로 결제하시려면 .....<br/>
                　｡・｡∧_∧｡・｡<br/>
                ｡ﾟ 　( ﾟ´Д｀)　 ﾟ｡<br/>
                　　o( U U<br/>
                　　　'ｰ'ｰ'<br/>
            </div>
        </div>}
        else if(payment == "2"){
            return <div><select className='payment2'>
            <option disabled selected>선택</option>
            <option>카카오페이</option>
           
        </select>
        <div className='paynotice'>
                결제 수단에 대한 내용 어쩌구 사용안내<br/>
                카카오 페이로 결제하시려면 .....<br/>
                ╭ ⁀ ⁀ ╮<br/>
                ( '👅'　　)<br/>
                ╰ ‿ ‿ ╯ <br/>
            </div>
        </div>
        }
        else if(payment == "3"){
            return <div><select className='payment2'>
            <option disabled selected>선택</option>
            <option>토스</option>
            
        </select>
        <div className='paynotice'>
        결제 수단에 대한 내용 어쩌구 사용안내<br/>
        토스 페이로 결제하시려면 .....<br/>
        . /\__/\<br/>
        ꒰ ˶• ༝ •˶꒱ ~♡︎<br/>
         / v v \<br/>
         |        |<br/>
        づ__づ<br/>
         </div>
        </div> }
        else if(payment == "4"){
            return <div><select className='payment2'>
            <option disabled selected>선택</option>
            <option>계좌</option>
          
        </select>
        <div className='paynotice'>
        결제 수단에 대한 내용 어쩌구 사용안내<br/>
        계좌이체 하시려면 .....<br/>
        *゜    (\ (\<br/>
        c(⌒(_*´ㅅ`)_<br/>
         </div>
        </div> }
        else {
            return <div><select className='payment2'>
            <option disabled selected>선택</option>
            <option>핸드폰</option>
        
        </select>
        <div className='paynotice'>
        결제 수단에 대한 내용 어쩌구 사용안내<br/>
        핸드폰으로 결제하시려면 .....<br/>
        /)/)<br/>
        ( . .)★ ´ ˚ °★<br/>
        ( づ♥︎ ★<br/>

        </div>
        </div>}  
        })()
         }
 
        </div>

      </Modal>
    </React.Fragment>
    <br/><br/>
    </div>
    
    



















                <h3>대여기간</h3>
                <div className="bottom">
                        
                <div> <div className="inputdate">
      <Calendar onChange={onChange} value={value} />
        
            <br/>
              선택한 날짜 : {moment(value).format("YYYY년 MM월 DD일")} 
         </div>
         <br/><br/>
         <label className="agree">
                                <input type="checkbox" />
                                &nbsp;&nbsp;개인정보 제 3자 제공동의와 결제대행 서비스 이용약관에 동의합니다. (필수)
                            </label>
          </div> 
         <div className="btnGroup">
              <button className="greenBtn btnbk">신청</button>&nbsp;&nbsp;
              <button className ="grayBtn btnbk">취소</button>
        </div>
                </div>


            </div> 
            <br/>








            </>

    );
}

export default BookingUpload;