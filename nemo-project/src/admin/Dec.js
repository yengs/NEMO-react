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

                            <th style={{width:"9%"}}>신고 번호</th>
                            <th style={{width:"12%"}}>신고대상</th>                 
                            <th style={{width:"30%"}}>신고사유</th>
                            <th style={{width:"12%"}}>작성자</th>
                            <th></th>
                            <th>신고상태</th>
                            {/* <th>예약취소</th> */}
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className='Dec'>1</td>
                        <td className='Dec'>선희곤듀</td>
                        <td className='Dec'>비방 및 언어폭력</td>
                            <td className='Dec'>예린</td>
                            <td className='Dec'><Link >상세보기</Link></td>
                            <td className='Dec'><tr><td>
                                <button className="RedBtn btnBok">접수</button></td>
                                <td><button className="grayBtn btnBok">취소</button></td></tr></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec'>2</td>
                        <td className='Dec'>이초롱</td>
                        <td className='Dec'>광고(상점 및 타사이트 홍보)</td>
                            <td className='Dec'>임수진</td>
                            <td className='Dec'><Link>상세보기</Link></td>
                            <td className='Dec'><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                        
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec'  >3</td>
                        <td className='Dec'  >최나연</td>
                        <td className='Dec'  >거래 금지 품목</td>
                            <td className='Dec'  >최은우</td>
                            <td className='Dec'  ><Link >상세보기</Link></td>
                            <td className='Dec'  ><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec'  >4</td>
                        <td className='Dec'  >김지희</td>
                        <td className='Dec'  >전문업자 의심(덤핑 및 프리미엄 판매)</td>
                            <td className='Dec'  >이아름</td>
                            <td className='Dec'  ><Link >상세보기</Link></td>
                            <td className='Dec'  ><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec'  >5</td>
                        <td className='Dec'  >김현규</td>
                        <td className='Dec'  >비방 및 언어 폭력</td>
                            <td className='Dec'  >이해은</td>
                            <td className='Dec'  ><Link >상세보기</Link></td>
                            <td className='Dec'  ><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec'  >6</td>
                        <td className='Dec'  >박은비</td>
                        <td className='Dec'  >비방 및 언어폭력</td>
                            <td className='Dec'  >유주혜</td>
                            <td className='Dec'  ><Link >상세보기</Link></td>
                            <td className='Dec'  ><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='Dec'  >7</td>
                        <td className='Dec'  >김상진</td>
                        <td className='Dec'  >비방 및 언어폭력</td>
                            <td className='Dec'  >송영미</td>
                            <td className='Dec'  ><Link >상세보기</Link></td>
                            <td className='Dec'  ><tr><td>
                                <button className="RedBtn btnBok">접수</button></td><td><button className="grayBtn btnBok">취소</button></td></tr></td>                   
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dec;