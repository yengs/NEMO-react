import axios from "axios";
import { useState } from "react";

function Login () {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const changeId = (e) => setId(e.target.value);
    const changePw = (e) => setPw(e.target.value);
    const handlerSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/login', {"memberId": id, "memberPw": pw})
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
        <>
            <form>
                <p>
                    Id: <input type="id" value={id} onChange={changeId} />
                </p>
                <p>
                    Password: <input type="pw" value={pw} onChange={changePw} />
                </p>
                <p>
                    <input type="submit" onClick={handlerSubmit} value="로그인" />
                </p>
            </form>
        </>
    );
}

export default Login;