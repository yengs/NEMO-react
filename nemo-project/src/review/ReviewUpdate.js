import { useEffect, useState } from "react";
import axios from "axios";
import ReviewAddImg from '../img/review-add-img.png'
import styled from "styled-components";

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

    const [datas, setDatas] = useState({});
    const [reviewImage, setReviewImage] = useState('');
    const [reviewContents, setReviewContents] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState('');

    const handlerChangesetReviewImage = (e) => setReviewImage(e.target.value);
    const handlerChangeReviewContents = (e) => setReviewContents(e.target.value);
    const handlerChangeReviewSatisfaction = (e) => setReviewSatisfaction(e.target.value);

    // 후기 데이터 가져오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/myReview/${reviewWriter}/${reviewNum}`)
            .then(res => {
                console.log(res);
                setDatas(res.data);
                setReviewImage(res.data);
                setReviewContents(res.data);
                setReviewSatisfaction(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    // 후기 수정 
    const UpdateReview = (e) => {
        e.preventDefault();

        const reviewDetail = {
            "reviewImage": reviewImage,
            "reviewContents": reviewContents,
            "reviewSatisfaction": reviewSatisfaction
        }

        axios.post(`http://localhost:8080/api/review/myReview/${reviewWriter}/${reviewNum}`, reviewDetail)
            .then(res => {
                if (res.status === 200) {
                    alert("수정완료");
                    history.push(`/review/myReview/${reviewWriter}`);
                } else {
                    alert("수정실패");
                    return;
                }
            })
            .catch(error => {
                console.log(reviewDetail);
                console.log(error)
            });
    }

    // 후기 수정 취소
    const confirmDelete = (message = "후기 수정을 취소하시겠습니까 ?", onConfirm, onCancel) => {
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
                        onChange={handlerChangesetReviewImage}
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