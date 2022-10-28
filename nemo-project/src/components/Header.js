import logo from '../img/logo5.svg';

import { IconContext } from "react-icons";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";


function Header() {

    const handlerLogin = () => {
        window.location.href="/member/login";
    }

    const handlerGoMain = () => {
        window.location.href="/";
    }

    return(
        <header>
            <div className="topHeader">
                <div className="logo" onClick={handlerGoMain}>
                    <img src={logo} alt="로고"></img>
                </div>
                <div className="mainTitle">
                    <h2>내일 모입지?</h2>
                </div>
                <div className="member">
                    <button>
                        <IconContext.Provider value={{ className: "headerIcons" }}>
                            <BsChatDotsFill />
                        </IconContext.Provider>
                        <p>내모톡</p>
                    </button>
                    <button>
                        <IconContext.Provider value={{ className: "headerIcons" }}>
                            <FaUserAlt />
                        </IconContext.Provider>
                        <p>MY</p>
                    </button>
                    <button onClick={handlerLogin}>
                        <IconContext.Provider value={{ className: "headerIcons" }}>
                            <FaLock />
                        </IconContext.Provider>
                        <p>로그인</p>
                    </button>
                </div>
            </div>
            <div className="navBar">
                <div className="location">
                    <IconContext.Provider value={{ className: "navIcons" }}>
                        <FaMapMarkerAlt />
                    </IconContext.Provider>
                    <span>종로 2가</span>
                </div>
                <div className='navWrap'>
                    <ul className="nav">
                        <li>상의</li>
                        <li>하의</li>
                        <li>아우터</li>
                        <li>원피스</li>
                    </ul>
                </div>
                <div className="weather">
                    <IconContext.Provider value={{ className: "navIcons" }}>
                        <FaTemperatureHigh />
                    </IconContext.Provider>
                    <span>내일의 날씨는?</span>
                </div>
            </div>
        </header>
    )
}

export default Header;