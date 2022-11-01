import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

    return (
        <>
            <div className="container">
                <h1>내가 작성한 리뷰</h1>
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
                                    <td>{review.reviewImage}</td>
                                    <td>
                                        <Link to={`/review/myReview/${review.reviewNum}`}>{review.reviewContents}</Link>
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
                <Link className="reviewUploadBtn" to="/reivew/reviewWrite">후기 작성</Link>
            </div>
        </>
    );
}

export default MyReviewList;