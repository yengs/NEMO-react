import logo from '../img/logo7.svg';

import { IconContext } from "react-icons";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';


function Header() {

    const [ itemsub, setItemsub ] = useState('');
   
    
    const handlerLogout = () => {
        sessionStorage.clear();
        window.location.href = "/";
    }

    // const handlerLogout = () => {
    //     console.log(sessionStorage.getItem("jwtToken"));
    // }

    const handlerGoMain = () => {
        window.location.href = "/";
    }

    const handlerGoSub = (e) => {
        setItemsub(e.target.value);
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
console.log(itemsub)
    return (
        <header>
            <div className="topHeader">
                <div className="logo" onClick={handlerGoMain}>
                    <img src={logo} alt="로고"></img>
                </div>
                <div className="mainTitle">
                    <h2>내일 모입지?</h2>
                </div>
                <div>{sessionStorage.getItem("jwtToken") != null ?
                <div className="member">
                    <Link to="/member/login" onClick={handlerLogout}>
                        <IconContext.Provider value={{ className: "headerIcons" }}>
                            <FaLock />
                        </IconContext.Provider>
                        <p>로그아웃</p>
                    </Link>
                    <Link to="/mypage/mybooking">
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
                :
                <div className="member">
                <Link to="/member/login">
                    <IconContext.Provider value={{ className: "headerIcons" }}>
                        <FaLock />
                    </IconContext.Provider>
                    <p>로그인</p>
                </Link>
                <Link to="/chat">
                    <IconContext.Provider value={{ className: "headerIcons" }}>
                        <BsChatDotsFill />
                    </IconContext.Provider>
                    <p>내모톡</p>
                </Link>
            </div>
                }</div>
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

                                <div className="dropdown-content" key={itemsub}>
                                <Link to={`/item/cate/sub/${itemsub}`}>
                                    <option name = "itemsub" value = "반팔" onClick={handlerGoSub}>반팔</option>
                                    <option name = "itemsub" value = "긴팔" onClick={handlerGoSub}>긴팔</option>
                                    <option name = "itemsub" value = "니트" onClick={handlerGoSub}>니트</option>
                                    <option name = "itemsub" value = "블라우스" onClick={handlerGoSub}>블라우스</option>
                                </Link>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a onClick={handlerGoBottom}>하의</a>
                                <div className="dropdown-content">
                                <Link to={`/item/cate/sub/${itemsub}`}>
                                    <option name = "itemsub" value = "바지" onClick={handlerGoSub}>바지</option>
                                    <option name = "itemsub" value = "치마" onClick={handlerGoSub}>치마</option>
                                    <option name = "itemsub" value = "반바지" onClick={handlerGoSub}>반바지</option>
                                    <option name = "itemsub" value = "레깅스" onClick={handlerGoSub}>레깅스</option>    
                                </Link>

                                </div>
                            </li>
                            <li className="dropdown">
                                <a onClick={handlerGoOuter}>아우터</a>
                                <div className="dropdown-content">
                                <Link to={`/item/cate/sub/${itemsub}`}>
                                    <option name = "itemsub" value = "패딩" onClick={handlerGoSub}>패딩</option>
                                    <option name = "itemsub" value = "코트" onClick={handlerGoSub}>코트</option>
                                    <option name = "itemsub" value = "바람막이" onClick={handlerGoSub}>바람막이</option>  
                                </Link>

                                </div>
                            </li>
                            <li className="dropdown">
                                <a onClick={handlerGoDress}>원피스</a>
                                <div className="dropdown-content">
                                <Link to={`/item/cate/sub/${itemsub}`}>
                                    <option name = "itemsub" value = "롱" onClick={handlerGoSub}>롱</option>
                                    <option name = "itemsub" value = "미디" onClick={handlerGoSub}>미디</option>
                                    <option name = "itemsub" value = "미니" onClick={handlerGoSub}>미니</option>  
                                </Link>

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