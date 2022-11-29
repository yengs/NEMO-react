import { useState } from 'react';
import { BsFillPlusCircleFill, BsHouse, BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function DirectBtn() {
    const [isShow, setIsShow] = useState(false);

    const handlerHideNshow = () => {
        if(!isShow) {
            setIsShow(true); 
        } else {
            setIsShow(false);
        }
    }
    return (
        <DirectMenu style={{position: "absolute", right: "70px", bottom: "60px"}}>
        <div className="directMenu">
            <div className={"hideNshow" + ' ' + (isShow ? "show" : "hide")}>
                <div className="directBtn">
                    {
                        !sessionStorage.getItem("jwtToken") ?
                        <Link to="/member/login">
                            <div><BsHouse/></div>
                            <span>내 상점</span>
                        </Link>
                        :
                        <Link to="/mypage/mybooking">
                            <div><BsHouse/></div>
                            <span>내 상점</span>
                        </Link>
                    }
                </div>
                <div className="directBtn">
                    {
                        !sessionStorage.getItem("jwtToken") ?
                        <Link to="/member/login">
                            <div><BsPencilSquare/></div>
                            <span>상품등록</span>
                        </Link>
                        :
                        <Link to="/item/write">
                            <div><BsPencilSquare/></div>
                            <span>상품등록</span>
                        </Link>
                    }
                </div>
            </div>
            <div className="directPlusBtn" onClick={handlerHideNshow}>
                <BsFillPlusCircleFill/>
            </div>
        </div>
    </DirectMenu>  
    );
}

const DirectMenu = styled.div`
 .directMenu {
    position: relative;
 }

 .hideNshow {
    width: 90px;
    height: 270px;
    background-color: rgba(88, 145, 112, 0.1);
    border-radius: 50px;
    position: relative;
 }

 .directPlusBtn, .directBtn > a {
    width: 90px;
    height: 90px;
    // background-color: pink;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #555;
 }

 .directPlusBtn {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    cursor: pointer;
 }

 .directPlusBtn > svg {
    width: 100%;
    height: 100%;
    color: rgb(88, 145, 112);
 }

 .directBtn > a {
    text-decoration: none;
    font-size: 14px;
 }

 .directBtn > a > div > svg {
    font-size: 37px;
    margin-bottom: 3px;
 }

 .show {
    visibility: visible;
 }

 .hide {
    visibility: hidden;
 }
 
`