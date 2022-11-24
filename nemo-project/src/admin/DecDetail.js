import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DecDetail.css';
import styled from "styled-components";

const styles = {
    adminInnerPage: {  
        borderRadius: 20, 
        maxWidth: "1200px",
        padding: "10px 10px 30px 10px", 
        margin: "60px auto auto auto",
        backgroundColor: "rgb(248, 248, 248)",
        border: "2px solid #bbb"
    }, 
    form: {
        position: "relative"
    }, 
    table: {
        minWidth: "100%",
        borderSpacing: 0, 
        borderCollapse: "collapse", 
    }
};

function DecDetail({history, match}){

    const handleImgError = (e) => {
        e.target.src = '../../../noimage/noimage.gif';
    }

    const [data, setData] = useState([]);
    const [singoNum, setSingoNum] = useState('');

     // 신고 상세보기
     useEffect(() => {
        axios.get(`http://localhost:8080/api/dec/detail/${match.params.singoNum}`)
          .then(response => {
            console.log(response);
            if (response.status === 200){
                setData(response.data);
                setSingoNum(response.data.singoNum);
            }else {
              alert("신고 정보를 불러올 수 없습니다.");
              return;
            }
          })
          .catch(error => console.log(error));
      }, []);

    // 목록으로
    const decList = () => history.goBack();

    const singoInfo = {
        "singoNum" : match.params.singoNum
    }

    // 접수하기
    const confirmWarn = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8080/api/dec/detail/${match.params.singoNum}`, singoInfo)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
            console.log(singoInfo);
            alert("정상적으로 접수되었습니다.");
            history.goBack();
        } else {
            alert("접수 실패했습니다.");
            return;
        }
      })
      .catch(error => console.log(error));
    }

    // 취소하기
    const deleteWarn = () => {
        axios.delete(`http://localhost:8080/api/dec/detail/${match.params.singoNum}`)
            .then(response => {
                console.log(response);
                if(response.status == 200) {
                    alert("정상적으로 삭제되었습니다.");
                    console.log(match.params.singoNum);
                    history.goBack();
                }else{
                    alert("삭제에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    }
    
    return(
        <DecDetailContainer style={{ padding: "0 190px" }}>
        <div style={styles.adminInnerPage}>
            <h3 className='h3h3'>신고 상세</h3>
            {/* <a className='greyDec' onclick={decList}>목록으로</a> */}
            {/* <input type="button" id="list" className="greyDec" value="목록으로" onClick={decList} /> */}
            {
                        data && data.map(data => (
            <div className="tablePlusForm">
                    <div className="imageDiv">
                        <img className="itemImg" src={`../../files_singo/${data.singoImage}`} onError={handleImgError} />
                    </div>
                    <div className="tableform">
                    
                        <div className='DecCon'>
                            <h2 className="itemName">{data.itemName}</h2>
                            <h3 className="itemPrice">신고 사유 <span>{"[ "}{data.singoReason}{" ]"}</span></h3>
                            <p className="itemDeposit">신고 대상자 ID :<span>{data.singoPisingoja}
                            　/　신고 작성자 ID : {data.singoWriter}</span></p>
                            {/* <div style={{ borderBottom: "1px solid #ddd" }}></div> */}
                            {/* <p>신고 작성자 ID : {data.singoWriter}</p> */}
                            <p className="itemDetailContent" style={{color: "#666"}}>{data.singoContent}</p>
                        </div>
                         
                    </div>
                    
                </div> 
                ))
            }
                <div className="btnDivDec">
                    <input type="button" id="list" className="greyDec" value="목록으로" onClick={decList} />
                    <input type="button" id="edit"   className="redBtnDec" value="접수하기" onClick={confirmWarn} />
                    <input type="button" id="delete" className="grayBtnDec" value="삭제하기" onClick={deleteWarn} />
                </div>      
        </div>  
        
        </DecDetailContainer>
    );
}

export default DecDetail;


const DecDetailContainer = styled.div`

.h3h3{
    margin-left : 20px;
}

.DecCon{
    // margin-top : 50px;
}

.itemImggg{
    width: 100% !important;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}


.myitem{
    margin-left:33px;
    display:flex;
    box-sizing: border-box;
    text-align: center;
}
.myitem1{
    display:inline-block;
    
}
.middleDiv {
    // justify-content: center;
    // align-items: center;
    // display: flex;
    height: auto;
    width: 100%;
    margin-top: 50px;
    background-color: rgba(100,165,127,0.1);
    padding: 25px 30px;
}

.writerWrap {
    display:inline-flex;
}

.writerDiv {
    display: inline-block;
    margin-right: 10px;
}

.writerDiv h3 {
    margin: 0 0 10px 0;
    text-align: left;
}

.cleanDiv {
    justify-content: right;
    align-self: center;
    text-align: -webkit-center;
    margin: 0 50px 20px 5px;
    display: inline-block;
    font-size: 15px;
}

.middleDiv .memberImg {
    background-color: rgb(219, 219, 219);
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.ReviewItemImage2 .bookingitemImg{
    width: 100px;
    height: 100px;
}

.reviewDiv {
    margin-top: 80px;
}

.reviewDiv h3 {
    font-size: 21px;
    margin-bottom: 18px;
}

.reviewDiv .reviewTable th{
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #bbb;
    padding: 10px 5px;
    text-align: center;
}

.reviewDiv .reviewTable tr{
    border-bottom: 1px solid #ccc;
    padding: 10px 5px;
    text-align: center;
}

.DetailContainer p {
    font-size: 15px;
    margin-bottom: 0.4em;
}

a.goList {
    font-weight: bold;
    cursor: pointer;
}

.Breadcrumb {
    // margin-right: 80%;
    font-size: 15px;
    font-weight: 300;
    cursor: pointer;
    margin: 0.4em 0;
    color: #666;
}

p.cate {
    margin-right: 80%;
    font-size: medium;
}

h4 {
    margin-bottom: 7px;
    font-size: medium;
    text-align: left;
}

.middleDiv .input {
    font-weight: 100;
    margin: 20px 15px 0;
    font-size: 15px;
    padding: 10px 30px;
    border-radius: 3px;
}

.ItemgreenBtn {
    padding: 10px 10px;
    margin: 0px 3px 0;
    text-align: center;
    font-size: 15px;
    border-radius: 3px;

    border: rgb(100, 165, 127);
    background-color: rgb(100, 165, 127);
    color: #fff;
}

.buttonDiv {
    text-align: right;
    margin-bottom: 0;
}

.writeDate {
    flex-direction: row-reverse;
}

.DetailContainer form {
    display: inline;
    justify-content: center;
    align-content: center;
}

.DetailContainer .reviewCate {
    text-align: center;
    height: 30px;
    border-bottom: 1px solid rgb(219, 219, 219);
}

.reviewDiv table {
    width: 100%;
    height: max-content;
    border-top: 1px solid rgb(219, 219, 219);
    border-collapse: collapse;
}

.reviewDiv tr,
th,
td {
    align-content: center;
    width: auto;
    /* text-align: center; */
    padding: 10px;
    vertical-align: middle;
}

td.reviewImg,
.reviewCtns,
.reviewClean {
    text-align: left;
}

.reviewDiv .reviewClean,
.leftside {
    border-bottom: 1px solid rgb(219, 219, 219);
}

.reviewDiv .leftside {
    text-align: center;
}

.reviewDiv .ReviewContent {
    text-align: left;
}

.DetailContainer form tr>td>input {
    border: 1px solid #ddd;
    width: 95%;
    padding: 8px 6px;
    border-radius: 3px;
}

.clickList,
.p {
    position: relative;
    /* top: 10px; */
    // right: 30px;
    text-align: right;
}

.clickList {
    border-bottom: 1px solid #aaa;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.DetailContainer {
    max-width: 1200px;
    margin: 0 auto;
}

.DetailContainer h2 {
    position: relative;
    // left: 30px;
    text-align: left;
}

.tablePlusForm{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:90px;
}

.tableform {
    width: 650px;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 400px;
}

.tableform table {
    width: 100%;
}

.tableform table th {
    text-align: right;
    padding: 15px 10px 15px 0;
}

.tableform table td {
    text-align: left;
    padding: 15px 0 15px 10px;
}

.tableform .itemName {
    font-size: 28px;
    margin: 0;
}

.tableform .itemPrice {
    font-size: 22px;
    margin: 7px 0 0 0;
}

.tableform .itemDeposit {
    font-size: 18px;
    font-weight: 700;
    color: #666;
}

.tableform .itemDeposit span {
    margin: 0 1px 0 10px;
}

.tableform .itemPrice span {
    color: rgb(100,165,127);
    margin-right: 3px;
}

.tableform .itemSize {
    margin-top: 30px;
    font-size: 18px;
}

.tableform .itemSize span {
    font-weight: 700;
    margin-left: 7px;
}

.tableform .itemRentalPeriod {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 500;
}

.tableform .itemRentalPeriod span {
    margin-left: 10px;
    font-weight: 600;
}

.tableform .itemDetailContent {
    margin-top: 25px;
    font-size; 17px;
    line-height: 23px;
    overflow-y: scroll;
    height: 285px;
    white-space: pre-wrap;
    word-break: break-all;
    border-radius: 5px;
    padding: 15px;
    background-color: rgba(100,165,127,0.1)
}


.DetailContainer form {
    width: 500px;
    margin: auto;
    text-align: -webkit-center;
}


a.ItemReviewList {
    padding-left: 95%;
    text-decoration: none;
}

.tablePlusForm .itemImg {
    background-color: rgb(219, 219, 219);
    max-width: 350px;
    height: fit-content;
    max-height: 370px;
    // margin-left : 150px;
    // margin-top : 50px;
}

/* -- clean */

.item-detail-clean {
    text-align: left;
}

.item-detail-Img {
    margin-top: 7px;
    width: 140px;
    margin-bottom: 3px;
}

`