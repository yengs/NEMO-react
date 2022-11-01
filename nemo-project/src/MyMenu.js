import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { Route } from 'react-router-dom';

function MyMenu() {

    return (
        <div className="myMenuWrap">
            <div className="memberImg"></div>
            <div className="cleanG">
                클린지수<span>65</span>%
                <div style={{"width":"100%", "height":"15px", "backgroundColor":"rgb(88, 145, 112)", "borderRadius":"20px"}}></div>
            </div>
            <div className="menu">
                <ul>
                    {/* <li>나의 계정 설정</li> */}
                    <li><Route>내 스토어</Route></li>
                    <li><Route>등록상품 조회</Route></li>
                    <li><Route>후기 조회</Route></li>
                    <li><Route>회원정보 수정</Route></li>
                </ul>
                <button className="warnBtn">신고하기</button>
            </div>
        </div>
    );
}

export default MyMenu;