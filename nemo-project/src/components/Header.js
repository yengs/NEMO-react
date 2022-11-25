import logo from '../img/logo7.svg';

import { IconContext } from "react-icons";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaLock, FaUserPlus } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Header() {

    const handlerLogout = () => {
        sessionStorage.clear();
        window.location.href = "/";
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

    const memberNum = sessionStorage.getItem('memberNum');
    const [memberRegion, setMemberRegion] = useState('');
    useEffect(() => {
        if(sessionStorage.getItem('memberNum') !== null)
        axios.get(`http://localhost:8080/api/member/info/${memberNum}`)
        .then(response => {
            setMemberRegion(response.data.memberSigungu);
        })
        .catch(error=>console.log(error))
    });

    return (
        <header>
            {sessionStorage.getItem("memberId") === 'admin' ?
            <div className="topHeader">
            <div className="logo">
            <img src={logo} alt="로고"></img>
        </div>
        <div className="mainTitle">
            <h2>내일 모입지?</h2>
        </div>
        <div className="member">
        <Link to="/" onClick={handlerLogout}>
                        <IconContext.Provider value={{ className: "headerIcons" }}>
                            <FaLock />
                        </IconContext.Provider>
                        <p>로그아웃</p>
                    </Link>
                    </div>
        </div>
            :
            <div className="topHeader">
                <div className="logo" onClick={handlerGoMain}>
                    <img src={logo} alt="로고"></img>
                </div>
                <div className="mainTitle" onClick={handlerGoMain}>
                    <h2>내일 모입지?</h2>
                </div>
                <div>{sessionStorage.getItem("jwtToken") != null ?
                <div className="member">
                    <Link to="/" onClick={handlerLogout}>
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
                    <Link to="/chatting/:itemWriter">
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
                <Link to="/member/join">
                    <IconContext.Provider value={{ className: "headerIcons" }}>
                        <FaUserPlus />
                    </IconContext.Provider>
                    <p>회원가입</p>
                </Link>
            </div>
                }</div>
            </div>}
             {sessionStorage.getItem("memberId") === 'admin' ?
                    null
                    : 
            <div className='underHeader'>
                <div className="navBar">
                    <div className="location">
                        <IconContext.Provider value={{ className: "navIcons" }}>
                            <FaMapMarkerAlt />
                        </IconContext.Provider>
                        <span>
                            {
                                sessionStorage.getItem('jwtToken') ? memberRegion : "로그인이 필요합니다"
                            }
                        </span>
                    </div>
                    
                    <div className='navWrap'>
                        <ul className="nav">
                            <li className="dropdown">
                            <a onClick={handlerGoTop}>상의</a>
                                <div class="dropdown-content">
                                    <a href='/item/cate/sub/반팔'>반팔</a>
                                    <a href='/item/cate/sub/긴팔'>긴팔</a>
                                    <a href='/item/cate/sub/니트'>니트</a>
                                    <a href='/item/cate/sub/셔츠'>셔츠</a>
                                    <a href='/item/cate/sub/블라우스'>블라우스</a>
                                </div>
                            </li>
                            <li class="dropdown">
                                <a onClick={handlerGoBottom}>하의</a>

                                <div class="dropdown-content">
                                    <a href='/item/cate/sub/바지'>바지</a>
                                    <a href='/item/cate/sub/치마'>치마</a>
                                    <a href='/item/cate/sub/반바지'>반바지</a>
                                    <a href='/item/cate/sub/레깅스'>레깅스</a>
                                </div>
                            </li>
                            <li class="dropdown">
                                <a onClick={handlerGoOuter}>아우터</a>
                                <div class="dropdown-content">
                                    <a href='/item/cate/sub/패딩'>패딩</a>
                                    <a href='/item/cate/sub/코트'>코트</a>
                                    <a href='/item/cate/sub/자켓'>자켓</a>
                                    <a href='/item/cate/sub/점퍼'>점퍼</a>
                                    <a href='/item/cate/sub/후드집업'>후드집업</a>
                                    <a href='/item/cate/sub/바람막이'>바람막이</a>
                                </div>
                            </li>
                            <li class="dropdown">
                                <a onClick={handlerGoDress}>원피스</a>
                                <div class="dropdown-content">
                                    <a href='/item/cate/sub/롱'>롱</a>
                                    <a href='/item/cate/sub/미디'>미디</a>
                                    <a href='/item/cate/sub/미니'>미니</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="weather">
                        <IconContext.Provider value={{ className: "navIcons" }}>
                            <FaTemperatureHigh />
                        </IconContext.Provider>
                        {
                            sessionStorage.getItem("jwtToken") ?
                            <Link to="/item/weatherrecitemlist">내일의 날씨는?</Link>
                            :
                            <Link to="/member/login">내일의 날씨는?</Link>
                        }
                    </div>
                </div>
            </div>
            }
        </header>
    )
}

export default Header;