import axios from "axios";
// import { useState } from "react";
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import "./ItemUpload.css";
import styled from "styled-components";
import addImage from "../img/review-add-img.png";

function ItemUpload({ history }) {

    const itemWriter = sessionStorage.getItem('memberId');

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
    const [files, setFiles] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    // const [itemRentalperiod, setitemRentalperiod] = useState('');


    const handlerChangeitemName = (e) => setitemName(e.target.value);
    const handlerChangeitemPrice = (e) => setitemPrice(e.target.value);
    const handlerChangeitemMaincategory = (e) => setitemMaincategory(e.target.value);
    const handlerChangeitemSubcategory = (e) => setitemSubcategory(e.target.value);
    const handlerChangeitemDeposit = (e) => setitemDeposit(e.target.value);
    const handlerChangeitemDetail = (e) => setiitemDetail(e.target.value);
    const handlerChangeitemWeather = (e) => setitemWeather(e.target.value);
    const handlerChangeitemTopsize = (e) => setitemTopsize(e.target.value);
    const handlerChangeitemBottomsize = (e) => setitemBottomsize(e.target.value);
    const handlerChangeitemEtcsize = (e) => setitemEtcsize(e.target.value);
    const handlerChangefiles = (e) => {
        setFiles(e.target.files[0]);
        encodeFileToBase64(e.target.files[0]);
    }

    // const handlerChangeitemRentalperiod=(e) => setitemRentalperiod(e.target.value);


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
    

    var now = new Date();
    const [startDate, setStartDate] = useState(now.setDate(now.getDate() + 1));
    const [endDate, setEndDate] = useState(now.setDate(now.getDate() + 1));

    const handlerClickGoback = () => history.goBack();

    const handlerClickSubmit = (e) => {
        if(itemName.trim() == ''){
            alert("???????????? ??????????????????.")
        }else if(itemMaincategory.trim() == ''){
            alert("?????? ???????????? ??????????????????.")
        }else if(itemSubcategory.trim() == ''){
            alert("?????? ???????????? ??????????????????.")
        }else if(itemWeather.trim() == ''){
            alert("???????????? ????????? ??????????????????.")
        }else if(itemTopsize.trim() == '' && itemBottomsize.trim() == '' && itemEtcsize.trim() == '' ){
            alert("???????????? ??????????????????.")
        }else if(itemPrice.trim() == ''){
            alert("????????? ????????? ?????????????????? ??????????????????.")
        }else if(itemDeposit.trim() == ''){
            alert("???????????? ????????? ?????????????????? ??????????????????.")
        }else if(itemPrice > 2147483647 || itemDeposit > 2147483647){
            alert("????????? ?????? ?????????.")
        }else if(itemDetail.trim() == ''){
            alert("??????????????? ??????????????????.")
        }else{
        e.preventDefault();

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({
            "itemName": itemName, "itemPrice": itemPrice, "itemWriter": itemWriter, "itemMaincategory": itemMaincategory, "itemSubcategory": itemSubcategory, "itemDeposit": itemDeposit,
            "itemDetail": itemDetail, "itemWeather": itemWeather, "itemTopsize": itemTopsize, "itemBottomsize": itemBottomsize,
            "itemEtcsize": itemEtcsize, "itemRentalstart": startDate, "itemRentalend": endDate
        })], {
            type: "application/json"
        }));
        // formData.append("files", new Blob(files, { type: "image/*" }));
        formData.append("files", files);



        axios.post('http://localhost:8080/api/item',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    alert("??????????????? ?????????????????????.");
                    window.location.href = `/item/cate/${itemMaincategory}`;
                } else {
                    alert("????????? ??????????????????.");
                    return;
                }
            })
            .catch(error => console.log(error));
            console.log("??????",files)
            if(files.trim() == ''){
                alert("????????? ??????????????????.")
            }

           
        }      
    };

    const [showCom, setShowCom] = useState(false);
    const showComment = () => {
        setShowCom(true)
    }

    const hideComment = () => {
        setShowCom(false)
    }



    return (
        <ItemUploadContainer>
            <div className="itemcontainer">
                <h2>?????? ??????</h2>
                <hr />
                <form id="frm" name="frm">
                    <AppStyle style={{marginTop: "11px"}}>
                        <label htmlFor="item_review_input" className="item_review_input">
                            {
                                imageSrc ?
                                    <div className="itemImg">
                                        <img src={imageSrc} alt="preview-img" className="previewImg" onMouseEnter={showComment} />
                                        <div className={"commentBox" + (showCom ? ' showCom' : '')} onMouseEnter={showComment} onMouseOut={hideComment}>
                                            ????????? ????????? ????????????<br/>??????????????????.
                                        </div>
                                    </div>
                                    :
                                    <div className="itemImg">
                                        <img src={addImage} alt="ReviewAddImg" className="uploadImg" />
                                    </div>
                            }
                        </label>
                        <input
                            type="file"
                            id="item_review_input"
                            className="image_inputType_file"
                            name="file"
                            accept=".jpg, .png"
                            multiple
                            onChange={handlerChangefiles}
                        />
                    </AppStyle>
                    <table className="board_detail">
                        <tr>
                            <td>?????????</td>
                            <td><input type="text" id="itemName" name="itemName" value={itemName} onChange={handlerChangeitemName} maxlength="25"/></td>
                        </tr>

                        <tr>
                            <td>?????? ?????????</td>
                            <td> <select type="text" id="itemMaincategory" name="itemMaincategory" value={itemMaincategory} onChange={handlerChangeitemMaincategory} className="itemInfoSelect" required>
                                <option value="">----------------??????----------------</option>
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
                                (function () {
                                    if (itemMaincategory === "??????") {
                                        return <select type="text" id="itemSubcategory" name="itemSubcategory" value={itemSubcategory} onChange={handlerChangeitemSubcategory} className="itemInfoSelect" required>
                                            <option value="">----------------??????----------------</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="????????????">????????????</option>

                                        </select>;
                                    }
                                    else if (itemMaincategory === "??????") {
                                        return <select type="text" id="itemSubcategory" name="itemSubcategory" value={itemSubcategory} onChange={handlerChangeitemSubcategory} className="itemInfoSelect" required>
                                            <option value="">----------------??????----------------</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="?????????">?????????</option>
                                            <option value="?????????">?????????</option>

                                        </select>;
                                    }

                                    else if (itemMaincategory === "?????????") {
                                        return <select type="text" id="itemSubcategory" name="itemSubcategory" value={itemSubcategory} onChange={handlerChangeitemSubcategory} className="itemInfoSelect">
                                            <option value="">----------------??????----------------</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="????????????">????????????</option>
                                            <option value="????????????">????????????</option>

                                        </select>;
                                    }
                                    else {
                                        return <select type="text" id="itemSubcategory" name="itemSubcategory" value={itemSubcategory} onChange={handlerChangeitemSubcategory} className="itemInfoSelect">
                                            <option value="">----------------??????----------------</option>
                                            <option value="???">???</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                        </select>;
                                    }
                                })()
                            }</td>
                        </tr>

                        <tr>
                            <td>???????????? ??????</td>
                            {/* <td><input type="text" id="itemWeather" name="itemWeather" value={itemWeather} onChange={handlerChangeitemWeather} /></td> */}
                            <td>
                                <select type="text" required id="itemWeather" name="itemWeather" value={itemWeather} onChange={handlerChangeitemWeather} className="itemInfoSelect">
                                    <option value="">----------------??????----------------</option>
                                    <option value="???">???</option>
                                    <option value="??????">??????</option>
                                    <option value="??????">??????</option>
                                    <option value="??????">??????</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>?????????</td>
                            <td>
                                {
                                    (function () {
                                        if (itemMaincategory === "??????") {
                                            return <select type="text" required id="itemTopsize" name="itemTopsize" value={itemTopsize} onChange={handlerChangeitemTopsize} className="itemInfoSelect">
                                                <option value="">----------------??????----------------</option>
                                                <option value="44??????">44??????</option>
                                                <option value="55">55</option>
                                                <option value="66">66</option>
                                                <option value="77">77</option>
                                                <option value="88??????">88??????</option>

                                            </select>;
                                        }
                                        else if (itemMaincategory === "??????") {
                                            return <select type="text" required id="itemBottomsize" name="itemBottomsize" value={itemBottomsize} onChange={handlerChangeitemBottomsize} className="itemInfoSelect">
                                                <option value="">----------------??????----------------</option>
                                                <option value="25??????">25??????</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33??????">33??????</option>
                                            </select>;
                                        }
                                        else {
                                            return <select type="text" required id="itemEtcsize" name="itemEtcsize" value={itemEtcsize} onChange={handlerChangeitemEtcsize} className="itemInfoSelect">
                                                <option value="">----------------??????----------------</option>
                                                <option value="Free">Free</option>
                                                <option value="XXS">XXS</option>
                                                <option value="XS">XS</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XS">XS</option>
                                                <option value="XXL">XXL</option>
                                            </select>;
                                        }
                                    })()
                                }


                            </td>
                        </tr>

                        <tr>
                            <td>??????</td>
                            <td><input type="number" id="itemPrice" name="itemPrice" value={itemPrice} onChange={handlerChangeitemPrice} required /></td>
                        </tr>
                        <tr>
                            <td>?????????</td>
                            <td><input type="number" required id="itemDeposit" name="itemDeposit" value={itemDeposit} onChange={handlerChangeitemDeposit} /></td>
                        </tr>

                        {/* <tr>
                            <td>?????????</td>
                            
                            <td> <input className="form-control-image" type = "file" name="file" multiple onChange={handlerChangefiles}/></td>
                        </tr> */}


                        <tr>
                            <td>???????????????</td>
                            <td><DatePicker dateFormat="yyyy-MM-dd" className="startDate" selected={startDate} onChange={date => {setStartDate(date) ;setEndDate(date)}} selectStart startDate={startDate} endDate={endDate} locale={ko} minDate={now.setDate(now.getDate() -1)} required /> </td>
                        </tr>
                        <tr>
                            <td>???????????????</td>
                            <td><DatePicker dateFormat="yyyy-MM-dd" className="endDate" selected={endDate} onChange={date => setEndDate(date)} selectEnd startDate={startDate} endDate={endDate} locale={ko} minDate={startDate} required /> </td>
                        </tr>

                        <tr>
                            <td>????????????</td>
                            <td><textarea type="textarea" id="itemDetail" name="itemDetail" value={itemDetail} onChange={handlerChangeitemDetail} style={{ resize: "none", width: "100%", height: "200px", border: "1px solid #ddd", padding: "10px", borderRadius: "3px" }} /></td>
                        </tr>



                    </table>
                </form>
                <div className="btnWrapItem">
                    <input type="submit" id="submit" value="??????" className="greenBtn btn" onClick={handlerClickSubmit} />
                    <input type="button" id="cancle" value="??????" className="grayBtn btn" onClick={handlerClickGoback} />
                </div>
            </div>

        </ItemUploadContainer>
    );
}

