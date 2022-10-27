import { useState } from "react";
import axios from "axios";

function Join() {

    const [mName, setMname] = useState('');
    const [mNickname, setMnickname] = useState('');
    const [mId, setMid] = useState('');
    const [mPw, setMpw] = useState('');
    const [mPwCheck, setMpwCheck] = useState('');
    const [mEmail, setMemail] = useState('');
    const [mPhone, setMphone] = useState('');
    const [mAddress, setMaddress] = useState('');

    const handlerChangeName = (e) => setMname(e.target.value);
    const handlerChangeNickname = (e) => setMnickname(e.target.value);
    const handlerChangeId = (e) => setMid(e.target.value);
    const handlerChangePw = (e) => setMpw(e.target.value);
    const handlerChangePwCheck = (e) => setMpwCheck(e.target.value);
    const handlerChangeEmail = (e) => setMemail(e.target.value);
    const handlerChangePhone = (e) => setMphone(e.target.value);
    const handlerChangeAddress = (e) => setMaddress(e.target.value);

    const memberDataInsert = (e) => {
        e.preventDefault();

        const memberInfo = {
            "memberName" : mName,
            "memberNickname" : mNickname,
            "memberId" : mId,
            "memberPw" : mPw,
            "memberEmail" : mEmail,
            "memberPhone" : mPhone,
            "memberAddress" : mAddress
        }

        axios.post('http://localhost:8080/api/member/join', memberInfo)
        .then(response => {
            if(response.status === 200) {
                alert("회원가입완료");
            } else {
                alert("회원가입 실패");
                return;
            }
        })
        .catch(error => {
            alert("에러");
            console.log(memberInfo);
        });
    };

    return (
        <div className="joinWrap memberPage">
            <div className="pageTitle">
                <h2>회원가입</h2>
            </div>
            <form>
                <div className="requiredMark requiredInfo"><span>필수입력항목</span></div>
                <div className="inputTable">
                    <table>
                        <tbody>
                            <tr>
                                <td className="requiredMark">이름</td>
                                <td>
                                    <input type="text" name="mName" value={mName} onChange={handlerChangeName} required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="requiredMark">닉네임</td>
                                <td>
                                    <input type="text" name="mNickname" value={mNickname} onChange={handlerChangeNickname} required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="requiredMark">아이디</td>
                                <td>
                                    <input type="text" name="mId" value={mId} onChange={handlerChangeId} required />
                                </td>
                                <td className="memberTableBtn">
                                    <button className="beigeBtn">중복확인</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">패스워드</td>
                                <td>
                                    <input type="password" name="mPw" value={mPw} onChange={handlerChangePw} required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="requiredMark">패스워드확인</td>
                                <td>
                                    <input type="password" name="mIdCheck" value={mPwCheck} onChange={handlerChangePwCheck} required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="requiredMark">이메일</td>
                                <td>
                                    <input type="text" name="mEmail" value={mEmail} onChange={handlerChangeEmail} required />
                                </td>
                                <td className="memberTableBtn">
                                    <button className="beigeBtn">중복확인</button>
                                </td>
                            </tr>
                            <tr>
                                <td>핸드폰 번호</td>
                                <td>
                                    <input type="text" name="mPhone" value={mPhone} onChange={handlerChangePhone} />
                                </td>
                                <td></td>
                            </tr>
                            <tr className="memberAddress">
                                <td className="requiredMark">주소</td>
                                <td>
                                    <input type="text" name="mAddress" value={mAddress} onChange={handlerChangeAddress} required />
                                    <select>
                                        <option>서울</option>
                                        <option>경기</option>
                                        <option>강원</option>
                                        <option>충북</option>
                                        <option>충남</option>
                                        <option>경븍</option>
                                        <option>경남</option>
                                        <option>전북</option>
                                        <option>전남</option>
                                    </select>
                                    <select>
                                        <option>강남구</option>
                                        <option>강북구</option>
                                        <option>강동구</option>
                                        <option>강서구</option>
                                        <option>송파구</option>
                                        <option>관악구</option>
                                        <option>등등</option>
                                    </select>
                                    <select>
                                        <option>봉천동</option>
                                        <option>행운동</option>
                                        <option>신림동</option>
                                        <option>남현동</option>
                                        <option>보라매동</option>
                                        <option>청림동</option>
                                        <option>성현동</option>
                                        <option>등등</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="accept">
                    <ul style={{"listStyle":"none"}}>
                        <li>
                            <label className="wholeCheck">
                                <input type="checkbox" />
                                &nbsp;&nbsp;전체동의
                                <span className="wholeCheckInfo">전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.<br /> 선택항목에 대한 동의를 거부하는 경우에도 회원가입 서비스는 이용 가능합니다.</span>
                            </label>
                        </li>
                        <li>
                            <label className="req">
                                <input type="checkbox" />
                                &nbsp;&nbsp;만 14세 이상입니다. (필수)
                            </label>
                        </li>
                        <li>
                        <label className="req">
                                <input type="checkbox" />
                                &nbsp;&nbsp;이용약관 동의 (필수)
                            </label>
                        </li>
                        <li>
                        <label className="req">
                                <input type="checkbox" />
                                &nbsp;&nbsp;개인정보 수집 및 이용에 대한 동의 (필수)
                            </label>
                        </li>
                        <li>
                        <label className="req">
                                <input type="checkbox" />
                                &nbsp;&nbsp;개인정보 제3자 제공에 대한 동의 (필수)
                            </label>
                        </li>
                        <li>
                        <label className="selective">
                                <input type="checkbox" />
                                &nbsp;&nbsp;개인정보 제3자 제공에 대한 동의 (선택)
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="btnWrap">
                    <input type="button" value="취소" className="grayBtn btn" />
                    <input type="submit" value="확인" className="greenBtn btn" onClick={memberDataInsert} />
                </div>
            </form>
        </div>
    )
}

export default Join;