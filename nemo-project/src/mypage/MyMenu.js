import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import CleanG from '../member/CleanG';

function MyMenu({history}) {

    const itemWriter = sessionStorage.getItem('memberId');
    const reviewId = sessionStorage.getItem('memberId');
    const memberImg = sessionStorage.getItem('memberImg');

    const [reviewSatisfaction, setReviewSatisfaction] = useState(0);

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
            <img className="memberImg" src={`../../memberImg/${memberImg}`}></img>
            <div className='myMenuUserName'>{itemWriter}</div>

            <div className='cleanG'>

                {reviewSatisfaction == 0 ?
                    <div>
                        <div> 클린지수 50 % </div>
                        <img className="myMenu-img" src="/clean/fourtyp.png" alt="50" />
                    </div>
                    :
                    <div>
                        <div className='cleanDefault'> 클린지수 {reviewSatisfaction}% </div>
                        <div> <CleanG /> </div>
                    </div>
                }

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