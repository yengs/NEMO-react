import { useState } from "react";
import { axios } from "axios";

export default function ReviewUploadPage() {

    const [textValue, setTextValue] = useState('');
    const [cleanLv, setCleanLv] = useState('');

    const handleSetValue = (e) => {
        setTextValue(e.target.value);
    };

    const handlerSetclean = (e) => {
        setCleanLv(e.target.value);
    }

    const useConfirm = (message = "", onConfirm, onCancel) => {
        // 유효성 검사 (Validator)
        if (!onConfirm || typeof onConfirm !== "function") {
            // 없거나, 함수가 아니면 빠져나옴 
            // 즉, 있고, 함수일때만 실행된다는 얘기
            return;
        }
        if (onCancel && typeof onCancel !== "function") {
            // (선택사항) 있고 함수가 아닐때만 나온다. 
            // 즉, 없어도 되고 만약 있다면 function 이어야 만 실행됨
            return;
        }

        // 알림창 및 해당 콜백 함수 실행
        const confirmAction = () => {
            if (window.confirm(message)) {
                // 주의! window를 써줘야 confirm이 무슨 함수인지 인지함
                onConfirm();
            } else {
                onCancel();
            }
        }
        return confirmAction;
    };

    const deleteWorld = () => { <a href="http://www.naver.com"></a> };
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
                                {/* {item_name} 으로 변경 예정 */}
                                <h3>아디다스 로우</h3>
                                {/* 대여료 {item_price} 으로 변경 예정 */}
                                <h3>대여료 50000</h3><hr />
                            </div>
                        </div>
                        <div className="add-img-box">
                            <input type="file"
                                id="real-input"
                                className="image_inputType_file"
                                accept=" .jpg, .png"
                                required multiple />
                            <button className="browse-btn"><img src="../image/review-add-img.png" alt="" />사진 업로드</button>
                        </div>
                        <div className="review-text-box">
                            <textarea className="review-box" rows={1} placeholder="내용을 입력해 주세요." value={textValue}
                                onChange={(e) => { handleSetValue(e) }} />
                        </div>
                    </div>
                    <div className="clean">
                        상품의 만족도는 어떠셨나요? : <input type='number' onChange={handlerSetclean} min='1' max='100'></input>
                    </div>
                    <button type="submit">등록</button>
                    <button onClick={confirmDelete}>취소</button>

                </div>
            </form>
        </>
    );

}