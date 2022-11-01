import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ItemList.css";

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
            <div className="ListContainer">
            <h2>상품 목록</h2>
                <table className="board_list">
                <colgroup>
                    <col width="5%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">일련번호</th>
                        <th scope="col">상품명</th>
                        <th scope="col">상품사진</th>
                        <th scope="col">가격</th>
                        <th scope="col">대여기간</th>
                        <th scope="col">작성자</th>
                        <th scope="col">분류</th>

       
                    </tr>   

                </thead>
                <tbody>
                    {
                        datas && datas.map(item => (
                            <tr key={item.itemNum}>
                                <td>{item.itemNum}</td>
                                <td className="title">
                                <Link to={`/item/detail/${item.itemNum}`}>{item.itemName}</Link>
                                </td>
                                <td>{item.itemImage}</td>
                                <td>{item.itemPrice}</td>
                                <td>{item.itemRentalstart} ~ {item.itemRentalend}</td>
                                <td>{item.itemWriter}</td>
                                
                                <td>{item.itemMaincategory}</td>
                            </tr>
                        ))
                    }
                    {
                        datas.length === 0 && (
                            <tr>
                                <td colSpan="4">일치하는 데이터가 없습니다!</td>
                            </tr>
                        )
                    }
                </tbody>
                </table>

                <br/>
                <div className="ListbtnWrap">
                <Link className="greenBtn btn" to="/item/write">상품등록</Link>
                </div>
            </div>
        </>
    );
}

export default ItemList;