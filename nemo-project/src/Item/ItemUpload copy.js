import axios from "axios";
// import { useState } from "react";
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';


function ItemUpload({ history }) {

    const [iName, setiName] = useState('');
    const [iPrice, setiPrice] = useState('');
    const [itemMaincategory, setitemMaincategory] = useState('');
    const [itemSubcategory, setitemSubcategory] = useState('');
    const [itemDeposit, setitemDeposit] = useState('');
    const [itemDetail, setiitemDetail] = useState('');
    const [itemWeather, setitemWeather] = useState('');
    const [itemTopsize, setitemTopsize] = useState('');
    const [itemBottomsize, setitemBottomsize] = useState('');
    const [itemEtcsize, setitemEtcsize] = useState('');
    // const [itemRentalperiod, setitemRentalperiod] = useState('');

    
    const handlerChangeiName = (e) => setiName(e.target.value);
    const handlerChangeiPrice = (e) => setiPrice(e.target.value);
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



    const handlerClickSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/item', { "itemName": iName, "itemPrice": iPrice, "iName": iName, "iPrice": iPrice,"itemMaincategory":itemMaincategory,"itemSubcategory":itemSubcategory,"itemDeposit":itemDeposit,
                                                        "itemDetail":itemDetail,"itemWeather":itemWeather,"itemTopsize":itemTopsize,"itemBottomsize":itemBottomsize,
                                                        "itemEtcsize":itemEtcsize,"itemRentalstart" :startDate,"itemRentalend":endDate})
        .then(response => {
            if (response.status === 200) {
                alert("??????????????? ?????????????????????.");
                history.push("/item");
            } else {
                alert("????????? ??????????????????.");
                return;
            }
        })
        .catch(error => console.log(error));
    };


  
    return (
        <>
            <div className="container">
                <h2>?????? ??????</h2>
                <form id="frm" name="frm">
                    <table className="board_detail">
                        <tr>
                            <td>?????????</td>
                        
                            <td><input type="text" id="iName" name="iName" value={iName} onChange={handlerChangeiName} /></td>
                        </tr>
                        <tr>
                            <td>??????</td>
                            <td><input type="text" id="iPrice" name="iPrice" value={iPrice} onChange={handlerChangeiPrice} /></td>
                        </tr>

                        <tr>
                            <td>?????? ?????????</td>
                            <td> <select type="text" id="itemMaincategory" name="itemMaincategory" value={itemMaincategory} onChange={handlerChangeitemMaincategory} >
                                <option value="">??????</option>
                                <option value="??????">??????</option>
                                <option value="??????">??????</option>
                                <option value="?????????">?????????</option>
                                <option value="?????????">?????????</option>
                                </select>
                            </td>
                    

                        </tr>
                        <tr>
                            <td>?????? ?????????</td>
                            {/* <td><input type="text" id="itemSubcategory" name="itemSubcategory" value={itemSubcategory} onChange={handlerChangeitemSubcategory} /></td> */}
                            <td>     {
                                (function() {
                                    if( itemMaincategory ==="??????"){
                                   return <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory}>
                                    <option value="">??????</option>
                                    <option value="??????">??????</option>
                                   <option value="??????">??????</option>
                                   <option value="??????">??????</option>
                                   <option value="????????????">????????????</option>
                                        
                                   </select>;
                                   }
                                   else if(itemMaincategory ==="??????"){
                                   return  <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory}>
                                   <option value="">??????</option>
                                   <option value="??????">??????</option>
                                  <option value="??????">??????</option>
                                  <option value="?????????">?????????</option> 
                                  <option value="?????????">?????????</option>
                             
                                  </select>;}
                                   else if(itemMaincategory ==="?????????"){
                                    return  <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory}>
                                    <option value="">??????</option>
                                     <option value="??????">??????</option>
                                     <option value="??????">??????</option>
                                     <option value="????????????">????????????</option> 
                              
                                   </select>;}
                                  else {return  <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory}>
                                     <option value="">??????</option>
                                     <option value="??????">???</option>
                                     <option value="??????">??????</option>
                                     <option value="????????????">??????</option> 
                                 </select>;}
                                })()
                            }</td>
                        </tr>

                        <tr>
                            <td>?????????</td>   
                            <td>
                            {
                                (function() {
                                    if( itemMaincategory ==="??????"){
                                   return <select type="text" id="itemTopsize" name="itemTopsize"  value={itemTopsize} onChange={handlerChangeitemTopsize}>
                                   <option value="">??????</option>
                                    <option value="44??????">44??????</option>
                                   <option value="55">55</option>
                                   <option value="66">66</option>
                                   <option value="77">77</option>
                                   <option value="88??????">88??????</option> 

                                   </select>;
                                   }
                                   else if(itemMaincategory ==="??????"){
                                   return  <select type="text" id="itemBottomsize" name="itemBottomsize"  value={itemBottomsize} onChange={handlerChangeitemBottomsize}>
                                  <option value="">??????</option>
                                   <option value="25??????">25??????</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option> 
                                  <option value="28">28</option>
                                  <option value="29">29</option> 
                                  <option value="30">30</option> 
                                  <option value="31">31</option> 
                                  <option value="32">32</option> 
                                  <option value="33??????">33??????</option> 
                                  </select>;}
                                  else {return <select type="text" id="itemEtcsize" name="itemEtcsize"  value={itemEtcsize} onChange={handlerChangeitemEtcsize}>
                                    <option value="">??????</option>
                                     <option value="S">S</option>
                                     <option value="M">M</option>
                                     <option value="L">L</option> 
                                 </select>;}
                                })()
                            }
                            

                            </td>
                       </tr>
                       
                        <tr>
                            <td>?????????</td>
                            <td><input type="text" id="itemDeposit" name="itemDeposit" value={itemDeposit} onChange={handlerChangeitemDeposit} /></td>
                        </tr>

                        <tr>
                            <td>????????????</td>
                            <td><input type="text" id="itemDetail" name="itemDetail" value={itemDetail} onChange={handlerChangeitemDetail} /></td>
                        </tr>  <tr>
                            <td>??????</td>
                            {/* <td><input type="text" id="itemWeather" name="itemWeather" value={itemWeather} onChange={handlerChangeitemWeather} /></td> */}
                             <td>  
                             <select type="text" id="itemWeather" name="itemWeather"  value={itemWeather} onChange={handlerChangeitemWeather}>
                             <option value="">??????</option>
                                     <option value="???">???</option>
                                    <option value="??????">??????</option>
                                    <option value="??????">??????</option> 
                                    <option value="??????">??????</option> 
                                    </select>
                            </td>
                    
                        </tr>
                        <tr>
                            <td>?????????</td>
                            <td> <input className="form-control" type = "file" name="file"/></td>
                        </tr>
                       
                                        
                        <tr>
                            <td>???????????????</td>
                            <td><DatePicker dateFormat="yyyy-MM-dd" selected={startDate} onChange={date => setStartDate(date)} selectStart startDate={startDate} endDate={endDate} locale={ko} minDate={new Date()}/> </td>
                       </tr>
                       <tr>
                            <td>???????????????</td>
                            <td><DatePicker dateFormat="yyyy-MM-dd" selected={endDate} onChange={date => setEndDate(date)} selectEnd startDate={startDate} endDate={endDate}locale={ko} minDate={startDate}/> </td>
                       </tr>
                    

                        
                    </table>      
                    <input type="submit" id="submit" value="??????" className="btn" onClick={handlerClickSubmit}/>
                </form>      
            </div>
        </>
    );
}

export default ItemUpload;