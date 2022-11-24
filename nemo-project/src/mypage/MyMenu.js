import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CleanG from '../member/CleanG';
import Modal from './ImgModal';
import styled from "styled-components";

function MyMenu({ history , location}) {

    const memberNum = sessionStorage.getItem('memberNum');
    const itemWriter = sessionStorage.getItem('memberId');
    const reviewId = sessionStorage.getItem('memberId');

    const memberNickname = sessionStorage.getItem('memberNickname');

    const [memberImg, setMemberImg] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const handleImgError = (e) => {
        e.target.src = '../../../noimage/no-profile.PNG';
    }

    //--------------프사 GET--------------

    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/memberimg/${memberNum}`)
        .then(response => { 
            setData(response.data);
            setMemberImg(response.data.memberImg);
        })
        .catch(error => { console.log(error); });
    }, []);

    // -----------------프사수정-----------------
    
    const handlerChangefiles =(e) => {
        setMemberImg(e.target.files[0]);
        encodeFileToBase64(e.target.files[0]);
    }

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImageSrc(reader.result);
            resolve();
          };
        });
      };

      const handlerClickUpdate = () => {

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({'memberId': reviewId})], {
            type: "application/json"
        }));
        // formData.append("files", new Blob(files, { type: "image/*" }));
        formData.append("memberImg", memberImg);


        axios.put(`http://localhost:8080/api/memberimg/update/${memberNum}`, 
            formData,
            { headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
                if (response.status === 200) {
                    alert("정상적으로 수정되었습니다.");
                    setModalOpen(false);
                    window.location.reload();
                } else {
                    alert("수정에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    };

    const [reviewSatisfaction, setReviewSatisfaction] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/clean/${reviewId}`)
            .then(response => {
                console.log(response);
                setReviewSatisfaction(response.data);
            })
            .catch(error => console.log(error));
    }, []);


    // ---프사 모달---
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    // ---프사 모달 end---

    const [showCom, setShowCom] = useState(false);
    const showComment = () => {
        setShowCom(true)
    }

    const hideComment = () => {
        setShowCom(false)
    }

    return (
      

        <div className="myMenuWrap">
            <AppStyle >
            <img className="memberImg" src={`../../memberImg/${data.memberImg}`}  onMouseEnter={showComment} onError={handleImgError}></img>
            <div className={"commentBox" + (showCom ? ' showCom' : '')} onMouseEnter={showComment} onMouseOut={hideComment} onClick={openModal}>
                                            이미지를 변경하시려면<br/>클릭해주세요.
                                        </div>
            </AppStyle>

            {/* ---프사모달--- */}
            <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="사진 변경">
                <div className="ChoiseFile">
                <div className="myDetailImage">
                    {imageSrc == '' ?
                        <img id="imgsrccc" className="memberImg" src={`../../memberImg/${data.memberImg}`} onError={handleImgError}/>
                        : <div className="myDetailImage">
                        {imageSrc && <img src={imageSrc} alt="preview-img" className="memberImg22" id="imgsrccc" />} </div>
                    }
                </div>
                
                <div className="imageChoose">
                    <input className="form-control-image" type = "file" name="file" multiple onChange={handlerChangefiles}></input>
                </div>
            </div>

            <input type="button" id="edit"  className="myimgupdate" value="수정하기" onClick={handlerClickUpdate} />
            
                </Modal>
            </React.Fragment>
            {/* ---프사모달 end--- */}

            
            <div className='myMenuUserName'>{memberNickname}</div>
            <div className='cleanG'>
                {reviewSatisfaction == 0 ?
                    <div>
                        <div> 클린지수 50 % </div>
                        <img className="myMenu-img" src="/clean/fourtyp.png" alt="50" />
                    </div>
                    :
                    <div>
                        <div className='cleanDefault'> 클린지수 {reviewSatisfaction}% </div>
                        <div> <CleanG /> </div>
                    </div>
                }
            </div>
            <div className="menu">
                <ul>
                    {/* <li>나의 계정 설정</li> */}
                    <li><Link to="/mypage/mybooking">내 대여이력</Link></li>
                    <li><Link to={`/mypage/mypageitem/${itemWriter}`}>등록상품 조회</Link></li>
                    <li><Link to="/mypage/review">후기 조회</Link></li>
                    <li><Link to="/mypage/userupdate">회원정보 수정</Link></li>
                </ul>
            </div>
        </div>
        
    );
}



const AppStyle = styled.div`
.commentBox {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: rgba(30,30,30,0.4);
    position: absolute;
    z-index:1;
    visibility: hidden;
    color: #fff;
    text-align: center;
    font-size: 12px;
    padding-top: 33px;
    line-height: 25px;
    margin-left: 24px;
    margin-top: -114px;
    cursor: pointer;
}

.showCom {
visibility: visible;
}

`


export default MyMenu;

