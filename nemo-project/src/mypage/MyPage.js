import MyMenu from "./MyMenu";
import MyUserStore from "./MyUserStore";

import './singo.css';
import { Route } from "react-router-dom";
import Singo from "./Singo";

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <Singo/>
            {/* <Route path="/mypage/userstore" component={MyUserStore} exact={true} /> */}
        </div>
    );
}

export default MyPage;