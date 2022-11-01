import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyReviewList() {

    const [ datas, setDatas ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/review/myReview')
        .then(response => {console.log(response);
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
            <col width="15%"/>
            <col width="15%"/>
            <col width="15%"/>
            <col width="15%"/>
            <col width="25%"/>
            <col width="15%"/>
        </colgroup>
        <thead>
            <tr>
                <th scope='col'>번호</th>
                <th scope='col'>상품정보</th>
                <th scope='col'>대여료</th>
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
                            <td className="product">{review.reviewProductIdx}</td>
                            <td>{review.itemPrice}</td>
                            <td>{review.reviewImage}</td>
                            <td>
                                <Link to={`/myReview/${review.reviewNum}`}>{review.reviewContents}</Link>
                            </td>
                            <td>{review.reviewSatisfaction}</td>
                            <input type="button" id="edit"   className="btn" value="수정하기" />
                            <input type="button" id="delete" className="btn" value="삭제하기" /> 
                        </tr>
                    ))
                }
                {
                    datas.length === 0 && (
                        <tr>
                            <td colSpan="8">데이터가 없습니다</td>
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