import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./find.css";

function Pwfind() {

    const [memberId, setMemberId] = useState('');
    const [memberEmail, setMemberEmail] = useState('');

    const inputId = (e) => setMemberId(e.target.value);
    const inputEmail = (e) => setMemberEmail(e.target.value);

    const memberInfo = {
        "memberId" : memberId,
        "memberEmail" : memberEmail
    }

    const findPw = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/member/pw`, memberInfo)
            .then(response => {
                if (response.status === 200 && response.status !== ""){
                    sessionStorage.setItem("memberId", response.data.memberId);
                    sessionStorage.setItem("memberEmail", response.data.memberEmail);
                    window.location.href = "/member/pw/find";
                } else {
                    alert("비밀번호를 확인할 수 없습니다.");
                    return;
                }
            })
            .catch(error => {
                alert("Error!!!");
                console.log(memberInfo);
            });
    }

   
    return (
        <div className="inputLogTable">
        <div className="joinWrap memberPagelog container">
            
            <div className="pageTitle">
                <h2>비밀번호 찾기</h2>
                <hr />
                <br></br>
                <p>회원 가입시 등록하신 정보로 비밀번호를 찾을수 있습니다</p>
              
                <br></br>
                <br></br>

            </div>
            <form>
                <div className="inputTable">
                    <table>
                        <tbody>
                            <tr>

                                <td>
                                     <input className="findById" type ="text" value={memberId} onChange={inputId} placeholder="아이디를 입력하세요" required/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input className="findByEmail" type ="text" value={memberEmail} onChange={inputEmail} placeholder="이메일을 입력하세요" required/>
                                </td>
                            </tr>
                        </tbody>
                        <br/>
                        <div className="btnWrap">
                            <Link to ="/member/pw/find"><input type="submit" className="greenBtn btnlog" onClick={findPw} value="확인"/></Link>
                            <Link to="/member/id"><button className="grayBtn btnlog">아이디 찾기</button></Link>
                        </div>
                    </table>
                </div>
                <br/>
                <br/>
                <li>비밀번호를 찾지 못하셨다면 고객센터(1111-1111)로 문의해주세요.</li>
                <li>아직 내모 회원이 아니신가요? &nbsp; 
                    <Link to="/member/join">회원가입</Link>

               </li>
            </form>
            </div>
        </div>
    );
}

export default Pwfind;