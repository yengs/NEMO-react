import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reviewDetail.css";
import Shirt from '../img/shirt.jpg';

function YourReviewList() {

    const handlerMoreReviewContents = () => {

    }

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/review/yourReview')
            .then(response => {
                console.log(response);
                setDatas(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className="rcontainer">
                <h1>내 상점 리뷰</h1>
                <hr className="lineH"></hr>
                <table className="myreview">
                    <colgroup>
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="*" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope='col'>번호</th>
                            <th scope='col'>작성자</th>
                            <th scope='col'>이미지</th>
                            <th scope='col'>내용</th>
                            <th scope='col'>만족도</th>
                        </tr>
                    </thead>
                    <tbody className="reviewBody">
                        {
                            datas && datas.map(review => (
                                <tr key={review.reviewNum}>
                                    <td>{review.reviewNum}</td>
                                    <td>{review.reviewId}</td>
                                    {/* <td>{review.reviewImage}</td> */}
                                    <td>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                    </td>
                                    <td>{review.reviewContents < 21 ? review.reviewContents : review.reviewContents.slice(0, 20) + '...'}</td>
                                    <td>{review.reviewSatisfaction}</td>
                                </tr>
                            ))
                        }
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="6">일치하는게 없습니다</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default YourReviewList;