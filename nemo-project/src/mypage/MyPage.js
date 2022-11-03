import MyMenu from "./MyMenu";
import MyUserStore from "./MyUserStore";
import { Route } from "react-router-dom";
import MypageReview from "./MypageReview";

import './mypage.css';
import './mypageReview.css';

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <Route path="/mypage/userstore" component={MyUserStore} exact={true} />
            <Route path="/mypage/review" component={MypageReview} exact={true} />
        </div>
    );
}

export default MyPage;