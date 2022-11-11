import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./find.css";
function Idfind_Result({match}) {

    const [datas, setDatas] = useState([]);

    const [iName, setIname] = useState('');
    const [iEmail, setIemail] = useState('');
    const [iId, setIid] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/member/id`, { headers: { "Authorization" : `Bearer ${sessionStorage.getitem("jwtToken")}` }})
            .then(response => setDatas(response.data))
            .catch(error => console.log(error));
    }, []);
   
    return (
        <div className="inputLogTable">
        <div className="joinWrap memberPagelog container">
            
            <div className="pageTitle">
                <h2>아이디 찾기 결과</h2>
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
                                <td>
                                     아이디 :
                                </td>
                                <td>{iId}</td>
                                </tr>
                               <tr>
                                <td >
                                이름 : 
                                <td>{iName}</td>
                                </td>
                               </tr>
                               </div>
                        </tbody>
                        <br/>
                        <div className="btnWrap">
                        <Link to ="/member/login" ><input type="submit" className="greenBtn btnlog"  value="로그인 하기"  /></Link>
                    {/* <input type="button" value="취소" className="grayBtn btn" /> */}
                    <Link to="/member/pw"><button  className="grayBtn btnlog">비밀번호 찾기</button></Link>

                </div>
                    </table>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Idfind_Result;