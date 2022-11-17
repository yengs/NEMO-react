import { useEffect, useState } from "react";
import axios from "axios";
import ReviewAddImg from '../img/review-add-img.png'
import styled from "styled-components";
import { useParams } from "react-router-dom";

const AppStyle = styled.div`
  img {
    max-width: 75px;
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
`;

function ReviewUpdate({ history, match }) {

    const { reviewWriter } = match.params;
    const { reviewNum } = useParams();

    const {bookingItemnum} = match.params;
    const {bookingItemwriter} = match.params;
    const {bookingItemfiles} = match.params;
    const {bookingItemname} = match.params;
    const {bookingItemprice} = match.params;

    const reviewProductIdx = bookingItemnum;
    const reviewId = bookingItemwriter;
    const reviewItemfiles = bookingItemfiles;
    const reviewItemname = bookingItemname;
    const reviewItemprice = bookingItemprice;


    const [datas, setDatas] = useState({});
    const [reviewFiles, setReviewFiles] = useState('');
    const [reviewContents, setReviewContents] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState('');

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
                setReviewFiles(read.result);
                resolve();
            };
        });
    };

    // 후기 데이터 가져오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/myReview/${reviewNum}`)
            .then(res => {
                console.log(res);
                setDatas(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    // 후기 수정 
    const UpdateReview = () => {

        // 이미지 등록 
        const formData = new FormData();
        formData.append('reviewData', new Blob([JSON.stringify({ "reviewWriter": reviewWriter, "reviewContents": reviewContents, "reviewSatisfaction": reviewSatisfaction, "reviewProductIdx":reviewProductIdx ,"reviewId":reviewId, "reviewItemfiles":reviewItemfiles, "reviewItemname":reviewItemname, "reviewItemprice":reviewItemprice })], {
            type: "application/json"
        }));
        formData.append("reviewFiles", reviewFiles);

        axios.put(`/review/myReview/${reviewWriter}/${reviewNum}`, formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
                if (response.status === 200) {
                    if (reviewContents.length > 30 && reviewSatisfaction != null) {
                        alert("정상적으로 등록되었습니다.");
                        history.push(`/review/myReview/${reviewWriter}/${reviewNum}`);
                    } else {
                        alert("양식에 맞춰 작성해주세요.")
                    }
                } else {
                    alert("등록에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
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

    return (
        <div className="reviewUpload">
            <div className='pageTitle'>
                <h3>후기 작성</h3>
            </div>
            <div>
                <h4>사진첨부</h4>
                <AppStyle>
                    <label htmlFor="item_review_input">
                        <div className="btnStart">
                            <img src={ReviewAddImg} alt="ReviewAddImg" value={datas.reviewImage} />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="item_review_input"
                        className="image_inputType_file"
                        accept=".jpg, .png"
                        multiple
                        onChange={handlerChangeReviewFiles}
                        value={datas.reviewImage}
                    />
                </AppStyle>
            </div>
            <div className='reviewContent'>
                <textarea value={datas.reviewContents} onChange={handlerChangeReviewContents} placeholder="내용을 입력해 주세요."></textarea>
            </div>
            <div className='satisfyingReview'>
                <span>상품의 만족도는 어떠셨나요?</span>
                <input type="number" max={100} min={0} step={1} value={datas.reviewSatisfaction} onChange={handlerChangeReviewSatisfaction} required />
            </div>
            <div className='btnWrap'>
                <input type="submit" className='greenBtn btn' value="수정" onClick={() => UpdateReview()} />
                <input type="button" className='grayBtn btn' value="취소" onClick={confirmDelete} />
            </div>
        </div>
    );

}

export default ReviewUpdate;