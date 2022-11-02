import { useState, useEffect } from 'react';
import axios from 'axios';
import jeans from '../img/jeans.jpg';
import { Link } from 'react-router-dom';

function MypageReview() {

    const [myReviewData, setmyReviewData] = useState(''); // 내가 작성한 후기
    const [yourReviewData, setYourReviewData] = useState(''); // 내가 등록한 상품에 대한 다른 회원의 후기


    // 내가 작성한 후기 데이터
    useEffect(() => {
        axios.get('http://localhost:8080/api/review/myReview')
            .then(response => {
                console.log(response);
                setmyReviewData(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    // 내가 등록한 상품에 대한 다른 회원의 후기 데이터
    useEffect(() => {
        axios.get('http://localhost:8080/api/review/yourReview')
            .then(response => {
                console.log(response);
                setYourReviewData(response.data)
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <div className="mypageInnerPage">
            <div className="myStoreReview">
                <div className='reviewTitle'>
                    <h2 className="reviewTitle">내 상점 후기</h2>
                    <span><a href="" className='moreReviewDetailPage'>더보기 > </a></span>
                </div>
            </div>
            <hr className='lineH' />
            <div>
                <table className="myReviewListAboutStore">
                    <thead>
                        <th colSpan={2}>상품 정보</th>
                        <th>작성자</th>
                        <th colSpan={2}>내용</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3} className="ReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                            </td>
                            <td className='ReviewItemNameOrigin' rowSpan={3} >메종키츠네 셔츠</td>
                            <td className='ReviewWriter' rowSpan={3}>선희곤듀</td>
                            <td className='ReviewItemImg'>
                                <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                            </td>
                        </tr>
                        <tr>
                            <td className='ReviewContent'>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</td>
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

            {/* ------------------------------------------------------------------------------------ */}

            <div className="myStoreReview">
                <div className='reviewTitle'>
                    <h2 className="reviewTitle">내 상점 후기</h2>
                    <span><a href="" className='moreReviewDetailPage'>더보기 > </a></span>
                </div>
            </div>
            <hr className='lineH' />
            <div>
                <table className="myReviewListAboutStore">
                    <thead>
                        <th colSpan={2}>상품 정보</th>
                        <th>작성자</th>
                        <th colSpan={2}>내용</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3} className="ReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                            </td>
                            <td className='ReviewItemNameOrigin' rowSpan={3} >메종키츠네 셔츠</td>
                            <td className='ReviewWriter' rowSpan={3}>선희곤듀</td>
                            <td className='ReviewItemImg'>
                                <div style={{ "backgroundImage": `url(${jeans})` }}></div>
                            </td>
                        </tr>
                        <tr>
                            <td className='ReviewContent'>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</td>
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