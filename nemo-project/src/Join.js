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

        axios.post('http://localhost:8080/api/member/join', 
        {
            memberInfo
        })
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
        <>
            <div className="pageTitle">
                <h2>회원가입</h2>
            </div>
            <form>
                <div className="inputTable">
                    <div className="requiredMark">필수입력항목</div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="requiredMark">이름</td>
                                <td colSpan="2">
                                    <input type="text" name="mName" value={mName} onChange={handlerChangeName} required />
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">닉네임</td>
                                <td colSpan="2">
                                    <input type="text" name="mNickname" value={mNickname} onChange={handlerChangeNickname} required />
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">아이디</td>
                                <td>
                                    <input type="text" name="mId" value={mId} onChange={handlerChangeId} required />
                                </td>
                                <td>
                                    <button>중복확인</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">패스워드</td>
                                <td colSpan="2">
                                    <input type="text" name="mPw" value={mPw} onChange={handlerChangePw} required />
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">패스워드확인</td>
                                <td colSpan="2">
                                    <input type="text" name="mIdCheck" value={mPwCheck} onChange={handlerChangePwCheck} required />
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">이메일</td>
                                <td>
                                    <input type="text" name="mEmail" value={mEmail} onChange={handlerChangeEmail} required />
                                </td>
                                <td>
                                    <button>중복확인</button>
                                </td>
                            </tr>
                            <tr>
                                <td>핸드폰 번호</td>
                                <td colSpan="2">
                                    <input type="text" name="mPhone" value={mPhone} onChange={handlerChangePhone} />
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">주소</td>
                                <td colSpan="2">
                                    <input type="text" name="mAddress" value={mAddress} onChange={handlerChangeAddress} required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="accept">
                    <ul style={{"listStyle":"none"}}>
                        <li>
                            <input type="checkbox" />
                            <span>전체동의</span>
                        </li>
                        <li>
                            <input type="checkbox" />
                            <span className="req">만 14세 이상입니다.</span>
                        </li>
                        <li>
                            <input type="checkbox" />
                            <span className="req">이용약관 동의</span>
                        </li>
                        <li>
                            <input type="checkbox" />
                            <span className="req">개인정보 수집 및 이용에 대한 동의</span>
                        </li>
                        <li>
                            <input type="checkbox" />
                            <span className="req">개인정보 제3자 제공에 대한 동의</span>
                        </li>
                        <li>
                            <input type="checkbox" />
                            <span className="selctive">개인정보 제3자 제공에 대한 동의</span>
                        </li>
                    </ul>
                </div>
                <div className="btnWrap">
                    <input type="button" value="취소" className="grayBtn" />
                    <input type="submit" value="확인" className="greenBtn" onClick={memberDataInsert} />
                </div>
            </form>
        </>
    )
}

export default Join;