const AppStyle = styled.div`

    
    
    label {
        width: 270px;
        height: 270px;
      display: inline-block;
      font-size: inherit;
      line-height: normal;
      vertical-align: middle;
      cursor: pointer;
    }
    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    .itemImg {
        width: 100%;
        height: 100%;
        position: relative;
    }
    
    
    .uploadImg {
        width: 100%;
        height: 100%;
    }
    
    .previewImg {
        width: 100%;
        height: 100%;
    }
    
    .commentBox {
        width: 270px;
        height: 270px;
        background-color: rgba(30,30,30,0.4);
        position: absolute;
        bottom: 0;
        z-index:1;
        visibility: hidden;
        color: #fff;
        text-align: center;
        font-size: 18px;
        padding-top: 110px;
        line-height: 25px;
  }

  .showCom {
    visibility: visible;
  }
  
  `;
  
  const ItemUploadContainer = styled.div`

  .itemcontainer form tr>td>input {
    width: 100%;
  }
  
  .itemcontainer .itemInfoSelect, .react-datepicker__input-container {
    border: 1px solid #ddd;
    width: 100%;
    padding: 8px 10px;
    border-radius: 3px;
  }

  .react-datepicker__input-container {
    text-align: left;
  }

  .startDate, .endDate {
    border: none;
    outline: none;
    cursor: pointer;
  }

  .board_detail {
    width: 600px;
  }

  .board_detail td:first-child {
    width: 8%;
    text-align: right;
    padding-right: 0;
  }

`

export default ItemUpload;