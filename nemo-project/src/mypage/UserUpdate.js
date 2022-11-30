import React, { useEffect, useState } from "react";
import axios from "axios";
// 주소 api사용 (팝업방식)
import { useDaumPostcodePopup } from 'react-daum-postcode';
// import './UserUpdate.css';
import { Link } from "react-router-dom";
import styled from "styled-components";
import MemberDelete from "./MemberDelete";


// 회원정보수정
function UserUpdate({ history }) {

    // 주소검색창 팝업열기
    const open = useDaumPostcodePopup();
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        let sigungu = data.sido + ' ' + data.sigungu;
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
        setMsigungu(sigungu);
    };

    const handleOpenSearchAddress = (e) => {
        e.preventDefault();
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
                // setMemberPwCheck(response.data.memberPwCheck);
                setMemberEmail(response.data.memberEmail);
                setMemberPhone(response.data.memberPhone);
                setMemberAddress(response.data.memberAddress);
                setMzipCode(response.data.memberZipCode);
                setMsigungu(response.data.memberSigungu);
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
            "memberZipCode": mZipCode,
            "memberSigungu": mSigungu
        }

        if ( memberNickname == '' || memberAddress == '' || memberPw == '') {
            alert("빈칸을 채워주세요")
        } else if(memberNickname !== sessionStorage.getItem('memberNickname')) {
            alert("닉네임 중복확인을 해주세요");
        } else if(memberPw.length < 8) {
            alert("비밀번호를 8이상 작성해주세요")
        } else {
            axios.put(`http://localhost:8080/api/member/update/${memberNum}`, memberInfo)
            .then(response => {
                if (response.status === 200) {
                    alert("수정완료");
                    window.location.reload();
                } else {
                    alert("수정실패");
                    return;
                }
            })
            .catch(error => {
                console.log(memberInfo);
                console.log(error)
            });
        }
    };


    //--------------------------회원탈퇴하기 모달
    const [modalOpen, setModalOpen] = useState(false);


    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };


    const handlerClickDelete = () => {
        if (memberPw == memberPwCheck && check4 === false) {
            alert("안내사항에 동의해주세요")
        } else if (memberPw !== memberPwCheck && check4 === true) {
            alert("비밀번호를 확인해주세요")
        } else if (memberPw == memberPwCheck && check4 === true) {
            axios.delete(`http://localhost:8080/api/member/delete/${memberNum}`)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        alert("탈퇴가 완료되었습니다. 더 나은 내모가 되도록 노력하겠습니다^^");
                        sessionStorage.clear();
                        window.location.href = "/";
                    } else {
                        alert("삭제에 실패했습니다.");
                        return;
                    }
                })
                .catch(error => console.log(error));
        } else {
            alert("비밀번호 확인과 안내사항 동의를 해주세요")
        }
    };

    const [check4, setCheck4] = useState(false);

    const check4Handler = () => {
        if (check4 === false) {
            setCheck4(true)
        } else {
            setCheck4(false);
        }
    };

    // 닉네임 중복 체크
    const checkNickname = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/member/join/checknickname', `memberNickname=${memberNickname}`)
            .then(nickname => {
                console.log(nickname);
                if (nickname.data === "success" && memberNickname !== "") {
                    alert("사용 가능한 닉네임입니다.");
                    sessionStorage.setItem('memberNickname', memberNickname);
                } else if (nickname.data === "fail" && memberNickname !== "") {
                    alert("이미 사용중인 닉네임입니다.")
                } else {
                    alert("닉네임을 입력해주세요");
                }
            });
    }
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
                                            <td>닉네임</td>
                                            <td>
                                                <input type="text" name="mNickname" value={memberNickname} onChange={handlerChangeNickname} />
                                            </td>
                                            <td className="updateTableBtn">
                                                <button className="beigeBtn btn" onClick={checkNickname}>중복확인</button>
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
                                            <td>비밀번호</td>
                                            <td>
                                                <input type="password" name="mPw" value={memberPw} onChange={handlerChangePw} required />
                                            </td>
                                            <td></td>
                                        </tr>
                                        {/* <tr>
                                        <td className="requiredMark">패스워드 확인</td>
                                        <td>
                                            <input type="password" name="mPwCheck" value={memberPwCheck} onChange={onChangePasswordChk} required />
                                         
                                        </td><td></td>
                                    </tr> */}
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
                                            <td>주소</td>
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
                            <React.Fragment>
                                <div className="resignMembership">
                                    <Link onClick={openModal} type="submit">회원탈퇴하기</Link>
                                </div>
                                <MemberDelete open={modalOpen} close={closeModal} header="회원탈퇴페이지">
                                    <div className="txt3"><li>
                                        비밀번호 확인을 통해 본인인증을 해주세요
                                    </li>
                                    </div>
                                    <tr>
                                        <td className="requiredMark">비밀번호</td>
                                        <td>
                                            <input className="pw" type="password" name="mPw" value={memberPw} onChange={handlerChangePw} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="requiredMark">비밀번호 확인</td>
                                        <td>
                                            <input className="pw" type="password" name="mIdCheck" value={memberPwCheck} onChange={handlerChangePwCheck} required />
                                        </td>
                                    </tr>
                                    <div className="txt">
                                        탈퇴 유의사항
                                    </div>
                                    <div className="txt2">
                                        <li>채팅, 회원정보의 데이터는 삭제됩니다.</li>
                                        <li>게시한 대여상품,대여정보, 후기 등의 게시글은 자동으로 삭제됩니다.</li>
                                        <li>회원 탈퇴 즉시 모든 회원 정보가 삭제되며, 재가입시에는 기존 아이디는 사용하실 수 있습니다.</li>
                                        <li>회원 탈퇴 후 모든 스토어 주문 정보는 5년간 분리 보관됩니다.</li>
                                        <li>회원 탈퇴 시 내모의 대여상품을 이용하실수 없습니다.</li>

                                    </div>
                                    <div className="line"></div>
                                    <label className="req">
                                        <input type="checkbox" required
                                            id="check4" checked={check4} onChange={check4Handler} />
                                        &nbsp;&nbsp;안내사항을 모두 확인하였으며, 이에 동의합니다.
                                    </label>
                                    <div className="btnWrap">
                                        <input type="button" id="delete" className="redBtn btn bon" value="탈퇴하기" onClick={handlerClickDelete} style={{ float: "right" }} />
                                    </div>
                                </MemberDelete>
                            </React.Fragment>
                            <div className="btnWrap" >
                                <input type="submit" value="완료" className="greenBtn btn" onClick={UpdateProfile} style={{ marginTop: '0' }} />
                            </div>
                    </form>
                </div>
            </div>
        </ContainerUserUpate>
    )
}

const ContainerUserUpate = styled.div`
.pw{
    width: 370px;
    height:30px;
    border: 1px solid #ddd;
    border-radius: 2px;
}
.txt{
    font-size: 20px;
    font-weight: 700;
    margin-top: 40px;
}

.txt2 {
    margin-top : 20px;
}
.txt2 li{
    line-height: 2;
    color: #7a7a7a;
}

.txt3 {
    font-size: 17px;
    font-weight: 40;
    margin-top: 20px;
    margin-bottom:20px;
}

.modal td {
    padding: 10px 0;
    text-align: left;
}

.modal td:last-child {
    padding-left: 10px;
}

.bon{
    // margin-left: 400px;
    margin-top:40px;
}

.line{
    margin-top : 20px;
    margin-bottom: 20px;
    background-color:#dfdfdf;
    height:0.5px;
}

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
    text-align: left;
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
    padding:11px 6px;
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
    margin-top:  26px;
  }

  .resignMembership a {
    text-decoration: none;
    font-size: 14px;
    color: #777;
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