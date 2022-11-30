import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./find.css";

function Pwfind_Result() {

    const [ memberPw, setMemberPw ] = useState('') ;

    useEffect(() => {
        console.log(sessionStorage.getItem("memberId"));

        axios.get(`http://localhost:8080/api/member/pw/find/${sessionStorage.getItem("memberId")}`)
            .then(response => {
                console.log(response);
                setMemberPw(response.data.memberPw);
            })
            .catch(error => { console.log(error.response) });
    }, []);
   
    return (
        <div className="inputLogTable">
        <div className="joinWrap memberPagelog container">
            
            <div className="pageTitle">
                <h2>비밀번호 찾기 결과</h2>
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
                                <td>아이디 : </td>
                                <td className="nmNid">{sessionStorage.getItem("memberId")}</td>
                                </tr>
                               <tr>
                                <td>비밀번호 : </td>
                                <td className="nmNid">{memberPw}</td>
                               </tr>
                               </div>
                        </tbody>
                        <br/>
                        <div className="btnWrap">
                        <Link to ="/member/login" ><input type="submit" className="greenBtn btnlog"  value="로그인 하기"  /></Link>
                        <Link to="/member/id"><button  className="grayBtn btnlog">아이디 찾기</button></Link>

                </div>
                    </table>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Pwfind_Result;