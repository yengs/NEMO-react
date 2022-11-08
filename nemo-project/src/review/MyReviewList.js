import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "./reviewDetail.css";
import Shirt from '../img/shirt.jpg';

function MyReviewList() {

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/review/myReview')
            .then(response => {
                console.log(response);
                setDatas(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/review/myReview')
            .then(response => {
                console.log(response);
                setDatas(response.data)
            })
            .catch(error => console.log(error));
    }, []);


    const [closed, setClosed] = useState(false);

    const handelrMoreBtn = () => {
        // if (review.reviewNum === )
        setClosed(!closed);
    }


    return (
        <>
            <div className="rcontainer">
                <h2 className="reviewListTitle">내가 작성한 리뷰</h2>
                <hr className="lineH"></hr>
                <table className="yourreview">
                    <colgroup>
                        <col width="15%" />
                        <col width="25%" />
                        <col width="45%" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope='col'>번호</th>
                            <th scope='col'>이미지</th>
                            <th scope='col'>내용</th>
                            <th scope='col'>만족도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas && datas.map(review => (
                                <tr key={review.reviewNum}>
                                    <td>{review.reviewNum}</td>
                                    {/* <td>{review.reviewImage}</td> */}
                                    <td>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                    </td>
                                    <td>
                                        <div className="reviewContents">
                                            <p className={closed ? " " : "close"}>{review.reviewContents}</p>
                                        </div>
                                        <button className="moreBtn" onClick={handelrMoreBtn}>{closed ? " [ 닫기 ] " : " [ + 더보기 ] "}</button>
                                    </td>
                                    <td>{review.reviewSatisfaction}</td>
                                </tr>
                            ))
                        }
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4">데이터가 없습니다</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default MyReviewList;