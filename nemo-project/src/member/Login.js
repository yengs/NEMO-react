import axios from "axios";
import { useState } from "react";

function Login() {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const changeId = (e) => setId(e.target.value);
    const changePw = (e) => setPw(e.target.value);
    const handlerSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/member/login', { "memberId": id, "memberPw": pw })
            .then(response => {
                if (response.status === 200) {
                    alert("로그인완료");
                } else {
                    alert("회원가입 실패");
                    return;
                }
            })
            .catch(error => {
                alert("에러");
            });
    };
    return (
        <div className="joinWrap memberPage container">
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
                                <td></td>
                            </tr>
                            <tr>
                                <td>패스워드</td>
                                <td>
                                    <input type="pw" value={pw} onChange={changePw} required />
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="btnWrap">
                    <input type="button" value="취소" className="grayBtn btn" />
                    <input type="submit" className="greenBtn btn" onClick={handlerSubmit} value="로그인" />
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