import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./find.css";

function Idfind_Result() {

    const [ memberId, setMemberId ] = useState('');

    useEffect(() => {
        console.log(sessionStorage.getItem("memberEmail"));

        // axios get이랑 spring의 get 주소 맞춰주기!
        axios.get(`http://localhost:8080/api/member/id/find/${sessionStorage.getItem("memberEmail")}`) 
            .then(response => {
                console.log(response);
                setMemberId(response.data.memberId);
            })
            .catch(error => { console.log(error.response) });
    }, []);

    return (
        <div className="inputLogTable">
        <div className="joinWrap memberPagelog container">
            
            <div className="pageTitle">
                <h2>아이디 찾기 결과</h2>
                <hr />
                <br></br>
                <h3>아래 정보로 가입된 기록이 있습니다.</h3>
                <br></br>
                <br></br>

            </div>
            <form>
                <div className="inputTable">
                    <table>
                        <tbody>
                            <div className="find">
                               <tr>
                                <td >이름 : </td>
                                <td className="nmNid">{sessionStorage.getItem("memberName")}</td>
                               </tr>
                               <tr>
                                <td>아이디 : </td>
                                <td className="nmNid">{memberId}</td>
                                </tr>
                               </div>
                        </tbody>
                        <br/>
                        <div className="btnWrap">
                            <Link to ="/member/login" ><input type="submit" className="greenBtn btnlog"  value="로그인 하기"  /></Link>
                            <Link to="/member/pw"><button  className="grayBtn btnlog">비밀번호 찾기</button></Link>
                        </div>
                    </table>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Idfind_Result;