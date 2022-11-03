import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./find.css";
function Pwfind_Result() {

   
    return (
        <div className="inputLogTable">
        <div className="joinWrap memberPagelog container">
            
            <div className="pageTitle">
                <h2>비밀번호 찾기 결과</h2>
                <hr />
                <br></br>
                <h3>본인인증으로 가입된 비밀번호가 있습니다.</h3>
              
                <br></br>
                <br></br>

            </div>
            <form>
                <div className="inputTable">
                    <table>
                        <tbody>
                            <div className="find">
                            <tr>
                                <td>
                                     비밀번호 : 1234
                                </td>
                                </tr>
                               <tr>
                                <td >
                                    가입날짜 : 2022.11.01 
                                </td>
                               </tr>
                               </div>
                        </tbody>
                        <br/>
                        <div className="btnWrap">
                        <Link to ="/member/login" ><input type="submit" className="greenBtn btnlog"  value="로그인하러가기"  /></Link>
                        <Link to="/id"><button  className="grayBtn btnlog">아이디 찾기</button></Link>

                </div>
                    </table>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Pwfind_Result;