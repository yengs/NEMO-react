import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ReviewUploadPage({ history }) {

    // const [data, setData] = useState([]);
    const [reviewImage, setReviewImage] = useState('');
    const [reviewContents, setReviewContents] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState('');

    const handlerChangesetReviewImage = (e) => setReviewImage(e.target.value);
    const handlerChangeReviewContents = (e) => setReviewContents(e.target.value);
    const handlerChangeReviewSatisfaction = (e) => setReviewSatisfaction(e.target.value);

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
                    alert("정상적으로 등록되었습니다.");
                    history.push("/review/myReview");
                } else {
                    alert("등록에 실패했습니다.");
                    return ;
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

    const deleteWorld = () => { window.location.href = "/item" };
    const abort = () => console.log("Aborted")
    const confirmDelete = useConfirm("작성을 취소하시겠습니까?", deleteWorld, abort);

    return (
        <>
            <form>
                <div>
                    <h2>후기 작성</h2><hr />
                    <div className="review-detail-page">
                        <div className="add-img-box">
                            <input type="file"
                                id="item_review_input"
                                className="image_inputType_file"
                                accept=" .jpg, .png"
                                multiple
                                onChange={handlerChangesetReviewImage} />
                        </div>
                        <div className="review-text-box">
                            <textarea className="review-box" rows={1} 
                                placeholder="내용을 입력해 주세요." value={reviewContents}
                                onChange={handlerChangeReviewContents} />
                        </div>
                    </div>
                    <div className="clean">
                        상품의 만족도는 어떠셨나요? :
                        <input type='number' value={reviewSatisfaction}
                            onChange={handlerChangeReviewSatisfaction}></input>
                    </div>
                    <button type="submit" onClick={handlerClickSubmit}>등록</button>
                    <button onClick={confirmDelete}>취소</button>

                </div>
            </form>
        </>
    );

}

export default ReviewUploadPage;