import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import addImage from "../img/review-add-img.png";
import styled from "styled-components";

function Singo({ itemWriter, setSingo }) {

  const history = useHistory();

  const [singoReason, setSingoReason] = useState('');
  const [singoContent, setSingoContent] = useState('');
  const [singoImage, setSingoImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const singoWriter = sessionStorage.getItem('memberId');
  const singoDate = new Date();

  const Pisingoja = itemWriter;

  const handlerChangeReason = (e) => setSingoReason(e.target.value);
  const handlerChangeContent = (e) => setSingoContent(e.target.value);
  const handlerChangefiles =(e) => {
    setSingoImage(e.target.files[0]);
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

  const singoInfo = {
    "singoPisingoja" : Pisingoja,
    "singoReason" : singoReason,
    "singoContent" : singoContent,
    "singoWriter" : singoWriter,
    "singoDate": singoDate
  }

  const takeDec = (e) => {
    e.preventDefault();

    const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({
        "singoPisingoja" : Pisingoja,
        "singoReason" : singoReason,
        "singoContent" : singoContent,
        "singoWriter" : singoWriter,
        "singoDate": singoDate})], {
            type: "application/json"
        }));
        // formData.append("files", new Blob(files, { type: "image/*" }));
        formData.append("singoImage", singoImage);




        axios.post('http://localhost:8080/api/singo/take', 
            formData, 
            { headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
        .then(response => {
            if (response.status === 200) {
                alert("정상적으로 등록되었습니다.");
                setSingo(false);
            } else {
                alert("등록에 실패했습니다.");
                return;
            }
        })
        .catch(error => console.log(error));
    }

  const goBack = (e) => {
    console.log(`/userstoreinfo/${itemWriter}`)
    e.preventDefault();
    setSingo(false);
  }

  return (
    <SingoContainer style={{ width: 'calc(100% - 230px)', height: '100%' }}>
      <div className="mypageInnerPage">
        <div className="regiUserItemList">
          <h3 className="pageTitle">신고하기</h3>
          <div className="memberPage2 container loginForm2">

            <form>
              <div className="inputTable">
                <table>
                  <tbody>
                    {/* <tr>
                      신고 대상자 아이디 {"["} {itemWriter} {"]"}
                    </tr> */}
                    <tr>
                      <td>사진첨부</td>
                    </tr>
                    <tr>
                      <td>
                        <AppStyle>
                          <label htmlFor="item_review_input">
                            <div className="btnStart">
                            {imageSrc == '' ?
                        <img src={addImage} alt="ReviewAddImg" />
                        : <div className="mySingoImage"> 
                        {imageSrc && <img src={imageSrc} alt="preview-img" />} </div>
                    }
                             
                            </div>
                          </label>
                          <input
                            type="file"
                            id="item_review_input"
                            className="image_inputType_file"
                            accept=".jpg, .png"
                            multiple onChange={handlerChangefiles}
                          />
                        </AppStyle>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        <br />
                        신고이유
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <select onChange={handlerChangeReason}>
                          <option>선택</option>
                          <option>미반환</option>
                          <option>사기 행위</option>
                          <option>물품 훼손(사진 첨부 필수)</option>
                          <option>욕설 또는 성희롱(연애 목적 대화 시도)</option>
                          <option>광고 (상점 및 타사이트 홍보, 상품도배)</option>
                          <option>기타(신고내용에 사유를 기재해주세요.)</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <br />
                        신고내용
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <textarea className="singobox" onChange={handlerChangeContent}></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="btnWrap">
                          <input type="submit" className="redBtn2 btn" value="신고하기" onClick={takeDec} />
                          <input type="submit" className="grayBtn2 btn" value="취소" onClick={goBack} />
                        </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>



            </form>
          </div>


        </div>
      </div>
    </SingoContainer>
  );
}

const SingoContainer = styled.div`
.mypageInnerPage {
    width: 100%;
    height: 100%;
}

.regiUserItemList {
    width: 100%;
    height: 100%;
}

.memberPage2.container.loginForm2 {
    width: 100%;
    height: 90%;
}

.memberPage2 form {
    width: 100%;
    height: 100%;
}

.myPageWrap {
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 55px auto;
    display: flex;
}

.myMenuWrap {
    width: 230px;
    background-color: rgba(88, 145, 112, 0.253);
    padding: 50px 35px;
    box-sizing: border-box;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.myMenuWrap .memberImg, .myMenuWrap .cleanG, .myMenuWrap .myMenuWrap {
    margin: auto;
}

.myMenuWrap .cleanG {
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
}

.myMenuWrap .memberImg {
    background-color: rgb(255, 255, 255);
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.myMenuWrap .menu {
    height: calc(100% - 160px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.myMenuWrap .menu ul {
    margin: 50px 0 0 0;
    padding: 0;
    width: 100%;
}

.myMenuWrap .menu li {
    list-style: none;
    padding: 10px 0;
    font-size: 15px;
    cursor: pointer;
}

.myMenuWrap .menu li a {
    color: #333;
    font-weight: 100;
    text-decoration: none;
}

.warnBtn {
    border: none;
    background-color: transparent;
    text-align: center;
    font-size: 13px;
    color: #666;
    text-decoration: underline;
    cursor: pointer;
}



/* ----------------------------- */
/* 마이페이지 내의 페이지 */

.mypageInnerPage {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.mypageInnerPage .pageTitle {
    padding: 0;
    margin: 0 0 10px 0;
}

/* 다른사람이 보는 마이페이지 */
.regiUserItemWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.prev {
    font-size: 100px;
    color: #666;
    cursor: pointer;
}

.back {
    color: #666;
    font-size: 100px;
    cursor: pointer;
}

.regiUserItemWrap .regiUserItem {
    width: 17%;
    height: 210px;
    border: 1px solid #ddd;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
}

.userReviewListAboutStoreWrap {
    margin-top: 58px;
}

.userReviewListAboutStoreWrap .userReviewListAboutStore {
    width: 100%;
    height: 100%;
    border-spacing: 0;
}

.userReviewListAboutStoreWrap .userReviewListAboutStore thead th {
    border-bottom: 1px solid #bbb;
    padding: 10px 5px;
}

.userReviewListAboutStoreWrap .userReviewListAboutStore tbody td {
    border-bottom: 1px solid #ddd;
    padding: 7px 3px;
    font-size: 15px;
}

.userReviewListAboutStoreWrap .userReviewListAboutStore tbody .ReviewItemImg, .userReviewListAboutStoreWrap .userReviewListAboutStore tbody .ReviewContent {
    border: none;
}
.userReviewListAboutStoreWrap .userReviewListAboutStore tbody .ReviewContent{
    padding: 0;
}

.ReviewItemImageOrigin {
    width: 10%;
}

.ReviewItemImageOrigin div {
    width: 100%;
    height: 100%;
    /* border: 1px solid #000; */
    background-size: cover;
    background-position: center;
}

.ReviewItemNameOrigin {
    width: 15%;
    text-align: center;
}

.ReviewWriter {
    width: 20%;
    text-align: center;
}

.ReviewItemImg, .ReviewContent, .satisfing {
    width: 45%;
}

.ReviewItemImg div {
    width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
}

.ReviewContent {
    font-size: 13px !important;
}

.satisfing div {
    width: 150px;
    font-size: 12px;
}

.memberPage2 {
    width: 900px;
    margin: 0px auto;
  }
  
  .memberPage2 .pageTitle h2 {
    font-size: 2rem;
    font-weight: 300;
    text-align: center;
  }
  
  /* .memberPage2 .inputTable {
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
  } */
  
  .memberPage2 .inputTable table {
    width: 100%;
    border-spacing: 0;
    padding-top: 25px
  }
  
  .memberPage2 .inputTable table tr>td {
    padding-top: 5px;
    padding-bottom: 5px;
    /* border-top: 1px solid #ddd; */
  }
  
  .memberPage2 .inputTable table tr>td img {
    width: 90px;
    height: 90px;
  }

  .memberPage2 .inputTable table tr:first-child>td {
    border: none;
  }
  
  .memberPage2 .inputTable table tr>td:first-child {
    width: 25%;
    padding-left: 50px;
    font-size: 14px;
    color: #333;
  }
  
  .memberPage2 .inputTable table tr>td:nth-child(2) {
    width: 45%
  }
  
  .memberPage2 .inputTable table tr>td>input {
    border: 1px solid #ddd;
    width: 95%;
    padding: 8px 6px;
    border-radius: 3px;
  }
  
  .memberPage2 .inputTable table tr>.memberTableBtn>button {
    padding: 6px 15px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .memberPage2 .inputTable table .memberAddress select {
    border: 1px solid #ddd;
    padding: 8px 6px;
    border-radius: 3px;
    margin-right: 10px;
  }
  
  .memberPage2 .accept ul {
    padding: 0;
  }
  
  .memberPage2 .accept .wholeCheck {
    font-size: 16px;
    font-weight: 600;
  }
  
  .memberPage2 .accept .wholeCheck .wholeCheckInfo {
    font-size: 13px;
    color: #999;
    display: block;
    font-weight: 300;
    line-height: 18px;
    margin-top: 5px;
  }
  
  .memberPage2 .accept li {
    width: 100%;
    padding: 12px;
    margin: 3px 0;
    background-color: #eee;
    font-size: 15px;
    color: #555;inputTable
  }
  
  .memberPage2 .accept li:first-child {
    background-color: transparent;
  }
  
  .memberPage2 .btnWrap {
    width: 100%;
    text-align: center;
    padding-bottom: 0px;
    padding-top: 25px;
  }
  
  .loginForm2 {
    margin-top: 10px;
  }
  
  .loginForm2 form {
    height: 200px;
  }
  
  .loginForm2 form .inputTable {
    margin-bottom: 40px;
  }
  
  .loginForm2 form .inputTable tr td{
    border: none;
  }
  
  .loginForm2 form .inputTable tr:first-child td {
    padding-bottom: 0px !important;
    padding-top: 10px !important;
  }
  
  .loginForm2 form .inputTable tr:nth-child(2) td {
    padding-bottom: 0 !important;
    padding-top: 10px !important;
  }
  
  .loginForm2 form .inputTable .rememberId {
    padding-top: 0;
    padding-bottom: 10px;
    padding-left: 223px !important;
  }
  
  .loginForm2 form .inputTable .findMemberInfo {
    padding-top: 0;
    padding-bottom: 10px;
    padding-right: 60px;
    text-align: right;
  }
  
  .loginForm2 form .inputTable .findMemberInfo a {
    font-size: 13px;
    color: #999;
    padding: 0 5px;
  }
  
  .loginForm2 .btnWrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .loginForm2 .btnWrap a {
    margin: 0 25px;
  }
  
  .rememberId .rememberIdLabel {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  
  .rememberId .rememberIdLabel p {
    font-size: 13px;
    color: #666;
  }
  
  .loginBtn {
    height: 95px;
    width: 180px;
  }
  
  .googleLoginBtnLink {
    padding: 0 !important;
  }
  
  .googleLoginBtnLink .googleLoginBtn {
    width: 210px;
    height: 50px;
    background-size: cover;
    display: inline-block;
  }

  .redBtn2 {
    border: rgb(206, 60, 34);
    background-color: rgb(206, 60, 34);
    color: #fff;
    width: 125.95px;
    padding-left: 36px;
  }

  .grayBtn2 {
    border: rgb(85, 83, 83);
    background-color: rgb(85, 83, 83);
    color: #fff;
  }

  select {
    width: 826px; 
    padding: .8em .5em; 
    border: 1px solid #ddd;
    /* font-family: inherit;   */
    border-radius: 0px; 
    }

   .singobox{
    height: 200px;
    width: 826px;
    resize: none;
    border: 1px solid #ddd;
    padding: 8px;
   }
    
    



`

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
`;

export default Singo;