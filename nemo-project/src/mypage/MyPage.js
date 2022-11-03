import './mypage.css';
import './mypageReview.css';

import MyMenu from "./MyMenu";
import MyUserStore from "./MyUserStore";
import { Route } from "react-router-dom";
import MypageReview from "./MypageReview";
import MyPageItemDetail from "./MyPageItemDetail";
import MyPageItem from "./MyPageItem";

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <Route path="/mypage/userstore" component={MyUserStore} exact={true} />
            <Route path="/mypage/review" component={MypageReview} exact={true} />
            {/* <Route path="/mypage/userstore" component={MyUserStore} exact={true} /> */}
            {/* <MyPageItemDetail/> */}
        </div>
    );
}

export default MyPage;