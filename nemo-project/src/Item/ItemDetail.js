import axios from "axios";
import { useEffect, useState } from "react";

function ItemDetail({ match, location, history }) {
    const { itemNum } = match.params;
    
    const [ data, setData ] = useState({});
    // const [ itemName, setItemName ] = useState('');
    // const [ itemPrice, setItemPrice ] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/${itemNum}`)
        .then(response => { 
            setData(response.data);
            // setItemName(response.data.itemName);
            // setItemPrice(response.data.itemPrice);
        })
        .catch(error => { console.log(error); });
    }, []);

    // const handlerChangeName = (e) => setItemName(e.target.value);
    // const handlerChangePrice = (e) => setItemPrice(e.target.value);
    
    // const handlerClickList = () => history.push('/item');
    // const handlerClickDelete = () => {
    //     axios.delete(`http://localhost:8080/api/item/${itemNum}`)
    //     .then(response => { 
    //         console.log(response);
    //         if (response.status === 200) {
    //             alert("정상적으로 삭제되었습니다.");
    //             history.push("/item");
    //         } else {
    //             alert("삭제에 실패했습니다.");
    //             return;
    //         }
    //     })
    //     .catch(error => console.log(error));
    // };
    // const handlerClickUpdate = () => {
    //     axios.put(`http://localhost:8080/api/item/${itemNum}`, { 'itemName': itemName, 'itemPrice': itemPrice })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 alert("정상적으로 수정되었습니다.", {
    //                     onClose: () => history.push("/item")
    //                 });
                    
    //             } else {
    //                 alert("수정에 실패했습니다.");
    //                 return;
    //             }
    //         })
    //         .catch(error => console.log(error));
    // };
    

    return (
        <>
            <div className="container">
                <h2>상품 상세</h2>
                <form method="post" id="frm" name="frm">
                    <table className="board_detail">
                        <colgroup>
                            <col width="30%" />
                            <col width="70%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">상품번호</th>
                                <td>{data.itemNum}</td>
                            </tr>
                            <tr>
                                <th scope="row">업로드날짜</th>
                                <td>{data.itemDate}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">상품명</th>
                                <td>{data.itemName}</td> 
                                {/* <td><input type="text" value={itemName} onChange={handlerChangeName} /></td>                   */}
                            </tr>
                            <tr>
                                <th scope="row">가격</th>
                                <td>{data.itemPrice}</td> 
                                {/* <td><input type="text" value={itemPrice} onChange={handlerChangePrice} /></td>                   */}
                            </tr>
                            <tr>
                                <th scope="row">대분류</th>
                                <td>{data.itemMaincategory}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">소분류</th>
                                <td>{data.itemSubcategory}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">보증금</th>
                                <td>{data.itemDeposit}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">조회수</th>
                                <td>{data.itemReadcount}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">내용</th>
                                <td>{data.itemDetail}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">작성자</th>
                                <td>{data.itemWriter}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">날씨</th>
                                <td>{data.itemWeather}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">상품사진</th>
                                <td>{data.itemImage}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">상의사이즈</th>
                                <td>{data.itemTopsize}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">하의사이즈</th>
                                <td>{data.itemBottomsize}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">겉옷사이즈</th>
                                <td>{data.itemEtcsize}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">키</th>
                                <td>{data.itemHeight}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">대여기간</th>
                                <td>{data.itemRentalperiod}</td>                  
                            </tr>
                        </tbody>
                    </table>      
                </form>   
                
                {/* <input type="button" id="list"   className="btn" value="목록으로" onClick={handlerClickList} />
                <input type="button" id="edit"   className="btn" value="수정하기" onClick={handlerClickUpdate} />
                <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickDelete} />    */}
            </div>            
        </>

    );
}

export default ItemDetail;