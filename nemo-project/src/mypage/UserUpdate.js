import { useEffect, useState } from "react";
import axios from "axios";
// 주소 api사용 (팝업방식)
import { useDaumPostcodePopup } from 'react-daum-postcode';
// import './UserUpdate.css';
import { Link } from "react-router-dom";
import styled from "styled-components";

// 회원정보수정
function UserUpdate({history}) {

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

        setMemberAddress(fullAddress);
        setMzipCode(data.zonecode);
        setMsigungu(data.sigungu);
        // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    // 주소검색창 팝업열기
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
    const handleOpenSearchAddress = () => {
        open({ onComplete: handleComplete });
    };




    const memberNum = sessionStorage.getItem('memberNum');

    const [datas, setDatas] = useState({});
    const [memberNickname, setMemberNickname] = useState('');
    const [memberId, setMemberId] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberPw, setMemberPw] = useState('');
    const [memberPwCheck, setMemberPwCheck] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberPhone, setMemberPhone] = useState('');
    const [memberAddress, setMemberAddress] = useState('');
    const [mZipCode, setMzipCode] = useState('');
    const [mSigungu, setMsigungu] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:8080/api/member/info/${memberNum}`)
            .then(response => {
                console.log("업데이트페이지 멤버넘버::::" + memberNum);
                console.log(response);
                setDatas(response.data);
                setMemberNickname(response.data.memberNickname);
                setMemberName(response.data.memberName);
                setMemberId(response.data.memberId);
                setMemberPw(response.data.memberPw);
                setMemberPwCheck(response.data.memberPwCheck);
                setMemberEmail(response.data.memberEmail);
                setMemberPhone(response.data.memberPhone);
                setMemberAddress(response.data.memberAddress);
            })
            .catch(error => console.log(error));
    }, []);

    const handlerChangeNickname = (e) => setMemberNickname(e.target.value);
    const handlerChangePw = (e) => setMemberPw(e.target.value);
    const handlerChangePwCheck = (e) => setMemberPwCheck(e.target.value);
    const handlerChangePhone = (e) => setMemberPhone(e.target.value);
    const handlerChangeAddress = (e) => setMemberAddress(e.target.value);


    const UpdateProfile = (e) => {
        e.preventDefault();

        const memberInfo = {
            "memberNickname": memberNickname,
            "memberPw": memberPw,
            "memberPhone": memberPhone,
            "memberAddress": memberAddress,
            "memberZipCode" : mZipCode,
            "memberSigungu" : mSigungu
        }

        axios.put(`http://localhost:8080/api/member/update/${memberNum}`, memberInfo)
            .then(response => {
                if (response.status === 200) {
                    alert("수정완료");
                    history.push('/mypage/mybooking');
                } else {
                    alert("수정실패");
                    return;
                }
            })
            .catch(error => {
                alert("에러");
                console.log(memberInfo);
                console.log(error)
            });
    };


    return (
        <ContainerUserUpate style={{ width: 'calc(100% - 230px)', height: '100%' }}>
            <div className="mypageInnerPage UserUpate">
                <div className="UserUpate">
                    <div className="pageTitle">
                        <h2>회원정보 수정</h2>
                    </div>
                    <form>
                        <div className="inputTable">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td>이름</td>
                                        <td>
                                            <input type="text" name="mName" value={datas.memberName} readOnly disabled />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="requiredMark">닉네임</td>
                                        <td>
                                            <input type="text" name="mNickname" value={memberNickname} onChange={handlerChangeNickname} required />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>아이디</td>
                                        <td>
                                            <input type="text" name="mId" value={datas.memberId} readOnly disabled />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="requiredMark">패스워드</td>
                                        <td>
                                            <input type="password" name="mPw" value={memberPw} onChange={handlerChangePw} required />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="requiredMark">패스워드확인</td>
                                        <td>
                                            <input type="password" name="mIdCheck" value={memberPwCheck} onChange={handlerChangePwCheck} required />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>이메일</td>
                                        <td>
                                            <input type="text" name="mEmail" value={datas.memberEmail} disabled />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>핸드폰 번호</td>
                                        <td>
                                            <input type="text" name="mPhone" value={memberPhone} onChange={handlerChangePhone} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr className="updateAddress">
                                        <td className="requiredMark">주소</td>
                                        <td>
                                            <input type="text" name="mAddress" value={memberAddress} onChange={handlerChangeAddress} required />
                                        </td>
                                        <td className="updateTableBtn">
                                            <button className="beigeBtn btn" onClick={handleOpenSearchAddress}>주소검색</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="resignMembership">
                            {/* <Link to={`member/resignMembership`}>회원탈퇴하기</Link> */}
                            <Link>회원탈퇴하기</Link>
                        </div>
                        <div className="btnWrap">
                            <input type="submit" value="완료" className="greenBtn btn" onClick={UpdateProfile} />
                            {/* <input type="button" value="취소" className="grayBtn btn"/> */}
                        </div>
                    </form>
                </div>
            </div>
        </ContainerUserUpate>
    )
}

const ContainerUserUpate = styled.div`
.mypageInnerPage {
    width: 100%;
    height: 100%;
}

  .UserUpate .pageTitle h2 {
    font-size: 2rem;
    font-weight: 300;
    text-align: center;
  }
  
  .UserUpate .inputTable {
    width: 88%;
    margin: 0 auto;
  }
  
  .UserUpate .inputTable table {
    width: 100%;
    border-spacing: 0;
  }
  
  .UserUpate .inputTable table tr>td {
    padding-top: 11px;
    padding-bottom: 11px;
    border-top: 1px solid #ddd;
  }
  
  .UserUpate .inputTable table tr:first-child>td {
    border: none;
  }
  
  .UserUpate .inputTable table tr>td:first-child {
    width: 20%;
    padding-left: 50px;
    font-size: 14px;
    color: #333;
  }
  
  .UserUpate .inputTable table tr>td:nth-child(2) {
    width: 58%
  }
  
  .UserUpate .inputTable table tr>td>input {
    border: 1px solid #ddd;
    width: 95%;
    padding: 8px 6px;
    border-radius: 3px;
  }
  
  .UserUpate .inputTable table tr>.memberTableBtn>button {
    padding: 6px 15px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .UserUpate .inputTable table .memberAddress select {
    border: 1px solid #ddd;
    padding: 8px 6px;
    border-radius: 3px;
    margin-right: 10px;
  }
  
  .UserUpate .btnWrap {
    width: 100%;
    text-align: center;
  }

  .resignMembership {
    margin-left: 108px;
    margin-top: 25px;
  }

  .resignMembership a {
    text-decoration: none;
    font-size: 14px;
  }

  .UserUpate .btn.beigeBtn {
    padding: 7px 20px;
    border-radius: 5px;
  }

  table td {
    border: none !important;
  }
  
`

export default UserUpdate;