import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, Route } from "react-router-dom";
import "./BookingUpload.css";


import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import


function BookingUpload({ }) {

    const [value, onChange] = useState(new Date());
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
                <div className="middle">
                        <input className="card"></input>
                        <br/><br/><br/>
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