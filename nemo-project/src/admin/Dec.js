import Shirt from '../img/shirt.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import "./Dec.css";
import { Link } from 'react-router-dom';

function Dec() {
    return (
        <div className="adminInnerPage">
            <div className="userReviewListAboutStoreWrapAdmin">
                <h3 className="pageTitle">신고내역</h3>
                <table className="userReviewListAboutStore2">
                    <thead>
                        <tr>

                            <th>신고 번호</th>
                            <th >신고대상</th>                 
                            <th >신고사유</th>
                            <th>작성자</th>
                            <th></th>
                            <th colSpan={2}>신고상태</th>
                            {/* <th>예약취소</th> */}
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className='Dec' rowSpan={3}>1</td>
                        <td className='Dec' rowSpan={3}>선희곤듀</td>
                        <td className='Dec' rowSpan={3}>비방 및 언어폭력</td>
                            <td className='Dec' rowSpan={3}>예린</td>
                            <td className='Dec' rowSpan={3}><Link >상세보기</Link></td>
                            <td className='Dec' rowSpan={3}><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec' rowSpan={3}>2</td>
                        <td className='Dec' rowSpan={3}>이초롱</td>
                        <td className='Dec' rowSpan={3}>광고(상점 및 타사이트 홍보)</td>
                            <td className='Dec' rowSpan={3}>임수진</td>
                            <td className='Dec' rowSpan={3}><Link>상세보기</Link></td>
                            <td className='Dec' rowSpan={3}><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                        
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec' rowSpan={3}>3</td>
                        <td className='Dec' rowSpan={3}>최나연</td>
                        <td className='Dec' rowSpan={3}>거래 금지 품목</td>
                            <td className='Dec' rowSpan={3}>최은우</td>
                            <td className='Dec' rowSpan={3}><Link >상세보기</Link></td>
                            <td className='Dec' rowSpan={3}><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec' rowSpan={3}>4</td>
                        <td className='Dec' rowSpan={3}>김지희</td>
                        <td className='Dec' rowSpan={3}>전문업자 의심(덤핑 및 프리미엄 판매)</td>
                            <td className='Dec' rowSpan={3}>이아름</td>
                            <td className='Dec' rowSpan={3}><Link >상세보기</Link></td>
                            <td className='Dec' rowSpan={3}><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec' rowSpan={3}>5</td>
                        <td className='Dec' rowSpan={3}>김현규</td>
                        <td className='Dec' rowSpan={3}>비방 및 언어 폭력</td>
                            <td className='Dec' rowSpan={3}>이해은</td>
                            <td className='Dec' rowSpan={3}><Link >상세보기</Link></td>
                            <td className='Dec' rowSpan={3}><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec' rowSpan={3}>6</td>
                        <td className='Dec' rowSpan={3}>박은비</td>
                        <td className='Dec' rowSpan={3}>비방 및 언어폭력</td>
                            <td className='Dec' rowSpan={3}>유주혜</td>
                            <td className='Dec' rowSpan={3}><Link >상세보기</Link></td>
                            <td className='Dec' rowSpan={3}><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec' rowSpan={3}>7</td>
                        <td className='Dec' rowSpan={3}>김상진</td>
                        <td className='Dec' rowSpan={3}>비방 및 언어폭력</td>
                            <td className='Dec' rowSpan={3}>송영미</td>
                            <td className='Dec' rowSpan={3}><Link >상세보기</Link></td>
                            <td className='Dec' rowSpan={3}><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dec;