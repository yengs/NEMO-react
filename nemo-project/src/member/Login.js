import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import GoogleLogin from "../img/btn_google_signin_dark_normal_web@2x.png";

function Login({ history }) {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const changeId = (e) => setId(e.target.value);
    const changePw = (e) => setPw(e.target.value);
    const handlerSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/member/login', { "memberId": id, "memberPw": pw })
        .then(response => {
            if (response.status === 200 && response.data != "") {
                    console.log(response.headers);
                    let jwtToken = response.headers.get("jwtToken");
                    console.log(response.data);
                    console.log("토큰!!!!!!!!!!!!!!!!! : " + jwtToken);

                    sessionStorage.setItem("jwtToken",jwtToken);
                    alert("로그인완료");
                    window.location.reload();
                    window.location.href = "/";
                    
                } else {
                    sessionStorage.clear();
                    alert("로그인 실패");
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
                                <td style={{ borderTop: 'none' }}>패스워드</td>
                                <td style={{ borderTop: 'none' }}>
                                    <input type="pw" value={pw} onChange={changePw} required />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="rememberId">
                                    <label className="rememberIdLabel">
                                        <input type="checkbox" id="rememberIdCheckbox" />
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
                    <Link to="/member/join" className="btn grayBtn joinBtn">회원가입</Link>
                    <Link to="/" className="btn googleLoginBtnLink">
                        <div style={{backgroundImage: `url(${GoogleLogin})`}} className="googleLoginBtn"></div>
                    </Link>
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