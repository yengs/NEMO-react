import MyMenu from "./MyMenu";
import MyStore from "./MyStore";

import './mypage.css';

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <MyStore />
        </div>
    );
}

export default MyPage;