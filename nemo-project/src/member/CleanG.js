import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CleanG() {

    const params = useParams();
    const reviewId = sessionStorage.getItem('memberId');
    // const reviewId = sessionStorage.getItem('memberId');

    console.log(params)
    const [reviewSatisfaction, setReviewSatisfaction] = useState(0);

    // 클린지수 조회
    useEffect(() => {
        axios.get(`http://localhost:8080/api/clean/${reviewId}`)
            .then(response => {
                console.log(response);
                setReviewSatisfaction(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    // 값 받아서 맞는 이미지 리턴
    return (
            <div className="mypage-clean-img">
                {
                    (function () {
                        if (reviewSatisfaction == 0) {
                            return <img className="mypage-clean-img" src="/clean/zero.png" alt="0percentlass" />
                        } else if (reviewSatisfaction > 0 && reviewSatisfaction <= 20) {
                            return <img className="mypage-clean-img" src="/clean/tenp.png" alt="10"></img>
                        } else if (reviewSatisfaction > 20 && reviewSatisfaction <= 40) {
                            return <img className="mypage-clean-img" src="/clean/thirtyp.png" alt="40" />
                        } else if (reviewSatisfaction > 40 && reviewSatisfaction <= 50) {
                            return <img className="mypage-clean-img" src="/clean/fourtyp.png" alt="50" />
                        } else if (reviewSatisfaction > 50 && reviewSatisfaction <= 60) {
                            return <img className="mypage-clean-img" src="/clean/sixtyp.png" alt="60" />
                        } else if (reviewSatisfaction > 60 && reviewSatisfaction <= 70) {
                            return <img className="mypage-clean-img" src="/clean/seventyp.png" alt="70" />
                        } else if (reviewSatisfaction > 70 && reviewSatisfaction <= 80) {
                            return <img className="mypage-clean-img" src="/clean/eightyp.png" alt="80" />
                        } else if (reviewSatisfaction > 80 && reviewSatisfaction <= 99) {
                            return <img className="mypage-clean-img" src="/clean/ninetyp.png" alt="99" />
                        } else {
                            return <img className="mypage-clean-img" src="/clean/onehundredp.png" alt="100" />
                        }
                    })()
                }
            </div>
    );
}