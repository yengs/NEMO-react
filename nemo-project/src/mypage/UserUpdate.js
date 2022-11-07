import { useEffect, useState } from "react";
import axios from "axios";
// 주소 api사용 (팝업방식)
import { useDaumPostcodePopup } from 'react-daum-postcode';
// import './UserUpdate.css';
import { Link } from "react-router-dom";
import styled from "styled-components";

// 회원정보수정
function UserUpdate() {

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
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    // 주소검색창 팝업열기
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
    const handleOpenSearchAddress = () => {
        open({ onComplete: handleComplete });
    };

    const [data, setDatas] = useState([]);
    const [mNickname, setMnickname] = useState('');
    const [mPw, setMpw] = useState('');
    const [mPwCheck, setMpwCheck] = useState('');
    const [mEmail, setMemail] = useState('');
    const [mPhone, setMphone] = useState('');
    const [mAddress, setMaddress] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/mypage/userupdate')
            .then(response => {
                console.log(response);
                setDatas(response.data)
                setMnickname(response.data.mNickname);
                setMpw(response.data.mPw);
                setMpwCheck(response.data.mPwCheck);
                setMemail(response.data.mEmail);
                setMphone(response.data.mPhone);
                setMaddress(response.data.mAddress);
            })
            .catch(error => console.log(error));
    }, []);

    const handlerChangeNickname = (e) => setMnickname(e.target.value);
    const handlerChangePw = (e) => setMpw(e.target.value);
    const handlerChangePwCheck = (e) => setMpwCheck(e.target.value);
    const handlerChangeEmail = (e) => setMemail(e.target.value);
    const handlerChangePhone = (e) => setMphone(e.target.value);

    const UpdateProfile = (e) => {
        e.preventDefault();

        const memberInfo = {
            "memberNickname": mNickname,
            "memberPw": mPw,
            "memberEmail": mEmail,
            "memberPhone": mPhone,
            "memberAddress": mAddress
        }

        axios.put('http://localhost:8080/api/mypage/userupdate', memberInfo)
            .then(response => {
                if (response.status === 200) {
                    alert("수정완료");
                } else {
                    alert("수정실패");
                    return;
                }
            })
            .catch(error => {
                alert("에러");
                console.log(memberInfo);
            });
    };

    return (
        <div className="mypageInnerPage UserUpate">
            <ContainerUserUpate>
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
                                            <input type="text" name="mName" value={data.mName} readOnly />
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
                                        <td>아이디</td>
                                        <td>
                                            <input type="text" name="mId" value={data.mId} readOnly />
                                        </td>
                                        <td></td>
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
                                        <td className="updateTableBtn">
                                            <button className="beigeBtn btn">인증하기</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>핸드폰 번호</td>
                                        <td>
                                            <input type="text" name="mPhone" value={mPhone} onChange={handlerChangePhone} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr className="updateAddress">
                                        <td className="requiredMark">주소</td>
                                        <td>
                                            <input type="text" name="mAddress" value={mAddress} required />
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
            </ContainerUserUpate>
        </div>
    )
}

const ContainerUserUpate = styled.div`
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
    padding-top: 8px;
    padding-bottom: 8px;
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

  .UserUpate .btnWrap .btn {
    margin: 0;
  }

  .resignMembership {
    margin-left: 108px;
    margin-top: 8px;
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