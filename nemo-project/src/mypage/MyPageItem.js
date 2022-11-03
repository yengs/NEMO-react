import Shirt from '../img/shirt.jpg';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import './mypageitem.css'

function MyPageItem() {


    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/mypage`)
            .then(response => setDatas(response.data))
            .catch(error => console.log(error));
    }, []);
    return (
        <>
            <div className="mypageInnerPage2">

                <div className="titleNplusBtn">
                    <h3>내 상품 목록</h3>
                    <Link className="btn" to="/item/write">상품등록</Link>
                </div>
                <div className="itemWrap3">
                    {
                        datas && datas.map(item => (
                            <div className="itemInfoWrap" key={item.itemNum}>
                                <div className="itemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                <div className="itemInfo">
                                    <p className="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                                    <p className="itemName"><Link to={`/item/detail/${item.itemNum}`}>{item.itemName}</Link></p>
                                    <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit}</span>원</p>
                                    <p className="itemPeriod">대여기간<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
                                </div>
                            </div>
                        ))
                    }
                    {
                        datas.length === 0 && (
                            <tr>
                                <td colSpan="4">일치하는 데이터가 없습니다!.</td>
                            </tr>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default MyPageItem;