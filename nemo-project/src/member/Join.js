import { useCallback, useState } from "react";
import axios from "axios";
import { ErrorMessage } from '@hookform/error-message';

// 주소 api사용 (팝업방식)
import { useDaumPostcodePopup } from 'react-daum-postcode';

function Join() {

    
    const [mName, setMname] = useState('');
    const [mNickname, setMnickname] = useState('');
    const [mId, setMid] = useState('');
    const [mPw, setMpw] = useState('');
    const [mPwCheck, setMpwCheck] = useState('');
    const [mEmail, setMemail] = useState('');
    const [mPhone, setMphone] = useState('');
    const [mAddress, setMaddress] = useState('');
    const [mZipCode, setMzipCode] = useState('');

    const [mSigungu, setMsigungu] = useState('');
    
    const handlerChangeName = (e) => setMname(e.target.value);
    const handlerChangeNickname = (e) => setMnickname(e.target.value);
    const handlerChangeId = (e) => setMid(e.target.value);
    const handlerChangePw = (e) => setMpw(e.target.value);
    const handlerChangePwCheck = (e) => setMpwCheck(e.target.value);
    const handlerChangeEmail = (e) => setMemail(e.target.value);
    const handlerChangePhone = (e) => setMphone(e.target.value);
    

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setMaddress(fullAddress);
        setMzipCode(data.zonecode);
        setMsigungu(data.sigungu);

        //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    // 주소검색창 팝업열기
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
    const handleOpenSearchAddress = () => {
        open({ onComplete: handleComplete });
    };


    const memberDataInsert = (e) => {
        e.preventDefault();
        
        const memberInfo = {
            "memberName": mName,
            "memberNickname": mNickname,
            "memberId": mId,
            "memberPw": mPw,
            "memberEmail": mEmail,
            "memberPhone": mPhone,
            "memberAddress": mAddress,
            "memberZipCode" : mZipCode,
            "memberSigungu" : mSigungu
        }

        if(mPw !== mPwCheck){
            return setPasswordError(true);
        }

        console.log("비밀번호: " + mPw);
        console.log("비밀번호 확인: " + mPwCheck);

        axios.post('http://localhost:8080/api/member/join', memberInfo)
            .then(response => {
                if (response.status === 200) {
                    alert("반갑습니다! " + mName + " 회원님.");
                    window.location.href = "/member/login";
                } else {
                    alert("회원가입이 실패하였습니다.");
                    return;
                }
            })
            .catch(error => {
                alert("Error");
                console.log(memberInfo);
            });
    };
    
    // 비밀번호 일치 확인
    // const [mPw, setMpw] = useState('');
    // const [mPwCheck, setMpwCheck] = useState('');
    const [mPwConfirm, setMpwConfirm] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onChangePasswordChk = (e) => {
        setPasswordError(e.target.value !== mPw);
        setMpwCheck(e.target.value);
    };

    // 아이디 중복 체크
    const checkId = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/member/join/checkid', `memberId=${mId}`)
            .then(result => {
                console.log(result);
                if (result.data === "success" && mId !== "") {
                    alert("사용 가능한 아이디입니다.");
                } else if (result.data === "fail" && mId !== "") {
                    alert("이미 사용중인 아이디입니다.")
                } else{
                    alert("아이디를 입력해주세요");
                }
            });
    }

    // 이메일 중복 체크
    const checkEmail = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/member/join/checkemail', `memberEmail=${mEmail}`)
            .then(email => {
                console.log(email);
                if (email.data === "success" && mEmail !== "") {
                    alert("사용 가능한 이메일입니다.");
                } else if(email.data === "fail" && mEmail !== ""){
                    alert("중복된 이메일입니다.");
                }else{
                    alert("이메일을 입력해주세요.")
                }
            });
    }


    return (
        <div className="joinWrap memberPage container">
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
                                    <button className="beigeBtn btn" onClick={checkId}>중복확인</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">비밀번호</td>
                                <td>
                                    <input type="password" name="mPw" value={mPw} onChange={handlerChangePw} placeholder="최소 8자 이상의 숫자를 사용하세요." required />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="requiredMark">비밀번호 확인</td>
                                <td>
                                    <input type="password" name="mPwCheck" value={mPwCheck} onChange={onChangePasswordChk} required />
                                    {passwordError && <div className="PwCheck" style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>} 
                                </td><td></td>
                            </tr>
                            <tr>
                                <td className="requiredMark">이메일</td>
                                <td>
                                    <input type="text" name="mEmail" value={mEmail} onChange={handlerChangeEmail} placeholder="nemo@nemo.com 형식에 맞게 입력하세요." required />
                                </td>
                                <td className="memberTableBtn">
                                    <button className="beigeBtn btn" onClick={checkEmail}>중복확인</button>
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
                                    <input type="text" name="mAddress" value={mAddress} required />
                                </td>
                                <td className="memberTableBtn">
                                    <button className="beigeBtn btn" onClick={handleOpenSearchAddress}>주소검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="accept">
                    <ul style={{ "listStyle": "none" }}>
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