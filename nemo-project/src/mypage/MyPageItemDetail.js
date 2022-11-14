import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
    
    const [files, setFiles] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    console.log(imageSrc);
    const handlerChangefiles =(e) => {
        setFiles(e.target.files[0]);
        encodeFileToBase64(e.target.files[0]);
    }

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImageSrc(reader.result);
            resolve();
          };
        });
      };

    const handlerClickList = () => history.goBack();
    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/item/${itemNum}`)
        .then(response => { 
            console.log(response);
            if (response.status === 200) {
                alert("정상적으로 삭제되었습니다.");
                history.goBack();
            } else {
                alert("삭제에 실패했습니다.");
                return;
            }
        })
        .catch(error => console.log(error));
    };
    const handlerClickUpdate = () => {

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({'itemName': itemName, 'itemPrice': itemPrice, 'itemDetail': itemDetail
        ,'itemMaincategory' : itemMaincategory, 'itemSubcategory': itemSubcategory,
        'itemDeposit' : itemDeposit, 'itemWeather' : itemWeather,
        'itemTopsize' : itemTopsize, 'itemBottomsize' : itemBottomsize,
        'itemEtcsize' : itemEtcsize, 'itemRentalstart' : startDate,
        'itemRentalend' : endDate})], {
            type: "application/json"
        }));
        // formData.append("files", new Blob(files, { type: "image/*" }));
        formData.append("files", files);


        axios.put(`http://localhost:8080/api/item/${itemNum}`, 
            formData,
            { headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(itemRentalstart);
                    console.log(itemRentalend);
                    console.log(startDate);
                    console.log(endDate);
                    alert("정상적으로 수정되었습니다.");
                    history.goBack();
                    
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
                
            <div className="ChoiseFile">
                <div className="myDetailImage">
                    {imageSrc == '' ?
                        <img className="memberImg" src={`../../files/${data.files}`}/>
                        : <div className="myDetailImage">
                        {imageSrc && <img src={imageSrc} alt="preview-img" />} </div>
                    }
                </div>
                
                <div className="imageChoose">
                    <input className="form-control-image" type = "file" name="file" multiple onChange={handlerChangefiles}></input>
                </div>
            </div>

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
                                <td><select type="text" value={itemWeather} onChange={handlerChangeItemWeather}>
                                    <option value="봄">봄</option>
                                    <option value="여름">여름</option>
                                    <option value="가을">가을</option> 
                                    <option value="겨울">겨울</option>
                                    </select></td>               
                            </tr>
                            <tr>
                                <th scope="row">대분류</th>
                                <td><select type="text" value={itemMaincategory} onChange={handlerChangeItemMaincategory}>
                                    <option value="상의">상의</option>
                                    <option value="하의">하의</option>
                                    <option value="아우터">아우터</option>
                                    <option value="원피스">원피스</option>
                                    </select></td>                  
                            </tr>
                            <tr>
                                <th scope="row">소분류</th>
                                <td>
                                {
                                (function() {
                                    if( itemMaincategory ==="상의"){
                                   return <select type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory}>
                                    <option value="반팔">반팔</option>
                                   <option value="긴팔">긴팔</option>
                                   <option value="니트">니트</option>
                                   <option value="블라우스">블라우스</option>
                                        
                                   </select>;
                                   }
                                   else if(itemMaincategory ==="하의"){
                                   return  <select type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory}>
                                   <option value="바지">바지</option>
                                  <option value="치마">치마</option>
                                  <option value="반바지">반바지</option> 
                                  <option value="레깅스">레깅스</option>
                             
                                  </select>;}

                                   else if(itemMaincategory ==="아우터"){
                                    return  <select type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory}>
                                     <option value="패딩">패딩</option>
                                     <option value="코트">코트</option>
                                     <option value="바람막이">바람막이</option> 
                              
                                   </select>;}
                                  else {return  <select type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory}>
                                     <option value="패딩">롱</option>
                                     <option value="코트">미디</option>
                                     <option value="바람막이">미니</option> 
                                 </select>;}
                                })()
                            }
                            </td>
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
                                <td>
                                {
                                (function() {
                                    if( itemMaincategory ==="상의"){
                                   return <select type="text" value={itemTopsize} onChange={handlerChangeItemTopsize}>
                                    <option value="44이하">44이하</option>
                                   <option value="55">55</option>
                                   <option value="66">66</option>
                                   <option value="77">77</option>
                                   <option value="88이상">88이상</option> 

                                   </select>;
                                   }
                                   else if(itemMaincategory ==="하의"){
                                   return  <select type="text" value={itemBottomsize} onChange={handlerChangeItemBottomsize}>
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
                                  else {return <select type="text" value={itemEtcsize} onChange={handlerChangeItemEtcsize}>
                                     <option value="S">S</option>
                                     <option value="M">M</option>
                                     <option value="L">L</option> 
                                 </select>;}
                                })()
                            }</td>              
                            </tr>
                            <tr>
                                <th scope="row">내용</th>
                                <td><input type="textarea" className="DetailTextarea" value={itemDetail} onChange={handlerChangeDetail} /></td>
                            </tr>
                            
                            <tr>
                                <th scope="row">대여기간</th>
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
    display: grid;
    -webkit-box-pack: center;
    justify-content: center;
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
    height: 54px;
  }

.myDetailTable form tr>td>input {
    border: 1px solid #ddd;
    width: 100%;
    padding: 8px 6px;
    border-radius: 3px;
  }

.myDetailTable form select {
    border: 1px solid #ddd;
    width: 100%;
    padding: 8px 6px;
    border-radius: 3px;
  }

.DetailTextarea{
    border: 1px solid #ddd;
    width: 100%;
    height: fit-content;
    padding: 8px 6px;
    border-radius: 3px;
    white-space: pre-line;
    word-break: break-word;
}

  .myDetailTable .rentalInput {
    border: 1px solid #ddd;
    width: 44%;
    padding: 8px 6px;
    border-radius: 3px;
    border-style: none;
    text-overflow: clip;
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
    margin: 20px 5px 0;
    font-size: 15px;
    padding: 10px 20px;
    border-radius: 3px;
    font-weight: 100;
  }

  .greyBtnMPID {
    border: #999;
    background-color: #999;
    color: #fff;
    font-weight: 100;
    margin: 20px 5px 0;
    font-size: 15px;
    padding: 10px 20px;
    border-radius: 3px;
    font-weight: 100;
  }
  
  .redBtnMPID {
    border: rgb(196, 98, 98);
    background-color: rgb(196, 98, 98);
    color: #fff;
    font-weight: 100;
    margin: 20px 5px 0;
    font-size: 15px;
    padding: 10px 20px;
    border-radius: 3px;
    font-weight: 100;
  }

/* 대충 이미지 보여주기 */

.myDetailImage {
    float: left;
    width: fit-content;
    height: fit-content;
    // padding-left: 100px;
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

.ChoiseFile{
    -webkit-box-align: center;
    align-items: center;
    display: grid;
    width: fit-content;
    height: fit-content;
    float: left;
    // padding-left: 100px;
}
`

export default MyPageItemDetail;