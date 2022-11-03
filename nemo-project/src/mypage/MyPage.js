import MyMenu from "./MyMenu";
import MyUserStore from "./MyUserStore";

import './mypage.css';
import mypageReview from "./mypageReview.css";
import { Route } from "react-router-dom";
import './mypageReview.css';
import MypageReview from "./MypageReview";
import UserUpdate from "./UserUpdate";
import MyPageItem from "./MyPageItem";

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <Route path="/mypage/userstore" component={MyUserStore} exact={true} />

            <Route path="/mypage/review" component={MypageReview} exact={true} />
            {/* <Route path="/mypage/userstore" component={MyUserStore} exact={true} /> */}
            {/* <MyPageItemDetail/> */}

            {/* <Route path="/mypage/myitemdetail" component={MyPageItemDetail} exact={true} /> */}
            {/* <MypageReview/> */}
            {/* <UserUpdate /> */}
            <MyPageItem />
        </div>
    );
}

export default MyPage;