import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import "./reviewUpload.css";
import App from "../App";

function ReviewMore({ history, match }) {

    const { reviewWriter, reviewNum } = match.params;

    const [data, setData] = useState({});
    const [reviewFiles, setReviewFiles] = useState('');
    const [reviewContents, setReviewContents] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState('');

    // 후기 데이터 가져오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/myReview/${reviewWriter}/${reviewNum}`)
            .then(res => {
                console.log(res);
                setData(res.data);
                setReviewFiles(res.data.reviewFiles);
                setReviewContents(res.data.reviewContents);
                setReviewSatisfaction(res.data.reviewSatisfaction);
            })
            .catch(error => console.log(error));
    }, []);

    const detailList = () => history.goBack();    

    return (
        <AppStyle>
        <div className="reviewUpload">

            <div className='pageTitle'>
                <h3>후기 상세보기</h3>
            </div>
            <div className="itemDetailImg" >
                {data.reviewFiles == null ? <img className="DetailImg" src={'../../../noimage/no_image.gif'}/>:
                <img className="DetailImg"  src={`../../../files_review/${data.reviewFiles}`}/>
                }
                </div>
            <div className='moreContent'>
                <div className="moreNum">{reviewContents}</div>
            </div>
            <div className='satisfyingReview'>
                <span>{reviewWriter} 님이 평가한 상품 만족도는?</span>
                <input type="moreNum" value={`${reviewSatisfaction}%`} readOnly/>
            </div>
            <div className='btnWrap'>
                <input type="button" className='greenBtn btn' value="목록으로" onClick={detailList}/>
            </div>
        </div>
        </AppStyle>
    );

}



const AppStyle = styled.div`
 
.itemDetailImg {
    width: 270px;
    height: 270px;
    position: relative;
}

.DetailImg {
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

.satisfyingReview input[type="moreNum"] {
    border: 1px solid #ddd;
    padding: 5px 6px;
    border-radius: 5px;
    margin-left: 10px;
    font-size: 16px;
    color: #666;
    width: 98px;
    pointer-events : none;
}

.moreContent {
    width: 100%;
    height: auto;
    resize: none;
    overflow: hidden;
    white-space: pre-line;
    word-break: break-word;
    border-radius: 5px;
    border : 1px solid #ccc;
    padding: 30px 20px 30px 20px;
    font-size: 16px;
    margin-top: 35px;
    margin-bottom: 35px;
    color : #666;
    outline : none;
}

  
  `;
  


export default ReviewMore;