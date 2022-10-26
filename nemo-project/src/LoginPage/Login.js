import axios from "axios";
import { useEffect, useState } from "react";

function Login(){
    const [datas, setDatas] = useState([]);
    const [memberId, setMemberId] = useState('');
    const [memberPw, setMemberPw] = useState('');

    const Loginpage = () => {
        if (memberId === "" || memberPw === ""){
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/nemo/login`)
            .then(response => {
                console.log(response); //값 들어오나 확인하기 위해
                setDatas(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className="container">
                <h2>로그인</h2>
                <form id="login">
                    <table className="login_detail">
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" id="ID" name="ID" value={memberId}></input></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" id="PW" name="PW" value={memberPw}></input></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox">아이디 기억하기</input></td>
                        </tr>
                        <input type="submit">완료</input>
                        <input type="button" onClick="alert('취소하시겠습니까?')" value="취소"/>
                    </table>
                </form>
            </div>
        </>
    )

}

export default Login;