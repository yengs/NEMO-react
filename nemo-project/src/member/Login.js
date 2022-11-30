import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";

import GoogleLogin from "../img/btn_google_signin_dark_normal_web@2x.png";

function Login({ history }) {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const changeId = (e) => { setId(e.target.value); };
    const changePw = (e) => setPw(e.target.value);

    /*====== Cookie 관련 선언======*/
    const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
    const [isRemember, setIsRemember] = useState(false);

    useEffect(() => {
        if (cookies.rememberId !== undefined) {
            setId(cookies.rememberId);
            setIsRemember(true);
        } else if (cookies.rememberId === '' || cookies.rememberId === null || cookies === undefined) {
            removeCookie('rememberId');
        }
    }, []);


    const handlerCheck = (e) => {
        setIsRemember(e.target.checked);
        console.log(id);
        if (isRemember === true) {
            if (id === '' || id === null || id === undefined) {
                changeId();
                setCookie('rememberId', id);
            }
        } else {
            removeCookie('rememberId');
        }
        // console.log(isRemember);
    }

    const checkid = () => {
        console.log("????????" + id);

        if (isRemember === true) {
            setCookie('rememberId', id);
        } else {
            removeCookie('rememberId');
        }
        console.log("체크된거 :: " + isRemember);

        console.log("쿠키값 : " + cookies.rememberId);
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/member/login', { "memberId": id, "memberPw": pw })
            .then(response => {
                if (response.status === 200 && response.data !== "") {
                    let jwtToken = response.headers.get("jwtToken");

                    console.log(response.data);

                    sessionStorage.setItem("jwtToken", jwtToken);
                    sessionStorage.setItem("memberNum", response.data.memberNum);
                    sessionStorage.setItem("memberId", id);
                    sessionStorage.setItem("memberNickname", response.data.memberNickname);
                    sessionStorage.setItem("memberImg", response.data.memberImg);

                    localStorage.setItem("memberIdLocal", id);

                    console.log(response.data.currentState);
                    if(response.data.currentState === 'Y') {
                        alert("정지된 회원입니다.")
                        sessionStorage.clear();
                    } else {
                        // alert("로그인완료");
                        alert("반갑습니다! " + id + " 회원님");
                        if(id == "admin"){
                        window.location.href = "/admin/dec";
                        }else{
                        window.location.reload();
                        window.location.href = "/";
                        }
                        if (isRemember === true) {
                            setCookie('rememberId', id);
                        } else {
                            removeCookie('rememberId');
                        }
                    }




                } else if(response.data === ''){
                    sessionStorage.clear();
                    console.log(response.data)
                    alert("아이디나 비밀번호를 다시 확인해주세요");
                    return;
                }
            })
            .catch(error => {
                sessionStorage.clear();
                console.log(error);
                alert("에러");
            });
    };


    return (
        <div className="joinWrap memberPage container loginForm">
            <div className="pageTitle">
                <h2>로그인</h2>
            </div>
            <form>
                <div className="inputTable">
                    <table>
                        <tbody>
                            <tr>
                                <td>아이디</td>
                                <td>
                                    <input type="id" value={id} onChange={changeId} required />
                                </td>
                                <td rowSpan={2}>
                                    <div className="btnWrap">
                                        <input type="submit" className="greenBtn btn loginBtn" onClick={handlerSubmit} value="로그인" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderTop: 'none' }}>비밀번호</td>
                                <td style={{ borderTop: 'none' }}>
                                    <input type="password" value={pw} onChange={changePw} required />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="rememberId">
                                    <label className="rememberIdLabel">
                                        <input type="checkbox" id="rememberIdCheckbox" onChange={handlerCheck} checked={isRemember} />
                                        <p>아이디 기억하기</p>
                                    </label>
                                </td>
                                <td className="findMemberInfo">
                                    <div>
                                        <Link to="Id">아이디 찾기</Link>
                                        <Link to="Pw">비밀번호 찾기</Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="btnWrap">
                    <p style={{marginRight:'10px', color:"#666"}}>지금 바로 내모회원이 되어 내모를 이용해보세요!</p>
                    <Link to="/member/join" className="btn grayBtn joinBtn">회원가입</Link>
                    {/* <Link to="/" className="btn googleLoginBtnLink">
                        <div style={{ backgroundImage: `url(${GoogleLogin})` }} className="googleLoginBtn"></div>
                    </Link> */}
                </div>
                {/* <div className="socialLogin">
                <p>소셜로 로그인하기</p>
                <div className="btnWrap">
                    <input type="button" className="btn" value="구글로 로그인" />
                </div>
            </div> */}
            </form>
        </div>
    );
}

export default Login;