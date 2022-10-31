import axios from "axios";
import { useState, useEffect } from "react";

function Login () {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleId = (e) => {
        setId(e.target.value)
    }

    const handlePw = (e) => {
        setPw(e.target.value)
    }

    const onClickLogin = () => {
        console.log('click login')
    }

    useEffect(() => {
        axios.get('/member/login')
        .then(res => console.log(res))
        .catch()
    },
    [])
    
    return (
        <>
            <form>
                <p>
                    Id: <input type="id" value={id} onChange={handleId} />
                </p>
                <p>
                    Pw: <input type="password" value={pw} onChange={handlePw} />
                </p>
                <p>
                    <input type="submit" onClick={onClickLogin} value="로그인" />
                </p>
            </form>
        </>
    );
}

export default Login;