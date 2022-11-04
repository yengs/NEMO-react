import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./find.css";
function Idfind() {

   
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
                                    {/* <input type="name" value={Iname} onChange={findId} required />
                                     */}
                                     <input className="holder" type ="name" placeholder="이름을 입력하세요"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    {/* <input type="email" value={Iemail} onChange={findEmail} required /> */}
                                    <input type ="text"  placeholder="이메일을 입력하세요"/>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                        <br/>
                        <div className="btnWrap">
                        <Link to ="/member/id/find"><input type="submit" className="greenBtn btnlog"  value="확인"  /></Link>
                    {/* <input type="button" value="취소" className="grayBtn btn" /> */}
                    <Link to="/member/pw"><button  className="grayBtn btnlog">비밀번호 찾기</button></Link>

                </div>
                    </table>
                </div>
                <br/>
                <br/>
                <li>아이디를 찾지 못하셨다면 고객센터(1111-1111)로 문의주세요.</li>
                <li>아직 내모 회원이 아니시라면 회원가입을 해주세요. &nbsp; 
                    <Link to="/member/join">바로가기</Link>

               </li>
            </form>
            </div>
        </div>
    );
}

export default Idfind;