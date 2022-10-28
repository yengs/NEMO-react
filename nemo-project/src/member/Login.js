import axios from "axios";
import { useState } from "react";

function Login ({ history }) {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const changeId = (e) => setId(e.target.value);
    const changePw = (e) => setPw(e.target.value);
    const handlerSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/member/login', {"memberId": id, "memberPw": pw})
        .then(response => { 
            if (response.status === 200 && response.data != "") {
                sessionStorage.setItem("token", response.data);
                history.push('/member');
            } else {
                sessionStorage.clear();
            }
        })
        .catch(error => {
            console.log(error);
            sessionStorage.clear();
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