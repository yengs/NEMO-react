import axios from "axios";
import { useCallback, useEffect, useState } from "react";
// import { Route } from "react-router-dom";
// import "./MyPageItemDetail.css";
import { ko } from 'date-fns/esm/locale';
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import addImage from "../img/review-add-img.png";
// import Shirt from '../img/shirt.jpg';

function MyPageItemDetail({ match, location, history }) {
    const { itemNum } = match.params;

    const [data, setData] = useState({});
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDetail, setItemDetail] = useState('');
    const [itemMaincategory, setItemMaincategory] = useState('');
    const [itemSubcategory, setItemSubcategory] = useState('');
    const [itemDeposit, setItemDeposit] = useState('');
    const [itemWeather, setItemWeather] = useState('');
    const [itemTopsize, setItemTopsize] = useState('');
    const [itemBottomsize, setItemBottomsize] = useState('');
    const [itemEtcsize, setItemEtcsize] = useState('');
    const [itemRentalstart, setItemRentalstart] = useState('');
    const [itemRentalend, setItemRentalend] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/detail/${itemNum}`)
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
            setStartDate(new Date(response.data.itemRentalstart));
            setEndDate(new Date(response.data.itemRentalend));
            })
            .catch(error => { console.log(error); });
    }, []);


    var now = new Date();
    const [startDate, setStartDate] = useState(now.setDate(now.getDate() + 1));
    const [endDate, setEndDate] = useState(now.setDate(now.getDate() + 1));


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
    const handlerChangefiles = (e) => {
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
                    alert("??????????????? ?????????????????????.");
                    history.goBack();
                } else {
                    alert("????????? ??????????????????.");
                    return;
                }
            })
            .catch(error => console.log(error));
    };
    const handlerClickUpdate = () => {

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({
            'itemName': itemName, 'itemPrice': itemPrice, 'itemDetail': itemDetail
            , 'itemMaincategory': itemMaincategory, 'itemSubcategory': itemSubcategory,
            'itemDeposit': itemDeposit, 'itemWeather': itemWeather,
            'itemTopsize': itemTopsize, 'itemBottomsize': itemBottomsize,
            'itemEtcsize': itemEtcsize, 'itemRentalstart': startDate,
            'itemRentalend': endDate
        })], {
            type: "application/json"
        }));
        formData.append("files", files);

        if(startDate > endDate){
            alert("?????? ??????????????? ??????????????????.")
        }else{
        axios.put(`http://localhost:8080/api/item/${itemNum}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(itemRentalstart);
                    console.log(itemRentalend);
                    console.log(startDate);
                    console.log(endDate);
                    alert("??????????????? ?????????????????????.");
                    history.goBack();

                } else {
                    alert("????????? ??????????????????.");
                    return;
                }
            })
            .catch(error => console.log(error));
    };
}

    const [showCom, setShowCom] = useState(false);
    const showComment = () => {
        setShowCom(true)
    }

    const hideComment = () => {
        setShowCom(false)
    }

    const handleImgError = (e) => {
        e.target.src = '../../../noimage/noimage.gif';
    }


    return (
        <MyPageItemDetailContainer style={{ width: 'calc(100% - 230px)', height: '100%' }}>
            <div className="mypageInnerPage myDetailPage">
                <h3>??? ?????? ????????????</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className="ChoiseFile">
                        <AppStyle style={{ marginTop: "11px" }}>
                            <label htmlFor="item_review_input" className="item_review_input">
                                {imageSrc == '' ?
                                    <div className="itemImg">
                                        <img className="previewImg" src={`../../files/${data.files}`} onMouseEnter={showComment} onError={handleImgError}/>
                                        <div className={"commentBox" + (showCom ? ' showCom' : '')} onMouseEnter={showComment} onMouseOut={hideComment}>
                                            ????????? ????????? ????????????<br />??????????????????.
                                        </div>
                                    </div>
                                    : <div className="myDetailImage">
                                        {imageSrc && <img src={imageSrc} alt="preview-img" className="myDetailImageImg" />} </div>
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


                    </div>

                    <div className="myDetailTable">
                        <form method="post" id="frm" name="frm">
                            <table style={{ width: '550px' }}>
                                <colgroup>
                                    <col width="22%" />
                                    <col />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="row">?????????</th>
                                        <td><input type="text" value={itemName} onChange={handlerChangeName} maxlength="25"/></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">???????????? ??????</th>
                                        <td><select type="text" value={itemWeather} onChange={handlerChangeItemWeather}>
                                            <option value="???">???</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">?????????</th>
                                        <td><select type="text" value={itemMaincategory} onChange={handlerChangeItemMaincategory}>
                                            <option value="??????">??????</option>
                                            <option value="??????">??????</option>
                                            <option value="?????????">?????????</option>
                                            <option value="?????????">?????????</option>
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">?????????</th>
                                        <td>
                                            {
                                                (function () {
                                                    if (itemMaincategory === "??????") {
                                                        return <select type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory}>
                                                            <option value="??????">??????</option>
                                                            <option value="??????">??????</option>
                                                            <option value="??????">??????</option>
                                                            <option value="??????">??????</option>
                                                            <option value="????????????">????????????</option>

                                                        </select>;
                                                    }
                                                    else if (itemMaincategory === "??????") {
                                                        return <select type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory}>
                                                            <option value="??????">??????</option>
                                                            <option value="??????">??????</option>
                                                            <option value="?????????">?????????</option>
                                                            <option value="?????????">?????????</option>

                                                        </select>;
                                                    }

                                                    else if (itemMaincategory === "?????????") {
                                                        return <select type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory}>
                                                            <option value="??????">??????</option>
                                                            <option value="??????">??????</option>
                                                            <option value="??????">??????</option>
                                                            <option value="??????">??????</option>
                                                            <option value="????????????">????????????</option>
                                                            <option value="????????????">????????????</option>

                                                        </select>;
                                                    }
                                                    else {
                                                        return <select type="text" value={itemSubcategory} onChange={handlerChangeItemSubcategory}>
                                                            <option value="???">???</option>
                                                            <option value="??????">??????</option>
                                                            <option value="??????">??????</option>
                                                        </select>;
                                                    }
                                                })()
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">??????</th>
                                        <td><input type="text" value={itemPrice} onChange={handlerChangePrice} /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">?????????</th>
                                        <td><input type="text" value={itemDeposit} onChange={handlerChangeItemDeposit} /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">?????????</th>
                                        <td>
                                            {
                                                (function () {
                                                    if (itemMaincategory === "??????") {
                                                        return <select type="text" value={itemTopsize} onChange={handlerChangeItemTopsize}>
                                                            <option value="44??????">44??????</option>
                                                            <option value="55">55</option>
                                                            <option value="66">66</option>
                                                            <option value="77">77</option>
                                                            <option value="88??????">88??????</option>

                                                        </select>;
                                                    }
                                                    else if (itemMaincategory === "??????") {
                                                        return <select type="text" value={itemBottomsize} onChange={handlerChangeItemBottomsize}>
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
                                                        return <select type="text" value={itemEtcsize} onChange={handlerChangeItemEtcsize}>
                                                            <option value="S">S</option>
                                                            <option value="M">M</option>
                                                            <option value="L">L</option>
                                                        </select>;
                                                    }
                                                })()
                                            }</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">??????</th>
                                        <td style={{ height: 'auto' }}><textarea className="DetailTextarea" value={itemDetail} onChange={handlerChangeDetail} /></td>
                                        {/* <td><input type="textarea" className="DetailTextarea" value={itemDetail} onChange={handlerChangeDetail} /></td> */}
                                    </tr>

                                    <tr>
                                        <th scope="row">????????????</th>
                                        <td>
                                            <div className="rentalDiv">
                                                <DatePicker dateFormat="yyyy-MM-dd" className="startDate" selected={startDate} onChange={date => setStartDate(date)} selectStart startDate={startDate} endDate={endDate} locale={ko} minDate={now.setDate(now.getDate() -1)} />
                                                <span style={{ margin: '0 5px' }}>{' ~ '}</span>
                                                <DatePicker dateFormat="yyyy-MM-dd" className="endDate" selected={endDate} onChange={date => setEndDate(date)} selectEnd startDate={startDate} endDate={endDate} locale={ko} minDate={startDate} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>

                <div className="btnDivMPID">
                    <input type="button" id="list" className="greyBtnMPID" value="????????????" onClick={handlerClickList} />
                    <input type="button" id="edit" className="greenBtnMPID" value="????????????" onClick={handlerClickUpdate} />
                    <input type="button" id="delete" className="redBtnMPID" value="????????????" onClick={handlerClickDelete} />
                </div>
            </div>
        </MyPageItemDetailContainer>

    );
}

