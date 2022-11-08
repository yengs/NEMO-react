import axios from "axios";
import { useEffect, useState } from "react";
// import { Route } from "react-router-dom";
// import "./MyPageItemDetail.css";
import { ko } from 'date-fns/esm/locale';
import DatePicker from "react-datepicker";

import styled from 'styled-components';

// import Shirt from '../img/shirt.jpg';

function MyPageItemDetail({ match, location, history }) {
    const { itemNum } = match.params;
    
    const [ data, setData ] = useState({});
    const [ itemName, setItemName ] = useState('');
    const [ itemPrice, setItemPrice ] = useState('');
    const [ itemDetail, setItemDetail ] = useState('');
    const [ itemMaincategory, setItemMaincategory ] = useState('');
    const [ itemSubcategory, setItemSubcategory ] = useState('');
    const [ itemDeposit, setItemDeposit ] = useState('');
    const [ itemWeather, setItemWeather ] = useState('');
    const [ itemTopsize, setItemTopsize ] = useState('');
    const [ itemBottomsize, setItemBottomsize ] = useState('');
    const [ itemEtcsize, setItemEtcsize ] = useState('');
    const [ itemRentalstart, setItemRentalstart ] = useState('');
    const [ itemRentalend, setItemRentalend ] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/${itemNum}`)
        .then(response => { 
            setData(response.data);
            setItemName(response.data.itemName);
            setItemPrice(response.data.itemPrice);
            setItemDetail(response.data.itemDetail);
            setItemMaincategory(response.data.itemMaincategory);
            setItemSubcategory(response.data.itemSubcategory);
            setItemDeposit(response.data.itemDeposit);
            setItemWeather(response.data.itemWeather);
            setItemTopsize(response.data.itemTopsize);
            setItemBottomsize(response.data.itemBottomsize);
            setItemEtcsize(response.data.itemEtcsize);
            setItemRentalstart(response.data.itemRentalstart);
            setItemRentalend(response.data.itemRentalend);
        })
        .catch(error => { console.log(error); });
    }, []);

    const [startDate, setStartDate] = useState(new Date("2022/11/01"));
    const [endDate, setEndDate] = useState(new Date("2022/11/31"));

    const handlerChangeName = (e) => setItemName(e.target.value);
    const handlerChangePrice = (e) => setItemPrice(e.target.value);
    const handlerChangeDetail = (e) => setItemDetail(e.target.value);
    const handlerChangeItemMaincategory = (e) => setItemMaincategory(e.target.value);
    const handlerChangeItemSubcategory = (e) => setItemSubcategory(e.target.value);
    const handlerChangeItemDeposit = (e) => setItemDeposit(e.target.value);
    const handlerChangeItemWeather = (e) => setItemWeather(e.target.value);
    const handlerChangeItemTopsize = (e) => setItemTopsize(e.target.value);
    const handlerChangeItemBottomsize = (e) => setItemBottomsize(e.target.value);
    const handlerChangeItemEtcsize = (e) => setItemEtcsize(e.target.value);
    const handlerChangeItemRentalstart = (e) => setItemRentalstart(e.target.value);
    const handlerChangeItemRentalend = (e) => setItemRentalend(e.target.value);
    
    const handlerClickList = () => history.goBack();
    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/item/${itemNum}`)
        .then(response => { 
            console.log(response);
            if (response.status === 200) {
                alert("정상적으로 삭제되었습니다.");
                history.push("/mypage/mypageitem");
            } else {
                alert("삭제에 실패했습니다.");
                return;
            }
        })
        .catch(error => console.log(error));
    };
    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/api/item/${itemNum}`, { 
            'itemName': itemName, 'itemPrice': itemPrice, 'itemDetail': itemDetail
            ,'itemMaincategory' : itemMaincategory, 'itemSubcategory': itemSubcategory,
            'itemDeposit' : itemDeposit, 'itemWeather' : itemWeather,
            'itemTopsize' : itemTopsize, 'itemBottomsize' : itemBottomsize,
            'itemEtcsize' : itemEtcsize, 'itemRentalstart' : itemRentalstart,
            'itemRentalend' : itemRentalend
        })
            .then(response => {
                if (response.status === 200) {
                    alert("정상적으로 수정되었습니다.");
                    history.push("/mypage/mypageitem")
                    
                } else {
                    alert("수정에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    };
    

    return (
        <MyPageItemDetailContainer style={{width:'calc(100% - 230px)', height:'100%'}}>
            <div className="mypageInnerPage myDetailPage">
                <h3>내 상품 상세조회</h3>

                <div className="myDetailImage">
                    {/* 이미지 부분 확인하려고 넣음! 나중에 아래 div처럼 다시 이미지 넣어야함
                    <div className="myDetailImg"> */}
                        <p className="memberImg"></p>
                        <td>{data.itemImage}</td>
                    </div>

                    {/* <div className="myDetailImage">
                        <div className="myDImage" style={{ "backgroundImage": `url(${Shirt})` }}></div>
                    </div> */}


                <div className="myDetailTable">
                    <form method="post" id="frm" name="frm">
                        <colgroup>
                            <col width="40%" />
                            <col width="60%" />
                        </colgroup>
                        <tbody>
                        <tr>
                                <th scope="row">상품명</th>
                                <td><input type="text" value={itemName} onChange={handlerChangeName} /></td>                  
                            </tr>
                            <tr>
                                <th scope="row">어울리는 계절</th>
                                <td><input type="text" value={itemWeather} onChange={handlerChangeItemWeather} /></td>               
                            </tr>
                            <tr>
                                <th scope="row">대분류</th>
                                <td><input type="text" value={itemMaincategory} onChange={handlerChangeItemMaincategory} /></td>                  
                            </tr>
                            <tr>
                                <th scope="row">소분류</th>
                                <td><input type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory} /></td>                  
                            </tr>
                            <tr>
                                <th scope="row">가격</th>
                                <td><input type="text" value={itemPrice} onChange={handlerChangePrice} /></td>                  
                            </tr>
                            <tr>
                                <th scope="row">보증금</th>
                                <td><input type="text" value={itemDeposit} onChange={handlerChangeItemDeposit} /></td>                 
                            </tr>
                            <tr>
                                <th scope="row">사이즈</th>
                                {/* 드롭박스 형식으로 바꿔야함! */}
                                {
                                (function() {
                                    if( data.itemMaincategory ==="상의"){
                                   return  <td><input type="text" value={itemTopsize} onChange={handlerChangeItemTopsize} /></td>
                                   }
                                   else if( data.itemMaincategory ==="하의"){
                                   return  <td><input type="text" value={itemBottomsize} onChange={handlerChangeItemBottomsize} /></td>  
                                   }
                                  else {return  <td><input type="text" value={itemEtcsize} onChange={handlerChangeItemEtcsize} /></td>  }
                                })()
                            }                      
                            </tr>
                            {/* 내용 안에 내용 길이에 따라 줄바뀜+늘어남 조절되게 바꿔야함 */}
                            <tr>
                                <th scope="row">내용</th>
                                <td><input type="text" value={itemDetail} onChange={handlerChangeDetail} /></td>
                            </tr>
                            
                            <tr>
                                <th scope="row">대여기간</th>
                                {/* <td><input className="rentalInput" type="text" value={itemRentalstart} onChange={handlerChangeItemRentalstart} />{' ~ '}
                                    <input className="rentalInput" type="text" value={itemRentalend} onChange={handlerChangeItemRentalend} /></td>                   */}
                                    {/* <td className="rentalInput"> */}
                                    <div className="rentalDiv">
                                        <DatePicker dateFormat="yyyy-MM-dd" className="startDate" selected={startDate} onChange={date => setStartDate(date)} selectStart startDate={startDate} endDate={endDate} locale={ko} minDate={new Date()}/>
                                    {' ~ '}
                                    <DatePicker dateFormat="yyyy-MM-dd" className="endDate" selected={endDate} onChange={date => setEndDate(date)} selectEnd startDate={startDate} endDate={endDate}locale={ko} minDate={startDate}/>
                                    </div>
                            </tr>
                        </tbody>
                    </form>
                </div>
            
                <div className="btnDivMPID">
                    <input type="button" id="list"   className="greyBtnMPID" value="목록으로" onClick={handlerClickList} />
                    <input type="button" id="edit"   className="greenBtnMPID" value="수정하기" onClick={handlerClickUpdate} />
                    <input type="button" id="delete" className="redBtnMPID" value="삭제하기" onClick={handlerClickDelete} />
                </div>

            </div>    
        </MyPageItemDetailContainer>

    );
}

const MyPageItemDetailContainer = styled.div`
.mypageInnerPage {
    width: 100% !important;
    height: 100% !important;
}

