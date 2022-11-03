import Shirt from '../img/shirt.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import "./mybooking.css";

function MyBooking() {

    const goReviewWrite = () => {
        window.location.href = "/reivew/reviewWrite";
    }

    return (
        <div className="mypageInnerPage">
           
            <div className="userReviewListAboutStoreWrapBooking">
                <h3 className="pageTitle">빌려줬어요</h3>
                <table className="userReviewListAboutStore2">
                    <thead>
                        <tr>

                            <th>대여기간</th>
                            <th colSpan={2}>상품 정보</th>                 
                            <th>대여료</th>
                            <th>빌려간 이</th>
                            <th>대여상태</th>
                            <th>물품상태</th>
                            <th>상태수정</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className='ReviewWriter' rowSpan={3}>9/27~10/5</td>
                            <td rowSpan={2} className="ReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${Shirt})` }}></div>
                            </td>
                            <td className='ReviewItemNameOrigin' rowSpan={3}>메종키츠네 셔츠</td>
                            <td className='ReviewWriter' rowSpan={3}>20000</td>
                            <td className='ReviewWriter' rowSpan={3}>선희곤듀</td>
                            <td className='ReviewWriter' rowSpan={3}> 
                                    <select>
                                       <option value="">예약중</option>
                                       <option value="반팔">대여중</option>
                                       <option value="긴팔">기간만료</option>
                                       <option value="니트">예약취소</option>   
                                    </select>
                            </td>
                            <td className='ReviewWriter' rowSpan={3}>
                                    <select>
                                       <option value="">--</option>
                                       <option value="반팔">수거완료</option>
                                       <option value="긴팔">물품훼손</option>
                                       <option value="니트">미반납</option>   
                                    </select>
                            </td>
                            <td className='ReviewWriter' rowSpan={3}><button className="greenBtn btnBok">확인</button></td>                        
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='ReviewWriter' rowSpan={3}>10/17~10/25</td>
                            <td rowSpan={2} className="ReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${Shirt})` }}></div>
                            </td>
                            <td className='ReviewItemNameOrigin' rowSpan={3}>메종키츠네 셔츠</td>
                            <td className='ReviewWriter' rowSpan={3}>20000</td>
                            <td className='ReviewWriter' rowSpan={3}>홍길동</td>
                            <td className='ReviewWriter' rowSpan={3}> 
                                    <select>
                                       <option value="">예약중</option>
                                       <option value="반팔">대여중</option>
                                       <option value="긴팔">기간만료</option>
                                       <option value="니트">예약취소</option>   
                                    </select>
                            </td>
                            <td className='ReviewWriter' rowSpan={3}>
                                    <select>
                                       <option value="">--</option>
                                       <option value="반팔">수거완료</option>
                                       <option value="긴팔">물품훼손</option>
                                       <option value="니트">미반납</option>   
                                    </select>
                            </td>
                            <td className='ReviewWriter' rowSpan={3}><button className="greenBtn btnBok">확인</button></td>                        
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='ReviewWriter' rowSpan={3}>10/20~10/23</td>
                            <td rowSpan={2} className="ReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${Shirt})` }}></div>
                            </td>
                            <td className='ReviewItemNameOrigin' rowSpan={3}>메종키츠네 셔츠</td>
                            <td className='ReviewWriter' rowSpan={3}>15000</td>
                            <td className='ReviewWriter' rowSpan={3}>백예린</td>
                            <td className='ReviewWriter' rowSpan={3}> 예약취소</td>
                            <td className='ReviewWriter' rowSpan={3}> 예약취소</td>
                            <td className='ReviewWriter' rowSpan={3}><button className="greenBtn btnBok">확인</button></td>                        
                        </tr>
                    </tbody>
                </table>
            </div>


            <div className="userReviewListAboutStoreWrapBooking2">
                <h3 className="pageTitle">빌려왔어요</h3>
                <table className="userReviewListAboutStore2">
                    <thead>
                        <tr>

                            <th>대여기간</th>
                            <th colSpan={2}>상품 정보</th>                 
                            <th>대여료</th>
                            <th>빌려준 이</th>
                            <th>대여상태</th>
                            <th>보증금상태</th>
                            <th>예약취소</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className='ReviewWriter' rowSpan={3}>9/27~10/5</td>
                            <td rowSpan={2} className="ReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${Shirt})` }}></div>
                            </td>
                            <td className='ReviewItemNameOrigin' rowSpan={3}>메종키츠네 셔츠</td>
                            <td className='ReviewWriter' rowSpan={3}>20000</td>
                            <td className='ReviewWriter' rowSpan={3}>선희곤듀</td>
                            <td className='ReviewWriter' rowSpan={3}> <tr><td>반납완료</td></tr><td><button className="greenBtn btnBok" onClick={goReviewWrite}>후기작성</button></td></td>
                            <td className='ReviewWriter' rowSpan={3}>반환완료</td>
                            <td className='ReviewWriter' rowSpan={3}><button className="greenBtn btnBok">취소</button></td>                        
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td className='ReviewWriter' rowSpan={3}>9/27~10/5</td>
                            <td rowSpan={2} className="ReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${Shirt})` }}></div>
                            </td>
                            <td className='ReviewItemNameOrigin' rowSpan={3}>메종키츠네 셔츠</td>
                            <td className='ReviewWriter' rowSpan={3}>20000</td>
                            <td className='ReviewWriter' rowSpan={3}>선희곤듀</td>
                            <td className='ReviewWriter' rowSpan={3}> 예약중</td>
                            <td className='ReviewWriter' rowSpan={3}>결제완료</td>
                            <td className='ReviewWriter' rowSpan={3}><button className="greenBtn btnBok">취소</button></td>                        
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyBooking;