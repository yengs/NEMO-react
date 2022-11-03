import logo from '../img/logo7.svg';

import { IconContext } from "react-icons";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Header() {

    const handlerLogin = () => {
        window.location.href = "/member/login";
    }

    const handlerGoMain = () => {
        window.location.href = "/";
    }

    // 헤더 상품 카테고리 구분
    //상의
    const handlerGoTop = () => {
        window.location.href = "/item/cate/상의";
    }
    //하의
    const handlerGoBottom = () => {
        window.location.href = "/item/cate/하의";
    }
    //아우터
    const handlerGoOuter = () => {
        window.location.href = "/item/cate/아우터";
    }
    //원피스
    const handlerGoDress = () => {
        window.location.href = "/item/cate/원피스";
    }

    return (
        <header>
            <div className="topHeader">
                <div className="logo" onClick={handlerGoMain}>
                    <img src={logo} alt="로고"></img>
                </div>
                <div className="mainTitle">
                    <h2>내일 모입지?</h2>
                </div>
                <div className="member">
                    <Link to="/member/login">
                        <IconContext.Provider value={{ className: "headerIcons" }}>
                            <FaLock />
                        </IconContext.Provider>
                        <p>로그인</p>
                    </Link>
                    <Link to="/mypage/mypageitem">
                        <IconContext.Provider value={{ className: "headerIcons" }}>
                            <FaUserAlt />
                        </IconContext.Provider>
                        <p>MY</p>
                    </Link>
                    <Link to="/chat">
                        <IconContext.Provider value={{ className: "headerIcons" }}>
                            <BsChatDotsFill />
                        </IconContext.Provider>
                        <p>내모톡</p>
                    </Link>
                </div>
            </div>
            <div className='underHeader'>
                <div className="navBar">
                    <div className="location">
                        <IconContext.Provider value={{ className: "navIcons" }}>
                            <FaMapMarkerAlt />
                        </IconContext.Provider>
                        <span>종로 2가</span>
                    </div>
                    <div className='navWrap'>
                        <ul className="nav">
                            <li className="dropdown">
                                <a onClick={handlerGoTop}>상의</a>
                                <div className="dropdown-content">
                                    <a>반팔</a>
                                    <a>긴팔</a>
                                    <a>니트</a>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a onClick={handlerGoBottom}>하의</a>
                                <div className="dropdown-content">
                                    <a>바지</a>
                                    <a>치마</a>
                                    <a>반바지</a>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a onClick={handlerGoOuter}>아우터</a>
                                <div className="dropdown-content">
                                    <a>패딩</a>
                                    <a>코트</a>
                                    <a>바람막이</a>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a onClick={handlerGoDress}>원피스</a>
                                <div className="dropdown-content">
                                    <a>롱</a>
                                    <a>미디</a>
                                    <a>미니</a>
                                </div>
                            </li>

                            {/* <li onClick={handlerGoTop}>상의</li>
                            <li onClick={handlerGoBottom}>하의</li>
                            <li onClick={handlerGoOuter}>아우터</li>
                            <li onClick={handlerGoDress}>원피스</li> */}

                        </ul>
                    </div>
                    <div className="weather">
                        <IconContext.Provider value={{ className: "navIcons" }}>
                            <FaTemperatureHigh />
                        </IconContext.Provider>
                        <Link to="/item/weatherrecitemlist">내일의 날씨는?</Link>
                        {/* <span>내일의 날씨는?</span> */}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;