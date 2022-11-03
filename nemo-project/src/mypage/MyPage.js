import MyMenu from "./MyMenu";
import MyUserStore from "./MyUserStore";

import './mypage.css';
import mypageReview from "./mypageReview.css";
import { Route } from "react-router-dom";
import './mypageReview.css';
import MypageReview from "./MypageReview";
import MyPageItemDetail from "./MyPageItemDetail";

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <Route path="/mypage/userstore" component={MyUserStore} exact={true} />
            <Route path="/mypage/mypageitemdetail" component={MyPageItemDetail} exact={true} />
            {/* <MypageReview/> */}
        </div>
    );
}

export default MyPage;