import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./find.css";

function Idfind() {

    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');

    const inputName = (e) => setMemberName(e.target.value);
    const inputEmail = (e) => setMemberEmail(e.target.value);

    const memberInfo = {
        "memberName" : memberName,
        "memberEmail" : memberEmail
    }

    const findId = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/member/id`, memberInfo)
            .then(response => {
                if (response.status === 200 && response.status !== "") {
                    sessionStorage.setItem("memberName", response.data.memberName);
                    sessionStorage.setItem("memberEmail", response.data.memberEmail);
                    window.location.href = "/member/id/find";
                } else {
                    alert("아이디를 확인할 수 없습니다.");
                    return;
                }
            })
            .catch(error => {
                alert("이름 또는 이메일을 확인해주세요.");
                console.log(memberInfo);
            });
            
    }
   
    return (
        <div className="inputLogTable">
        <div className="joinWrap memberPagelog container">
            
            <div className="pageTitle">
                <h2>아이디 찾기</h2>
                <hr />
                <br></br>
                <p>회원 가입시 등록하신 정보로 아이디를 찾을수 있습니다</p>
              
                <br></br>
                <br></br>

            </div>
            <form>
                <div className="inputTable">
                    <table>
                        <tbody>
                            <tr>

                                <td>
                                     <input className="findByName" type ="text" value={memberName} onChange={inputName} placeholder="이름을 입력하세요" required/>
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
                            <Link to ="/member/id/find"><input type="submit" className="greenBtn btnlog" value="확인" onClick={findId}/></Link>
                            <Link to="/member/pw"><button className="grayBtn btnlog">비밀번호 찾기</button></Link>
                        </div>
                    </table>
                </div>
                <br/>
                <br/>
                <li>아이디를 찾지 못하셨다면 고객센터(1017-1130)로 문의해주세요.</li>
                <li>아직 내모 회원이 아니신가요? &nbsp; 
                    <Link to="/member/join">회원가입</Link>

               </li>
            </form>
            </div>
        </div>
    );
}

export default Idfind;