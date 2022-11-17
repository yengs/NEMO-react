import { useCallback, useEffect, useState } from "react";
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
        } alert("비밀번호를 올바르게 작성했는지 확인해주세요.");

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

    // 체크박스 전체선택
    const [checkAll, setCheckAll] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);

    const checkAllHandler = () => {
        if(checkAll === false){
            setCheckAll(true);
            setCheck1(true);
            setCheck2(true);
            setCheck3(true);
            setCheck4(true);
            setCheck5(true);
        }else{
            setCheckAll(false);
            setCheck1(false);
            setCheck2(false);
            setCheck3(false);
            setCheck4(false);
            setCheck5(false);
        }
    };

    const check1Handler = () => {
        if(check1 === false){
            setCheck1(true)
        }else {
            setCheck1(false);
        }
    };

    const check2Handler = () => {
        if(check2 === false){
            setCheck2(true)
        }else {
            setCheck2(false);
        }
    };

    const check3Handler = () => {
        if(check3 === false){
            setCheck3(true)
        }else {
            setCheck3(false);
        }
    };

    const check4Handler = () => {
        if(check4 === false){
            setCheck4(true)
        }else {
            setCheck4(false);
        }
    };

    const check5Handler = () => {
        if(check5 === false){
            setCheck5(true)
        }else {
            setCheck5(false);
        }
    };

    useEffect(() => {
        if(checkAll === true && check1 === true && check2 === true && check3 === true && check4 === true && check5 === true) {
            setCheckAll(true)
        }else {
            setCheckAll(false)
        }
    }, [checkAll, check1, check2, check3, check4, check5])


    // Caps Lock 감지
    const [capsLock, setCapsLock] = useState(false);

    const checkCapsLock = (e) => {
        let capsLock = e.getModifierState("CapsLock");
        setCapsLock(capsLock);
    }


    // 아이디 한글 입력 불가 처리


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


// 이메일 관련 --------------------------------
    const [code, setCode] = useState(0);
    const [userInputCode, setUserInputCode] = useState(0);
    const handlerChangeUserInputCode = (e) => setUserInputCode(Number(e.target.value));


    // 이메일 중복 체크 + 이메일 발송
    const checkEmail = (e) => {

        axios.post('http://localhost:8080/api/member/join/checkemail', `memberEmail=${mEmail}`)
            .then(email => {
                console.log(email);
                if (email.data === "success" && mEmail !== "") {
                    alert("사용 가능한 이메일입니다. 이메일 코드 발송");
                    axios.get(`http://localhost:8080/api/mail`, {
                        params: {
                            memberEmail: mEmail
                        }
                    }) .then(response2 => {
                        console.log(response2);
                        alert(response2.data);
                        setCode(response2.data);
                    })
                    .catch(function () {
                        console.log('실패함')
                    })
                } else if(email.data === "fail" && mEmail !== ""){
                    alert("중복된 이메일입니다.");
                }else{
                    alert("이메일을 입력해주세요.")
                }
            });
    }

     //이메일 코드 일치확인
     const clickCode = () => {
        if (String(userInputCode).length !== 5) {
            return alert('5자리의 숫자코드를 입력해주세요.');
        } else if (code !== userInputCode) {
            return alert('숫자코드가 일치하지 않습니다.');
        } else if (code === userInputCode) {
            return alert('숫자코드가 일치합니다');
        }
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
                                    <input type="text" name="mId" value={mId} onKeyDown={(e) => checkCapsLock(e)} onChange={handlerChangeId} required />
                                    {<div className={capsLock ? "caps-lock caps-lock-on" : "caps-lock"}>
                                    {capsLock ? "Caps Lock On" : "Caps Lock Off"}</div>}
                                </td>
                                <td className="memberTableBtn">
                                    <button className="beigeBtn btn" onClick={checkId}>중복확인</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="requiredMark">비밀번호</td>
                                <td>
                                    <input type="password" name="mPw" value={mPw} onKeyDown={(e) => checkCapsLock(e)} onChange={handlerChangePw} placeholder="최소 8자 이상의 숫자를 사용하세요." required />
                                    {<div className={capsLock ? "caps-lock caps-lock-on" : "caps-lock"}>
                                    {capsLock ? "Caps Lock On" : "Caps Lock Off"}</div>}
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
                                    <button className="greenBtn btn" onClick={checkEmail}>인증하기</button>
                                </td>
                            </tr>
                            <tr>
                                        <td className="requiredMark">인증코드</td>
                                        <td>
                                            <input type="number" name="Code" value={userInputCode} onChange={handlerChangeUserInputCode} />

                                        </td>
                                        <td className="memberTableBtn">
                                            <button className="beigeBtn btn" onClick={clickCode}>코드확인</button>
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
                                <input type="checkbox"
                                    id="checkAll" checked={checkAll} onChange={checkAllHandler}
                                />
                                &nbsp;&nbsp;전체동의
                                <span className="wholeCheckInfo">전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.<br /> 선택항목에 대한 동의를 거부하는 경우에도 회원가입 서비스는 이용 가능합니다.</span>
                            </label>
                        </li>
                        <li>
                            <label className="req">
                                <input type="checkbox" required
                                    id="check1"
                                    checked={check1} onChange={check1Handler}
                                />
                                &nbsp;&nbsp;만 14세 이상입니다. (필수)
                            </label>
                        </li>
                        <li>
                            <label className="req">
                                <input type="checkbox" required
                                    id="check2"
                                    checked={check2} onChange={check2Handler}
                                />
                                &nbsp;&nbsp;이용약관 동의 (필수)
                            </label>
                        </li>
                        <li>
                            <label className="req">
                                <input type="checkbox" required
                                    id="check3"
                                    checked={check3} onChange={check3Handler}
                                />
                                &nbsp;&nbsp;개인정보 수집 및 이용에 대한 동의 (필수)
                            </label>
                        </li>
                        <li>
                            <label className="req">
                                <input type="checkbox" required
                                    id="check4"
                                    checked={check4} onChange={check4Handler}
                                />
                                &nbsp;&nbsp;개인정보 제3자 제공에 대한 동의 (필수)
                            </label>
                        </li>
                        <li>
                            <label className="selective">
                                <input type="checkbox" required
                                    id="check5"
                                    checked={check5} onChange={check5Handler}
                                />
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