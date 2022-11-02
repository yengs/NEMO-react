import MyMenu from "./MyMenu";
import MyUserStore from "./MyUserStore";

import './mypage.css';
import { Route } from "react-router-dom";

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <Route path="/mypage/userstore" component={MyUserStore} exact={true} />
        </div>
    );
}

export default MyPage;