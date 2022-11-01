import axios from "axios";
import { useEffect, useState } from "react";

function YourReviewDetail({ match, location, history }) {

    const { reviewNum } = match.params;

    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/yourReview/${reviewNum}`)
            .then(response => {
                console.log(response);
                setData(response.data);
            })
            .catch(error => { console.log(error) });
    }, []);

    const handlerReviewList = () => history.push('/review/yourReview');

    return (
        <>
            <div className="container">
                <h1>나의 상점에 대한 리뷰 상세페이지</h1>
                <form method="post" id="frm" name="frm">
                    <input type="hidden" name="reviewNum" />
                    <table className="yourreviewdetail">
                        <colgroup>
                            <col width="15%" />
                            <col width="30%" />
                            <col width="40%" />
                            <col width="15%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">번호</th>
                                <td>{data.reviewNum}</td>
                                <th scope="row">작성자</th>
                                <td>{data.reviewId}</td>
                            </tr>
                            <tr>
                                <th scope="row">이미지</th>
                                <td>{data.reviewImage}</td>
                            </tr>
                            <tr>
                                <th scope="row">내용</th>
                                <td>{data.reviewContents}</td>
                            </tr>
                            <th>
                                <th scope="row">평점</th>
                                <td>{data.reviewSatisfaction}</td>
                            </th>
                        </tbody>
                    </table>
                </form>
                <input type="button" id="reviewlist" className="btn" value="목록" onClick={handlerReviewList} />
            </div>
        </>
    )

}

export default YourReviewDetail;