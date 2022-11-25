import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./find.css";

function Pwfind({history}) {

    const [memberId, setMemberId] = useState('');
    const [mEmail, setMemail] = useState('');

    const inputId = (e) => setMemberId(e.target.value);
    const handlerChangeEmail = (e) => setMemail(e.target.value);
    // const inputEmail = (e) => setMemberEmail(e.target.value);

    const memberInfo = {
        "memberId" : memberId,
        "memberEmail" : mEmail
    }

    const findPw = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/member/pw`, memberInfo)
            .then(response => {
                if (response.status === 200 && response.status !== ""){
                    alert("귀하의 이메일로 코드가 발송되었습니다");
                    sessionStorage.setItem("memberId", response.data.memberId);
                    sessionStorage.setItem("memberEmail", response.data.memberEmail);
                    
                    axios.get(`http://localhost:8080/api/mail`, {
                        params: {
                            memberEmail: mEmail
                        }
                    }) .then(response2 => {
                        console.log(response2);
                        setCode(response2.data);
                    })
                    .catch(function () {
                        console.log('실패함')
                    })
                } else {
                    alert("실패함");
                    return;
                }
            })
            .catch(error => {
                alert("아이디 또는 이메일을 확인해주세요.");
                console.log(memberInfo);
            });
    }


    // 이메일 관련 --------------------------------

    const [code, setCode] = useState(0);
    const [userInputCode, setUserInputCode] = useState();
    const handlerChangeUserInputCode = (e) => setUserInputCode(Number(e.target.value));


     //이메일 코드 일치확인
     const clickCode = () => {
        if(memberId =='' || mEmail ==''){
            alert('입력란을 작성해주세요')
        } else if (String(userInputCode).length !== 5) {
            alert('5자리의 숫자코드를 입력해주세요.');
        } else if (code !== userInputCode) {
           alert('이메일 코드가 일치하지 않습니다.');
        } else if (code === userInputCode) {
            alert('본인인증이 완료되었습니다.')
             history.push("/member/pw/find");
        }
    }


   
    return (
        <div className="inputLogTable2">
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
                                  <div className="email-search" >
                                       <input className="email-input"value={mEmail} onChange={handlerChangeEmail} placeholder="이메일을 입력하세요" required/>
                                       <button  onClick={findPw} className="email-botton" type="submit">인증하기</button>
                                 </div>
                               </td>
                            </tr>
                            <tr>
                                 <td>
                                     <input type="text" name="Code" value={userInputCode}  placeholder="발송된 코드를 입력하세요" onChange={handlerChangeUserInputCode} required/>

                                 </td>
                                       
                            </tr>
                            <tr></tr>
                        </tbody>
                        <br/>
                        <div className="btnWrap">
                             <input type="submit" className="greenBtn btnlog"  onClick={clickCode} value="확인"/>
                            <Link to="/member/id"><button className="grayBtn btnlog">아이디 찾기</button></Link>
                        </div>
                    </table>
                </div>
                <br/>
                <br/>
                <li>비밀번호를 찾지 못하셨다면 고객센터(1017-1130)로 문의해주세요.</li>
                <li>아직 내모 회원이 아니신가요? &nbsp; 
                    <Link to="/member/join">회원가입</Link>

               </li>
            </form>
            </div>
        </div>
    );
}

export default Pwfind;