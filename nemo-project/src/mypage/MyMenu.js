import { Link, Route } from 'react-router-dom';
import CleanG from '../member/CleanG';

function MyMenu() {

    const itemWriter = sessionStorage.getItem('memberId');

    return (
        <div className="myMenuWrap">
            <div className="memberImg"></div>
            <div>{itemWriter}</div>
            <div className="cleanG">
                클린지수 <span>65</span>%
                {/* <div style={{"width":"100%", "height":"13px", "backgroundColor":"rgb(53, 77, 119)", "borderRadius":"20px"}}></div> */}
                <div><CleanG/></div>
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