import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import ReviewAddImg from '../img/review-add-img.png'

// import Form from 'react-bootstrap/Form';

import styled from "styled-components";
import './reviewUpload.css'

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

export default function ReviewUpload({ history }) {

    let { reviewNum } = useParams();

    // const [data, setData] = useState([]);
    const [reviewImage, setReviewImage] = useState('');
    const [reviewContents, setReviewContents] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState('');

    const handlerChangesetReviewImage = (e) => setReviewImage(e.target.value);
    const handlerChangeReviewContents = (e) => setReviewContents(e.target.value);
    const handlerChangeReviewSatisfaction = (e) => setReviewSatisfaction(e.target.value);

    useEffect(() => {
        console.log(`http://localhost:8080/api/review/myReview/${reviewNum}`)

        axios.get(`http://localhost:8080/api/review/myReview/${reviewNum}`)
        .then(response => {
            // console.log("후기 수정 번호 : " + reviewNum);
         console.log(response);
            // setDatas(response.data);
            setReviewImage(response.data.reviewImage);
            setReviewContents(response.data.setReviewContents);
            setReviewSatisfaction(response.data.setReviewSatisfaction);
        })
        .catch(error => console.log(error));
    })

    // 리뷰 등록
    const handlerClickSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/reivew/reviewWrite`,
            {
                "reviewImage": reviewImage,
                "reviewContents": reviewContents,
                "reviewSatisfaction": reviewSatisfaction
            })
            .then(response => {
                if (response.status === 200) {
                    if (reviewContents && reviewSatisfaction != null) {
                        alert("정상적으로 등록되었습니다.");
                        history.push("/review/myReview");
                    } else {
                        alert("내용과 만족도를 입력하세요.")
                    }
                } else {
                    alert("등록에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));

    };

    // 리뷰 작성 취소
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

    // 리뷰 이미지 업로드
    const [reviewImageSrc, setReviewImageSrc] = useState('');


    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setReviewImageSrc(reader.result);
            resolve();
          };
        });
      };


    return (
        <div className="reviewUpload">
            <div className='pageTitle'>
                <h3>후기 작성</h3>
            </div>
            <div>
                <h4>사진첨부</h4>
                {/* <div className='reviewImage' style={{ "backgroundImage": `url(${ReviewAddImg})` }}></div>
                <div className="add-img-box">
                    <input type="file"
                        id="item_review_input"
                        className="image_inputType_file"
                        accept=" .jpg, .png"
                        multiple
                        onChange={handlerChangesetReviewImage} />
                </div> */}
                <AppStyle>
                    <label htmlFor="item_review_input">
                        <div className="btnStart">
                            <img src={ReviewAddImg} alt="ReviewAddImg" />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="item_review_input"
                        className="image_inputType_file"
                        accept=".jpg, .png"
                        multiple
                        onChange={handlerChangesetReviewImage}
                    />
                </AppStyle>
            </div>
            <div className='reviewContent'>
                <textarea value={reviewContents} onChange={handlerChangeReviewContents} placeholder="내용을 입력해 주세요."></textarea>
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