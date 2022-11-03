import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./find.css";
function Idfind_Result() {

   
    return (
        <div className="inputLogTable">
        <div className="joinWrap memberPagelog container">
            
            <div className="pageTitle">
                <h2>아이디 찾기 결과</h2>
                <hr />
                <br></br>
                <h3>본인인증으로 가입된 아이디가 있습니다.</h3>
              
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
                                     아이디 : 이예린
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
                    {/* <input type="button" value="취소" className="grayBtn btn" /> */}
                    <Link to="/pw"><button  className="grayBtn btnlog">비밀번호 찾기</button></Link>

                </div>
                    </table>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Idfind_Result;