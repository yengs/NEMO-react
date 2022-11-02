import { Link, Route } from 'react-router-dom';
import UserDec from './UserDec';

function MyMenu() {

    return (
        <div className="myMenuWrap">
            <div className="memberImg"></div>
            <div className="cleanG">
                클린지수 <span>65</span>%
                <div style={{"width":"100%", "height":"13px", "backgroundColor":"rgb(53, 77, 119)", "borderRadius":"20px"}}></div>
            </div>
            <div className="menu">
                <div></div>
                <button className="warnBtn">신고하기</button>
            </div>
            {/* <UserDec /> */}
        </div>
    );
}

export default MyMenu;