import MyMenuForOthers from "./MyMenuForOthers";
import MyUserStore from "./MyUserStore";
import Singo from "./Singo";
import UserReviewList from "./UserReviewList";

import './mypage.css';
import { Route } from "react-router-dom";

function MyPage() {
    return(
        <div className="myPageWrap forOthers">
            <MyMenuForOthers />
            {/* <MyUserStore /> */}
            <Route path="/userstoreinfo/warn" component={Singo} exact={true}/>
            <Route path="/userstoreinfo" component={MyUserStore} exact={true} />
            <Route path="/userreviewlist" component={UserReviewList} exact={true} />
        </div>
    );
}

export default MyPage;