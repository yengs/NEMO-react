import MyMenuForOthers from "./MyMenuForOthers";
import MyUserStore from "./MyUserStore";

import './mypage.css';

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenuForOthers />
            <MyUserStore />
        </div>
    );
}

export default MyPage;