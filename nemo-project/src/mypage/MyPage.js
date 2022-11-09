import { Route } from "react-router-dom";
import MyMenu from "./MyMenu";
import MyUserStore from "./MyUserStore";

import './mypage.css';
import MypageReview from "./MypageReview";
import UserUpdate from "./UserUpdate";
import MyPageItem from "./MyPageItem";
import MyPageItemDetail from './MyPageItemDetail';
import MyBooking from "./MyBooking";



function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <Route path="/mypage/mybooking" component={MyBooking} exact={true} />
            <Route path="/mypage/mypageitem/:itemWriter" component={MyPageItem} exact={true} />
            <Route path="/mypage/review" component={MypageReview} exact={true} />
            <Route path="/mypage/mypageitemdetail/:itemNum" component={MyPageItemDetail} exact={true} />
            <Route path="/mypage/userupdate" component={UserUpdate} exact={true} />
            {/* <MyBooking /> */}
        </div>
    );
}

export default MyPage;