const AppStyle = styled.div`

    
    
    label {
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
        width: 280px;
        // height: fit-content;
        position: relative;
        margin-right: 10px;
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
        width: 100%;
        height: 100%;
        background-color: rgba(30,30,30,0.4);
        position: absolute;
        bottom: 0;
        z-index:1;
        visibility: hidden;
        color: #fff;
        text-align: center;
        font-size: 18px;
        padding-top: 50%;
        line-height: 25px;
  }

  .showCom {
    visibility: visible;
  }
  
  `;

const MyPageItemDetailContainer = styled.div`

.mypageInnerPage {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0;
}

.mypageInnerPage::-webkit-scrollbar {
    display: block;
    width: 6px !important;
    height: 6px !important;
    border-radius: 6px !important;
    background: rgba(200, 200, 200, 0.25) !important;
  }

  .mypageInnerPage::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15) !important;
    border-radius: 6px !important;
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
    // width: 300px;
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
    height: 150px;
    padding: 8px 6px;
    border-radius: 3px;
    white-space: pre-line;
    word-break: break-word;
    resize: none;
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
    // border-style: none;
    // background: #fff;
    border: none;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    width: 100%;
    padding: 7px 0;
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

/* ?????? ????????? ???????????? */

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

.myDetailImage .myDetailImageImg {
    width: 270px;
    height: auto;
}

.rentalDiv .react-datepicker__input-container{
    border: none;
    padding: 0;
    width: 100%;
    border-radius: 3px;
    border-style: none;
    display: block;

}

.rentalDiv .react-datepicker-wrapper {
    display: inline-block;
    padding: 0;
    border: 1px solid #ddd;
    width: 0;
    flex: 50%;
    text-align: -webkit-center;
    border-radius: 3px;
}

.rentalDiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align-last: center;
    // height: 55px;
    width: 100%;
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
    // float: left;
    // padding-left: 100px;
}
`

export default MyPageItemDetail;