// .myDetailPage {
//     width: calc(100% - 230px);
//     padding: 20px;
//     box-sizing: border-box;
//     background-color: rgb(245, 245, 245);
//     border-top-right-radius: 20px;
//     border-bottom-right-radius: 20px;
// }

.myDetailPage h3{
    // padding-left: 20px;
    padding-bottom: 20px;
    // border-bottom: 1px solid #bbb;
    margin-top: 0;
    font-size: 23px;
}

.myDetailTable {
    display: flex;
    justify-content: center;
    padding: 0 100px 0 0;
}

.myDetailTable th {
    text-align: left;
    vertical-align: middle;
    border-bottom: none;
    padding: 10px;
}

.myDetailTable form tr>td {
    width: 300px;
    border-radius: 3px;
    display: flex;
    padding: 10px;
  }

.myDetailTable form tr>td>input {
    border: 1px solid #ddd;
    width: 100%;
    padding: 8px 6px;
    border-radius: 3px;
  }

  .myDetailTable .rentalInput {
    border: 1px solid #ddd;
    width: 44%;
    padding: 8px 6px;
    border-radius: 3px;
    border-style: none;
  }

  .myDetailPage input.endDate, .myDetailPage input.startDate{
    border-style: none;
    width: 80px;
}

.btnDivMPID{
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    text-align: -webkit-center;
    display: flex;
    float: inline-end;
    padding-top: 30px;
}

