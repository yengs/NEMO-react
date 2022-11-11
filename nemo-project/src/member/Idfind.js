import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./find.css";

function Idfind() {

    const [iName, setIname] = useState('');
    const [iEmail, setIemail] = useState('');

    const iId = sessionStorage.getItem('memberId');

    const inputName = (e) => setIname(e.target.value);
    const inputEmail = (e) => setIemail(e.target.value);

    const findId = (e) => {
        e.preventDefault();

        console.log(iName);

        axios.post('http://localhost:8080/api/member/id', {'memberName': iName, 'memberEmail': iEmail, 'memberId' : iId})
            .then(response => {
                if (response.status === 200) {
                    window.location.href = "/member/id/find";
                } else {
                    alert("아이디를 확인할 수 없습니다.");
                    return;
                }
            })
            .catch(error => {
                alert("Error");
                console.log(error);
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
                                    {/* <input type="name" value={iName} onChange={findId} required />
                                     */}
                                     <input className="findByName" type ="text" onChange={inputName} placeholder="이름을 입력하세요"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    {/* <input type="email" value={iEmail} onChange={findEmail} required /> */}
                                    <input className="findByEmail" type ="text" onChange={inputEmail} placeholder="이메일을 입력하세요"/>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                        <br/>
                        <div className="btnWrap">
                            {/* V onchange이벤트로 확인 눌렀을 때 서버로 가서 찾을 수 있게 하기 */}
                            <button value="submit" onClick={findId}>아이디 찾긔</button>
                        <Link to ="/member/id/find"><input type="submit" className="greenBtn btnlog" value="확인" /></Link>
                    {/* <input type="button" value="취소" className="grayBtn btn" /> */}
                    <Link to="/member/pw"><button className="grayBtn btnlog">비밀번호 찾기</button></Link>

                </div>
                    </table>
                </div>
                <br/>
                <br/>
                <li>아이디를 찾지 못하셨다면 고객센터(1111-1111)로 문의주세요.</li>
                <li>아직 내모 회원이 아니신가요? &nbsp; 
                    <Link to="/member/join">회원가입</Link>

               </li>
            </form>
            </div>
        </div>
    );
}

export default Idfind;