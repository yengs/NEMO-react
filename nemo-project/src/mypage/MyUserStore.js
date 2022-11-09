import Shirt from '../img/shirt.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

import ItemSlider from "./ItemSlider.js";

import styled from "styled-components";

function MyStore() {
    return (
        <MyUserStoreContainer style={{ width: 'calc(100% - 230px)', height: '100%' }}>
            <div className="mypageInnerPage myUserStoreInnerPage">
                <div className="regiUserItemList">
                    <h3 className="pageTitle">대여 가능 목록</h3>
                    <ItemSlider />
                </div>
                <div className="myStoreReview">
                    <div className="titleNplusBtn">
                        <h3>내 작성 후기</h3>
                        <button className="plusBtn">+ 더보기</button>
                    </div>
                </div>
                <div className='tableWrap'>
                    <table className="yourReviewListAboutStore">
                        <thead>
                            <th colSpan={2}>상품 정보</th>
                            <th>대여료</th>
                            <th>내용</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="rReviewItemImageOrigin">
                                    <div style={{ "backgroundImage": `url(${Shirt})` }}></div>
                                </td>
                                <td className='rReviewItemNameOrigin'>메종키츠네 셔츠</td>
                                <td className='rReviewWriter'>선희곤듀</td>
                                <td>
                                    <div className='rReviewItemImg' style={{ "backgroundImage": `url(${Shirt})` }}></div>
                                    <p className='rReviewContent'>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</p>
                                    <div className='rsatisfing'>
                                        만족도 <span>65</span>%
                                        <div style={{ "width": "100%", "height": "13px", "backgroundColor": "rgb(150,150,150)", "borderRadius": "20px" }}></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </MyUserStoreContainer>
    );
}

const MyUserStoreContainer = styled.div`

.myUserStoreInnerPage {
    width: 100%;
    height: 100%;
}

.myStoreReview {
    margin-top: 35px;
}

.yourReviewListAboutStore {
    border-spacing: 0;
    border-top: 1px solid #bbb;
    border-bottom: 2px solid #ccc;
}

.yourReviewListAboutStore th {
    // border-top: 1px solid #bbb;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    height: 10px;
    width: 300px;
}

.yourReviewListAboutStore tr td {
    border-bottom: 1px solid #ddd;
}

.yourReviewListAboutStore tbody:last-child td  {
    border-bottom: none;
}

.rReviewItemImageOrigin {
    width: 10%;
}

.rReviewItemImageOrigin div {
    width: 100%;
    height: 120px;
    /* border: 1px solid #000; */
    background-size: cover;
    background-position: center;
}

.rReviewItemNameOrigin {
    width: 15%;
    text-align: center;
}

.rReviewWriter {
    width: 20%;
    text-align: center;
}

.rReviewItemImg, .rReviewContent, .rsatisfing {
    width: 45%;
}

.rReviewItemImg {
    width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
}

.rReviewContent {
    font-size: 13px !important;
    padding-bottom: 0px !important;
    margin: 10px 0;
    width: 100%;;
}

.rsatisfing {
    width: 140px;
    font-size: 12px;
}
`

export default MyStore;