.greenBtnMPID {
    border: rgb(100, 165, 127);
    background-color: rgb(100, 165, 127);
    color: #fff;
    font-weight: 100;
    margin: 20px 15px 0;
    font-size: 15px;
    padding: 10px 50px;
    border-radius: 3px;
    font-weight: 100;
  }
  
  .redBtnMPID {
    border: rgb(196, 98, 98);
    background-color: rgb(196, 98, 98);
    color: #fff;
    font-weight: 100;
    margin: 20px 15px 0;
    font-size: 15px;
    padding: 10px 50px;
    border-radius: 3px;
    font-weight: 100;
  }

/* 대충 이미지 보여주기 */

.myDetailImage {
    float: left;
    padding-left: 100px;
}

.myDetailImage .memberImg {
    background-color: rgb(219, 219, 219);
    width: 200px;
    height: 250px;
}

.rentalDiv .react-datepicker__input-container{
    border: 1px solid #ddd;
    padding: 8px 6px;
    border-radius: 3px;
    border-style: none;
    /* display: flex; */
}

.rentalDiv .react-datepicker-wrapper {
    display: inline-block;
    padding: 0;
    border: 0;
    width: 100px;
    flex: 50%;
    text-align: -webkit-center;
}

.rentalDiv {
    display: flex;
    align-items: center;
    text-align-last: center;
    height: 55px;
}

.myDetailTable tr {
    height: 55px;
}
`

export default MyPageItemDetail;