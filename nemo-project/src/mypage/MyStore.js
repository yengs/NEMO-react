import Shirt from '../img/shirt.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

function MyStore() {
    return (
        <div className="mypageInnerPage">
            <div className="regiUserItemList">
                <h3 className="title">대여 가능 목록</h3>
                <div className="regiUserItemWrap">
                    <GrFormPrevious className="prev" />
                    <div className="regiUserItem" style={{ "backgroundImage": `url(${Shirt})` }}></div>
                    <div className="regiUserItem" style={{ "backgroundImage": `url(${Shirt})` }}></div>
                    <div className="regiUserItem" style={{ "backgroundImage": `url(${Shirt})` }}></div>
                    <div className="regiUserItem" style={{ "backgroundImage": `url(${Shirt})` }}></div>
                    <div className="regiUserItem" style={{ "backgroundImage": `url(${Shirt})` }}></div>
                    <GrFormNext className='back' />
                </div>
            </div>
            <div className="userReviewListAboutStoreWrap">
                <h3 className="title">상점 후기</h3>
                <table className="userReviewListAboutStore">
                    <thead>
                        <tr>
                            <th colSpan={2}>상품 정보</th>
                            <th>작성자</th>
                            <th colSpan={2}>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3} className="ReviewItemImageOrigin">
                                <div style={{ "backgroundImage": `url(${Shirt})` }}></div>
                            </td>
                            <td className='ReviewItemNameOrigin' rowSpan={3}>메종키츠네 셔츠</td>
                            <td className='ReviewWriter' rowSpan={3}>선희곤듀</td>
                            <td className='ReviewItemImg'>
                                <div style={{ "backgroundImage": `url(${Shirt})` }}></div>
                            </td>
                        </tr>
                        <tr>
                            <td className='ReviewContent'>친절하시구 옷 상태도 너무 좋았어요!<br />다음에도 또 거래하고 싶어요</td>
                        </tr>
                        <tr>
                            <td className='satisfing'>
                                <div>
                                    만족도 <span>65</span>%
                                    <div style={{ "width": "100%", "height": "13px", "backgroundColor": "rgb(150,150,150)", "borderRadius": "20px" }}></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyStore;