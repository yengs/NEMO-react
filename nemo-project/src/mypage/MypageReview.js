import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function MypageReview() {

    const [myReviewData, setmyReviewData] = useState(''); // 내가 대여한 옷에 대한 후기
    const [yourReviewData, setYourReviewData] = useState(''); // 내가 등록한 상품에 대한 다른 회원의 후기
    const [itemList, setItemList] = useState(''); // 상품 리스트

    // 내가 작성한 후기 데이터
    useEffect(() => {
        axios.get('http://localhost:8080/api/review/myReview')
            .then(response => {
                console.log(response);
                myReviewData(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    // 상대방이 작성한 내 상품에 대한 후기 데이터 
    useEffect(() => {
        axios.get('http://localhost:8080/api/review/yourReview')
            .then(response => {
                console.log(response);
                yourReviewData(response.data)
            })
            .catch(error => console.log(error));
    }, []);
    
    // 아이템 리스트 데이터
    useEffect(() => {
        axios.get('http://localhost:8080/api/review/yourReview')
            .then(response => {
                console.log(response);
                yourReviewData(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="mypageInnerPage">
            <div className="userReviewListAboutStore">
                <h2 className="myStoreReviewTitle">내 상점 후기</h2>
                <hr className='lineB' />
                <table className="myReviewListAboutStore">
                    <thead>
                        <tr>
                            <th colSpan={2}>상품 정보</th>
                            <th>작성자</th>
                            <th colSpan={2}>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3} className="myReviewList">
                                {
                                    myReviewData && myReviewData.map(review => (
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
                            </td>
                        </tr>
                        <tr>
                            <td className='satisfing'>
                                <div>
                                    만족도 <span>65</span>%
                                    <div style={{ "width": "100%", "height": "13px", "backgroundColor": "rgb(150,150,150)", "borderRadius": "20px" }}></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MypageReview;