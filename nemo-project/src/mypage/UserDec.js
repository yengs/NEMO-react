import ReviewAddImg from '../img/review-add-img.png'

import './userdec.css'

export default function UserDec() {
    return (
        <div className="decPopup">
            <h3 className="pageTitle">신고하기</h3>
            <div>
                <h4>사진첨부</h4>
                <div className='decImage' style={{ "backgroundImage": `url(${ReviewAddImg})` }}></div>
            </div>
            <div className='decSelect'>
                <h4>신고 이유</h4>
                <select>
                    <option>광고(상점 및 타사이트 홍보, 상품도배)</option>
                    <option>거래 금지 품목</option>
                    <option>전문 업자 의심(덤핑 및 프리미엄 판매)</option>
                    <option>사기 행위</option>
                    <option>비방 및 언어 폭력</option>
                </select>
            </div>
            <div className='decContent'>
                <h4>상세내용</h4>
                <textarea></textarea>
            </div>
        </div>
    );
}