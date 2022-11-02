import MyMenu from "./MyMenu";
import MyStore from "./MyStore";
// import './mypage.css';
import './mypageReview.css';
import MypageReview from "./MypageReview";

function MyPage() {
    return(
        <div className="myPageWrap">
            <MyMenu />
            <MypageReview />
        </div>
    );
}

export default MyPage;