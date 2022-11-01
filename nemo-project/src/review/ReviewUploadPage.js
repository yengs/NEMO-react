import { useEffect, useState } from "react";
import { Axios } from "axios";
import { Link } from "react-router-dom";

export default function ReviewUploadPage({ history }) {

    const [data, setData] = useState([]);
    const [reviewContents, setReviewContents] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState('');

    const handlerChangeReviewContents = (e) => setReviewContents(e.target.value);
    const handlerChangeReviewSatisfaction = (e) => setReviewSatisfaction(e.target.value);

    useEffect(() => {
        Axios.get(`http://localhost:8080/api/s`)
            .then(response => {
                console.log(response);
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handlerClickSubmit = (e) => {
        e.preventDefault();

        window.confirm('등록하시겠습니까?')
        Axios.post(`http://localhost8080/api/review/reviewWrite`,
            { "reviewContents": reviewContents, "reviewSatisfaction": reviewSatisfaction })
            .then(response => {
                if (response.status === 200) {
                    alert("정상적으로 등록되었습니다.");
                    history.push("/review");
                } else {
                    alert("등록에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    };


    const useConfirm = (message = "", onConfirm, onCancel) => {
        // 유효성 검사 (Validator)
        if (!onConfirm || typeof onConfirm !== "function") {
            // 없거나, 함수가 아니면 빠져나옴 = 함수일때만 실행된다는 얘기
            return;
        }
        if (onCancel && typeof onCancel !== "function") {
            // (선택사항) 있고 함수가 아닐때만 나온다. = 없어도 되고 만약 있다면 function 이어야 만 실행됨
            return;
        }

        // 알림창 및 해당 콜백 함수 실행
        const confirmAction = () => {
            if (window.confirm(message)) {
                // 주의 window를 써줘야 confirm이 무슨 함수인지 인지함
                onConfirm();
            } else {
                onCancel();
            }
        }
        return confirmAction;
    };

    const deleteWorld = () => { <Link to={`/member`}></Link> };
    const abort = () => console.log("Aborted")
    const confirmDelete = useConfirm("작성을 취소하시겠습니까?", deleteWorld, abort);

    return (
        <>
            {/* css 적용 전 */}
            <form>
                <div>
                    <h1>후기 작성</h1><hr />
                    <div className="review-detail-page">
                        <div>
                            {/* div 사이즈 지정 후 컨테이너 속성 추가 예정 */}
                            <div className="img-box">
                                <img className="item-img"
                                    src="https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto,fl_lossy,c_fill,g_auto/09c5ea6df1bd4be6baaaac5e003e7047_9366/FY7756_01_standard.jpg"
                                    alt="리뷰상품이미지"
                                    width="150px" height="150px" />
                            </div>
                            <div className="review-img-info-box-title">
                                <h3>{data.item_name}</h3>
                                <h3>대여료 {data.item_price}</h3><hr />
                            </div>
                        </div>
                        <div className="add-img-box">
                            <input type="file"
                                id="item_review_input"
                                className="image_inputType_file"
                                accept=" .jpg, .png"
                                required multiple />
                        </div>
                        <div className="review-text-box">
                            <textarea className="review-box" rows={1} placeholder="내용을 입력해 주세요." value={reviewContents}
                                onChange={handlerChangeReviewContents} />
                        </div>
                    </div>
                    <div className="clean">
                        상품의 만족도는 어떠셨나요? :
                        <input type='number' value={reviewSatisfaction}
                            onChange={handlerChangeReviewSatisfaction} min='1' max='100'></input>
                    </div>
                    <button type="submit" onClick={handlerClickSubmit}>등록</button>
                    <button onClick={confirmDelete}>취소</button>

                </div>
            </form>
        </>
    );

}