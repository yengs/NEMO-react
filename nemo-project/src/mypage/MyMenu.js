import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import CleanG from '../member/CleanG';

function MyMenu() {

    const itemWriter = sessionStorage.getItem('memberId');
    const reviewId = sessionStorage.getItem('memberId');

    const [reviewSatisfaction, setReviewSatisfaction] = useState(50);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/clean/${reviewId}`)
            .then(response => {
                console.log(response);
                setReviewSatisfaction(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="myMenuWrap">
            <div className="memberImg"></div>
            <div className='myMenuUserName'>{itemWriter}</div>
            <div className="cleanG">
                 <span>클린지수 {reviewSatisfaction}%</span></div>
            <div>
                {/* <div style={{"width":"100%", "height":"13px", "backgroundColor":"rgb(53, 77, 119)", "borderRadius":"20px"}}></div> */}
                <div><CleanG /></div>
            </div>
            <div className="menu">
                <ul>
                    {/* <li>나의 계정 설정</li> */}
                    <li><Link to="/mypage/mybooking">내 대여이력</Link></li>
                    <li><Link to={`/mypage/mypageitem/${itemWriter}`}>등록상품 조회</Link></li>
                    <li><Link to="/mypage/review">후기 조회</Link></li>
                    <li><Link to="/mypage/userupdate">회원정보 수정</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default MyMenu;