import MyMenuForOthers from "./MyMenuForOthers";
import MyUserStore from "./MyUserStore";

import './mypage.css';

function MyPage() {
    return(
        <div className="myPageWrap forOthers">
            <MyMenuForOthers />
            <MyUserStore />
        </div>
    );
}

export default MyPage;