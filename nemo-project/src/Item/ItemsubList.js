import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Shirt from '../img/shirt.jpg';

function ItemsubList({match}) {
    const { itemSubcategory } = match.params;

    const [ datas, setDatas ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/cate/sub/${itemSubcategory}`)
            .then(response => setDatas(response.data))
            .catch(error => console.log(error));
    }, []);
    return (
        <>
            <div className="recWeather">
                
                <div className="titleNplusBtn">
                    <h3>{itemSubcategory}</h3>
                    <Link className="btn" to="/item/write">상품등록</Link>
                </div>
                <div className="itemWrap2">
                    {
                        datas && datas.map(item => (
                         <div className="itemInfoWrap" key={item.itemNum}>
                            <div className="itemImg" style={{backgroundImage: `url(${Shirt})`}}></div>
                            <div className="itemInfo">
                            <p className="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                            <p className="itemName"><Link to={`/item/detail/${item.itemNum}`}>{item.itemName}</Link></p>
                            <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit}</span>원</p>
                            <p className="itemPeriod">대여기간<br/><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
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

export default ItemsubList;