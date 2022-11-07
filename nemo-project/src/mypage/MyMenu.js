import { Link, Route } from 'react-router-dom';

function MyMenu() {

    return (
        <div className="myMenuWrap">
            <div className="memberImg"></div>
            <div className="cleanG">
                클린지수 <span>65</span>%
                <div style={{"width":"100%", "height":"13px", "backgroundColor":"rgb(53, 77, 119)", "borderRadius":"20px"}}></div>
            </div>
            <div className="menu">
                <ul>
                    {/* <li>나의 계정 설정</li> */}
                    <li><Link to="/mypage/mybooking">내 대여이력</Link></li>
                    <li><Link to="/mypage/mypageitem">등록상품 조회</Link></li>
                    <li><Link to="/mypage/review">후기 조회</Link></li>
                    <li><Link to="/mypage/userupdate">회원정보 수정</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default MyMenu;