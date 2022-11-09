import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ItemList({ match }) {
    const { itemMaincategory } = match.params;

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/cate/${itemMaincategory}`, { headers: { "Authorization" : `Bearer ${sessionStorage.getItem("jwtToken")}` }})
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
                                <Link to={`/item/detail/${item.itemNum}`}>
                                    <img className="itemImg" src={`../../files/${item.files}`}></img>
                                    <div className="itemInfo">
                                        <p className="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                                        <p className="itemName">{item.itemName}</p>
                                        <p className="itemDeposit"><span className="depositTitle">보증금</span><span className="deposit">{item.itemDeposit}</span>원</p>
                                        <p className="itemPeriod">대여기간<br /><span className="period">{item.itemRentalstart} ~ {item.itemRentalend}</span></p>
                                    </div>
                                </Link>
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