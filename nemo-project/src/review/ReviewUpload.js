import ReviewAddImg from '../img/review-add-img.png'

import './reviewUpload.css'

export default function UserDec() {
    return (
        <div className="reviewUpload">
            <div className='pageTitle'>
                <h3>후기 작성</h3>
            </div>
            <div>
                <h4>사진첨부</h4>
                <div className='decImage' style={{ "backgroundImage": `url(${ReviewAddImg})` }}></div>
            </div>
            <div className='decContent'>
                <textarea></textarea>
            </div>
            <div className='satisfyingReview'>
                <span>상품의 만족도는 어떠셨나요?</span>
                <input type="number" max={100} min={0} step={1}/>
            </div>
            <div className='btnWrap'>
                <input type="submit" className='greenBtn btn' value="등록" />
                <input type="button" className='grayBtn btn' value="취소" />
            </div>
        </div>
    );
}