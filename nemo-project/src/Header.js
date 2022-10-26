import logo from './logo.svg';

function Header() {
    return(
        <header>
            <div className="topHeader">
                <div className="logo">
                    <img src={logo} alt="로고"></img>
                </div>
                <div className="mainTitle">
                    <h2>내일 모입지?</h2>
                </div>
                <div className="member">
                    <button>로그인</button>
                    <button>MY</button>
                    <button>내모톡</button>
                </div>
            </div>
            <div className="navBar">
                <div className="location">
                    종로 2가
                </div>
                <ul className="nav">
                    <li>상의</li>
                    <li>하의</li>
                    <li>아우터</li>
                    <li>원피스</li>
                </ul>
                <div className="weather">
                    내일의 날씨는?
                </div>
            </div>
        </header>
    )
}

export default Header;