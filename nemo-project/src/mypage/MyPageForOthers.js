import MyMenuForOthers from "./MyMenuForOthers";
import MyUserStore from "./MyUserStore";
import Singo from "./Singo";

import './mypage.css';
import { Route } from "react-router-dom";

function MyPage() {
    return(
        <div className="myPageWrap forOthers">
            <MyMenuForOthers />
            <MyUserStore />
            <Route path="/mypage/warn" component={Singo} exact={true} />
        </div>
    );
}

export default MyPage;