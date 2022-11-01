import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Idfind_Result() {

   
    return (
        <div className="joinWrap memberPage container">
            <div className="pageTitle">
                <h2>아이디찾기</h2>
            </div>
            <form>
                <div className="inputTable">
                    <table>
                        <tbody>
                            <tr>
                                <td>이름</td>
                                <td>
                                    {/* <input type="name" value={Iname} onChange={findId} required />
                                     */}
                                     <input type ="text"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>이메일</td>
                                <td>
                                    {/* <input type="email" value={Iemail} onChange={findEmail} required /> */}
                                    <input type ="text"/>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="btnWrap">
                    <input type="button" value="취소" className="grayBtn btn" />
                    {/* <input type="submit" className="greenBtn btn" onClick={handlerIdsubmit} value="아이디찾기" /> */}
                    <input type="submit" className="greenBtn btn" value="아이디찾기" />

                </div>
                {/* <div><Link to="/member/join">회원가입</Link></div> */}
              
            </form>
        </div>
    );
}

export default Idfind_Result;