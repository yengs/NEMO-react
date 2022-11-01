import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./find.css";
function Idfind() {

   
    return (
        <div className="joinWrap memberPage2 container">
            <div className="pageTitle">
                <h2>아이디찾기</h2>
                <hr></hr>
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
                                     <input type ="name" placeholder="이름을 입력하세요"/>
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
                        <input type="submit" className="greenBtn btnlog"  value="확인"  />
                    {/* <input type="button" value="취소" className="grayBtn btn" /> */}
                    <Link to="/pw"><button  className="grayBtn btnlog">비밀번호 찾기</button></Link>

                </div>
                    </table>
                </div>

                
                {/* <div><Link to="/member/join">회원가입</Link></div> */}
              
            </form>
        </div>
    );
}

export default Idfind;