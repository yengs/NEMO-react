import { useEffect, useState } from "react";
import axios from "axios";
import ReviewAddImg from '../img/review-add-img.png'
import styled from "styled-components";
import ReviewUpload from "./ReviewUpload";

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

    const { reviewWriter, reviewNum } = match.params;

    const [data, setData] = useState({});
    const [reviewFiles, setReviewFiles] = useState('');
    const [imageSrc, setImageSrc] = useState('');
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


    const handlerChangeReviewContents = (e) => setReviewContents(e.target.value);
    const handlerChangeReviewSatisfaction = (e) => {
        if (e.target.value < 0 || e.target.value > 100) {
            return;
        }
        setReviewSatisfaction(e.target.value);
    }

    const handlerChangefiles = (e) => {
        setReviewFiles(e.target.files[0]);
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

    const handlerClickUpdate = () => {

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({ 'reviewContents': reviewContents, 'reviewSatisfaction': reviewSatisfaction })], {
            type: "application/json"
        }));
        // formData.append("files", new Blob(files, { type: "image/*" }));
        formData.append("reviewFiles", reviewFiles);

        axios.put(`http://localhost:8080/api/review/myReview/${reviewWriter}/${reviewNum}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    if (reviewContents.length > 30 && reviewSatisfaction != null) {
                        alert("정상적으로 등록되었습니다.");
                        history.push(`/review/myReview/${reviewWriter}/${reviewNum}`);
                        window.location.href = `/review/myReview/${reviewWriter}`
                    } else {
                        alert("내용 30자 이상, 상품의 만족도를 입력했는지 확인해주세요.")
                    }
                } else {
                    alert("등록에 실패했습니다.");
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
                <div className="ChoiseFile">
                    <div className="myDetailImage">
                        {imageSrc == '' ?
                            <img className="memberImg" src={`../../../files_review/${data.reviewFiles}`} />
                            : <div className="myDetailImage">
                                {imageSrc && <img src={imageSrc} alt="preview-img" />} </div>
                        }
                    </div>
                    <div className="imageChoose">
                        <input className="form-control-image" type="file" name="file" multiple onChange={handlerChangefiles}></input>
                    </div>
                </div>

            </div>
            <div className='reviewContent'>
                <textarea value={reviewContents} type="text" onChange={handlerChangeReviewContents} placeholder="내용을 입력해 주세요."></textarea>
            </div>
            <div className='satisfyingReview'>
                <span>상품의 만족도는 어떠셨나요?</span>
                <input type="number" max={100} min={0} step={1} value={reviewSatisfaction} onChange={handlerChangeReviewSatisfaction} required />
            </div>
            <div className='btnWrap'>
                <input type="submit" className='greenBtn btn' value="수정" onClick={handlerClickUpdate} />
                <input type="button" className='grayBtn btn' value="취소" onClick={confirmDelete} />
            </div>
        </div>
    );

}

export default ReviewUpdate;