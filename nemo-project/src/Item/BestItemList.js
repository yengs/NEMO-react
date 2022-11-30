import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Paging from "../pagination/Paging";

function BestItemList({ match }) {
    const { itemMaincategory } = match.params;

    const ITEM_COUNT_PER_PAGE = 12;

    const [datas, setDatas] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/item/best', { headers: { "Authorization" : `Bearer ${sessionStorage.getItem("jwtToken")}` }})
            .then(response => {
                setDatas(response.data);
                setCount(response.data.length);
                setItems(response.data.slice((page - 1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
            })
            .catch(error => console.log(error));
    }, []);

    const changePage = page => {
        setPage(page);
        setItems(datas.slice((page-1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
    };

    return (
        <>
            <div className="recWeather">

                <div className="titleNplusBtn">
                    <h3 style={{fontSize:'23px'}}>베스트 아이템</h3>
                    {/* <div>{sessionStorage.getItem("jwtToken") != null ?
                    <Link className="btn" to="/item/write">상품등록</Link>
                    :null
                    }</div> */}
                </div>
                <div className="itemWrap">
                    {
                        items && items.map(item => (
                            <div className="itemInfoWrap" key={item.itemNum}>
                                <Link to={`/item/detail/${item.itemNum}`}>
                                    <img className="itemImg" src={`../../files/${item.files}`}></img>
                                    <div className="itemInfo">
                                        <p className="itemPrice"><span className="price">{item.itemPrice}</span>원</p>
                                        <p className="itemName" id="overflow">{item.itemName}</p>
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
                <div>
                    <Paging page={page} count={count} setPage={changePage} />
                </div>
            </div>
        </>
    );
}

export default BestItemList;