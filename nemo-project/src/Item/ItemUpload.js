import axios from "axios";
// import { useState } from "react";
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import "./ItemUpload.css";

function ItemUpload({ history }) {

    const [itemName, setitemName] = useState('');
    const [itemPrice, setitemPrice] = useState('');
    const [itemMaincategory, setitemMaincategory] = useState('');
    const [itemSubcategory, setitemSubcategory] = useState('');
    const [itemDeposit, setitemDeposit] = useState('');
    const [itemDetail, setiitemDetail] = useState('');
    const [itemWeather, setitemWeather] = useState('');
    const [itemTopsize, setitemTopsize] = useState('');
    const [itemBottomsize, setitemBottomsize] = useState('');
    const [itemEtcsize, setitemEtcsize] = useState('');
    // const [itemRentalperiod, setitemRentalperiod] = useState('');

    
    const handlerChangeitemName = (e) => setitemName(e.target.value);
    const handlerChangeitemPrice = (e) => setitemPrice(e.target.value);
    const handlerChangeitemMaincategory =(e) => setitemMaincategory(e.target.value);
    const handlerChangeitemSubcategory =(e) => setitemSubcategory(e.target.value);
    const handlerChangeitemDeposit=(e) => setitemDeposit (e.target.value);
    const handlerChangeitemDetail=(e) =>  setiitemDetail(e.target.value);
    const handlerChangeitemWeather=(e) => setitemWeather(e.target.value);
    const handlerChangeitemTopsize=(e) => setitemTopsize(e.target.value);
    const handlerChangeitemBottomsize=(e) => setitemBottomsize(e.target.value);
    const handlerChangeitemEtcsize=(e) => setitemEtcsize(e.target.value);
    // const handlerChangeitemRentalperiod=(e) => setitemRentalperiod(e.target.value);



    const [startDate, setStartDate] = useState(new Date("2022/10/28"));
    const [endDate, setEndDate] = useState(new Date("2022/10/30"));

    const handlerClickGoback = () => history.goBack();

    const handlerClickSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/item', { "itemName": itemName, "itemPrice": itemPrice,"itemMaincategory":itemMaincategory,"itemSubcategory":itemSubcategory,"itemDeposit":itemDeposit,
                                                        "itemDetail":itemDetail,"itemWeather":itemWeather,"itemTopsize":itemTopsize,"itemBottomsize":itemBottomsize,
                                                        "itemEtcsize":itemEtcsize,"itemRentalstart" :startDate,"itemRentalend":endDate})
        .then(response => {
            if (response.status === 200) {
                alert("정상적으로 등록되었습니다.");
                history.push(`/item/cate/${itemMaincategory}`);
            } else {
                alert("등록에 실패했습니다.");
                return;
            }
        })
        .catch(error => console.log(error));
    };


  
    return (
        <>
            <div className="itemcontainer">
            <h2>상품 등록</h2>
            <hr/>
                <form id="frm" name="frm">
                    <table className="board_detail">
                        <tr>
                            <td>상품명</td>
                        

                            <td><input type="text" id="itemName" name="itemName" value={itemName} onChange={handlerChangeitemName} /></td>
                        </tr>
                        
                        <tr>
                            <td>상품 대분류</td>
                            <td> <select type="text" id="itemMaincategory" name="itemMaincategory" value={itemMaincategory} onChange={handlerChangeitemMaincategory} required>
                                <option value="">------------------선택------------------</option>
                                <option value="상의">상의</option>
                                <option value="하의">하의</option>
                                <option value="아우터">아우터</option>
                                <option value="원피스">원피스</option>
                                </select>
                            </td>
                    

                        </tr>
                        <tr>
                            <td>상품 소분류</td>
                            {/* <td><input type="text" id="itemSubcategory" name="itemSubcategory" value={itemSubcategory} onChange={handlerChangeitemSubcategory} /></td> */}
                            <td>     {
                                (function() {
                                    if( itemMaincategory ==="상의"){
                                   return <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory} required>
                                    <option value="">------------------선택------------------</option>
                                    <option value="반팔">반팔</option>
                                   <option value="긴팔">긴팔</option>
                                   <option value="니트">니트</option>
                                   <option value="블라우스">블라우스</option>
                                        
                                   </select>;
                                   }
                                   else if(itemMaincategory ==="하의"){
                                   return  <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory} required>
                                   <option value="">------------------선택------------------</option>
                                   <option value="바지">바지</option>
                                  <option value="치마">치마</option>
                                  <option value="반바지">반바지</option> 
                                  <option value="레깅스">레깅스</option>
                             
                                  </select>;}

                                   else if(itemMaincategory ==="아우터"){
                                    return  <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory}>
                                    <option value="">------------------선택------------------</option>
                                     <option value="패딩">패딩</option>
                                     <option value="코트">코트</option>
                                     <option value="바람막이">바람막이</option> 
                              
                                   </select>;}
                                  else {return  <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory}>
                                     <option value="">------------------선택------------------</option>
                                     <option value="패딩">롱</option>
                                     <option value="코트">미디</option>
                                     <option value="바람막이">미니</option> 
                                 </select>;}
                                })()
                            }</td>
                        </tr>

                        <tr>
                            <td>어울리는 계절</td>
                            {/* <td><input type="text" id="itemWeather" name="itemWeather" value={itemWeather} onChange={handlerChangeitemWeather} /></td> */}
                             <td>  
                             <select type="text" required id="itemWeather" name="itemWeather"  value={itemWeather} onChange={handlerChangeitemWeather}>
                             <option value="">------------------선택------------------</option>
                                     <option value="봄">봄</option>
                                    <option value="여름">여름</option>
                                    <option value="가을">가을</option> 
                                    <option value="겨울">겨울</option> 
                                    </select>
                            </td>
                        </tr>

                        <tr>
                            <td>사이즈</td>   
                            <td>
                            {
                                (function() {
                                    if( itemMaincategory ==="상의"){
                                   return <select type="text" required id="itemTopsize" name="itemTopsize"  value={itemTopsize} onChange={handlerChangeitemTopsize}>
                                   <option value="">------------------선택------------------</option>
                                    <option value="44이하">44이하</option>
                                   <option value="55">55</option>
                                   <option value="66">66</option>
                                   <option value="77">77</option>
                                   <option value="88이상">88이상</option> 

                                   </select>;
                                   }
                                   else if(itemMaincategory ==="하의"){
                                   return  <select type="text" required id="itemBottomsize" name="itemBottomsize"  value={itemBottomsize} onChange={handlerChangeitemBottomsize}>
                                  <option value="">------------------선택------------------</option>
                                   <option value="25이하">25이하</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option> 
                                  <option value="28">28</option>
                                  <option value="29">29</option> 
                                  <option value="30">30</option> 
                                  <option value="31">31</option> 
                                  <option value="32">32</option> 
                                  <option value="33이상">33이상</option> 
                                  </select>;}
                                  else {return <select type="text" required id="itemEtcsize" name="itemEtcsize"  value={itemEtcsize} onChange={handlerChangeitemEtcsize}>
                                    <option value="">------------------선택------------------</option>
                                     <option value="S">S</option>
                                     <option value="M">M</option>
                                     <option value="L">L</option> 
                                 </select>;}
                                })()
                            }
                            

                            </td>
                       </tr>

                        <tr>
                            <td>가격</td>
                            <td><input type="text" id="itemPrice" name="itemPrice" value={itemPrice} onChange={handlerChangeitemPrice} required/></td>
                        </tr>
                        <tr>
                            <td>보증금</td>
                            <td><input type="text" required id="itemDeposit" name="itemDeposit" value={itemDeposit} onChange={handlerChangeitemDeposit} /></td>
                        </tr>
                        
                        <tr>
                            <td>이미지</td>
                            <td> <input className="form-control-image" type = "file" name="file" required/></td>
                        </tr>
                       
                                        
                        <tr>
                            <td>대여시작일</td>
                            <td><DatePicker dateFormat="yyyy-MM-dd" className="startDate" selected={startDate} onChange={date => setStartDate(date)} selectStart startDate={startDate} endDate={endDate} locale={ko} minDate={new Date()} required /> </td>
                       </tr>
                       <tr>
                            <td>대여마감일</td>
                            <td><DatePicker dateFormat="yyyy-MM-dd" className="endDate" selected={endDate} onChange={date => setEndDate(date)} selectEnd startDate={startDate} endDate={endDate}locale={ko} minDate={startDate} required /> </td>
                       </tr>

                       <tr>
                            <td>상품설명</td>
                            <td><input type="textarea" id="itemDetail" name="itemDetail" value={itemDetail} onChange={handlerChangeitemDetail} /></td>
                        </tr>
                        
                    </table>      
                </form>    
        </div>
            <div className="btnWrapItem">
                <input type="submit" id="submit" value="등록" className="greenBtn btn" onClick={handlerClickSubmit}/>
                <input type="button" id="cancle" value="취소" className="grayBtn btn" onClick={handlerClickGoback}/>
            </div>  
            
        </>
    );
}

export default ItemUpload;