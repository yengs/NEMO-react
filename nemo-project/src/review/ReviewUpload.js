import axios from 'axios';
import { useState } from 'react';

// import Form from 'react-bootstrap/Form';

import styled from "styled-components";
import './reviewUpload.css'

import addImage from "../img/review-add-img.png";

const AppStyle = styled.div`
  img {
    max-width: 170px;
    max-height: 170px;
  }
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
    width: 170px;
    height: 170px;
    position: relative;
}

  .commentBox {
    width: 170px;
    height: 170px;
    background-color: rgba(30,30,30,0.4);
    position: absolute;
    bottom: 0;
    z-index:1;
    visibility: hidden;
    color: #fff;
    text-align: center;
    font-size: 15px;
    padding-top: 62px;
    line-height: 25px;
}

.showCom {
visibility: visible;
}
`;


export default function ReviewUpload({ history, match }) {

    const reviewWriter = sessionStorage.getItem('memberId');

    const { bookingNum } = match.params;
    const { bookingItemnum } = match.params;
    const { bookingItemwriter } = match.params;
    const { bookingItemfiles } = match.params;
    const { bookingItemname } = match.params;
    const { bookingItemprice } = match.params;

    const bookingNumm = bookingNum;
    const reviewProductIdx = bookingItemnum;
    const reviewId = bookingItemwriter;
    const reviewItemfiles = bookingItemfiles;
    const reviewItemname = bookingItemname;
    const reviewItemprice = bookingItemprice;

    // const [data, setData] = useState([]);

    const [reviewContents, setReviewContents] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState('');
    const [reviewFiles, setReviewFiles] = useState('');
    const [ReviewAddImg, setReviewAddImg] = useState('');

    const handlerChangeReviewContents = (e) => setReviewContents(e.target.value);
    const handlerChangeReviewSatisfaction = (e) => {
        if (e.target.value < 0 || e.target.value > 100) {
            return;
        }
        setReviewSatisfaction(e.target.value);
    }
    const handlerChangeReviewFiles = (e) => {
        setReviewFiles(e.target.files[0]);
        encodeFileBase64(e.target.files[0]);
    }

    const encodeFileBase64 = (fileBlob) => {
        const read = new FileReader();
        read.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            read.onload = () => {
                setReviewAddImg(read.result);
                resolve();
            };
        });
    };

    const handlerClickSubmit = (e) => {
        e.preventDefault();

        // 이미지 등록 
        const formData = new FormData();
        formData.append('reviewData', new Blob([JSON.stringify({ "reviewWriter": reviewWriter, "reviewContents": reviewContents, "reviewSatisfaction": reviewSatisfaction, "reviewProductIdx": reviewProductIdx, "reviewId": reviewId, "reviewItemfiles": reviewItemfiles, "reviewItemname": reviewItemname, "reviewItemprice": reviewItemprice })], {
            type: "application/json"
        }));
        formData.append("reviewFiles", reviewFiles);

        if (reviewContents.length > 20 && reviewSatisfaction != null) {
            axios.post(`http://localhost:8080/api/review/reviewWrite/${bookingNumm}`, formData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(response => {
                    if (response.status === 200) {
                        alert("정상적으로 등록되었습니다.");
                        history.push(`/mypage/review`);
                    }
                }).catch(error => { console.log(error); alert("등록에 실패했습니다."); });
        } else {
            alert("내용 20자 이상, 상품의 만족도를 입력했는지 확인해주세요.");
        }

    };

    const useConfirm = (message = "취소 ?", onConfirm, onCancel) => {
        if (!onConfirm || typeof onConfirm !== "function") {
            return;
        }
        if (onCancel && typeof onCancel !== "function") {
            return;
        }
        const confirmAction = () => {
            if (window.confirm(message)) {
                onConfirm();
            } else {
                onCancel();
            }
        }
        return confirmAction;
    };

    const deleteWorld = () => history.goBack();
    const abort = () => console.log("Aborted")
    const confirmDelete = useConfirm("작성을 취소하시겠습니까?", deleteWorld, abort);


    const [showCom, setShowCom] = useState(false);
    const showComment = () => {
        setShowCom(true)
    }

    const hideComment = () => {
        setShowCom(false)
    }

    return (
        <div className="reviewUpload">
            <div className='pageTitle'>
                <h3>후기 작성</h3>
            </div>
            <div>
                <h4>사진첨부</h4>
                <AppStyle style={{ marginTop: "11px" }}>
                    <label htmlFor="item_review_input" className="item_review_input">
                        {
                            ReviewAddImg ?
                                <div className="itemImg">
                                    <img src={ReviewAddImg} alt="preview-img" className="itemImg" onMouseEnter={showComment} />
                                    <div className={"commentBox" + (showCom ? ' showCom' : '')} onMouseEnter={showComment} onMouseOut={hideComment}>
                                        이미지 변경을 하시려면<br />클릭해주세요.
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
                        onChange={handlerChangeReviewFiles}
                    />
                </AppStyle>
            </div>
            <div className='reviewContent'>
                <textarea value={reviewContents} onChange={handlerChangeReviewContents} placeholder="최소 20자 이상 내용을 입력해주세요."></textarea>
            </div>
            <div className='satisfyingReview'>
                <span>상품의 만족도는 어떠셨나요?</span>
                <input type="number" max={100} min={0} step={1} value={reviewSatisfaction} onChange={handlerChangeReviewSatisfaction} required />
            </div>
            <div className='btnWrap'>
                <input type="submit" className='greenBtn btn' value="등록" onClick={handlerClickSubmit} />
                <input type="button" className='grayBtn btn' value="취소" onClick={confirmDelete} />
            </div>
        </div>
    );
}