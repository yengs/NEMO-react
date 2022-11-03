import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Shirt from '../img/shirt.jpg';

function ItemList({match}) {
    const { itemMaincategory } = match.params;

    const [ datas, setDatas ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/cate/${itemMaincategory}`)
            .then(response => setDatas(response.data))
            .catch(error => console.log(error));
    }, []);
    return (
        <>
            <div className="recWeather">
                
                <div className="titleNplusBtn">
                    <h3>{itemMaincategory}</h3>
                    <Link className="btn" to="/item/write">상품등록</Link>
                </div>
                <div className="itemWrap">
                    {
                        datas && datas.map(item => (
                         <div className="itemInfoWrap" key={item.itemNum}>
                            <div className="itemImg" style={{backgroundImage: `url(${Shirt})`}}></div>
                            <div className="itemInfo">
                            <p class="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                            <p class="itemName"><Link to={`/item/detail/${item.itemNum}`}>{item.itemName}</Link></p>
                            <p class="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit}</span>원</p>
                            <p class="itemPeriod">대여기간<br/><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
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

export default ItemList;