import axios from "axios";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import "./MyPageItemDetail.css";

function MyPageItemDetail({ match, location, history }) {
    const { itemNum } = match.params;
    
    const [ data, setData ] = useState({});
    const [ itemName, setItemName ] = useState('');
    const [ itemPrice, setItemPrice ] = useState('');
    const [ itemDetail, setItemDetail ] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/${itemNum}`)
        .then(response => { 
            setData(response.data);
            setItemName(response.data.itemName);
            setItemPrice(response.data.itemPrice);
            setItemDetail(response.data.itemDetail);
        })
        .catch(error => { console.log(error); });
    }, []);

    const handlerChangeName = (e) => setItemName(e.target.value);
    const handlerChangePrice = (e) => setItemPrice(e.target.value);
    const handlerChangeDetail = (e) => setItemDetail(e.target.value);
    
    const handlerClickList = () => history.goBack();
    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/item/${itemNum}`)
        .then(response => { 
            console.log(response);
            if (response.status === 200) {
                alert("정상적으로 삭제되었습니다.");
                history.push("/mypage");
            } else {
                alert("삭제에 실패했습니다.");
                return;
            }
        })
        .catch(error => console.log(error));
    };
    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/api/item/${itemNum}`, { 'itemName': itemName, 'itemPrice': itemPrice, 'itemDetail': itemDetail })
            .then(response => {
                if (response.status === 200) {
                    alert("정상적으로 수정되었습니다.", {
                        onClose: () => history.push("/mypage")
                    });
                    
                } else {
                    alert("수정에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    };
    

    return (
        <>
            <div className="myDetailContainer">
                <h2>상품 상세</h2>
                <div className="clickList">
                    <a onClick={handlerClickList}>목록으로</a>
                    <p>👀 {data.itemReadcount} 📅 {data.itemDate}</p>
                </div>
                <br></br>
                <form method="post" id="frm" name="frm">
                    <table className="my_board_detail">
                        <colgroup>
                            <col width="40%" />
                            <col width="60%" />
                        </colgroup>
                        <tbody>
                            {/* <tr>
                                <th scope="row">상품번호</th>
                                <td>{data.itemNum}</td>
                            </tr>
                            <tr className="writeDate">
                                <th scope="row">작성일</th>
                                <td>{data.itemDate}</td>               
                            </tr>  */}  
                            <tr>
                                <th scope="row">상품명</th>
                                {/* <td>{data.itemName}</td>  */}
                                <td><input type="text" value={itemName} onChange={handlerChangeName} /></td>                  
                            </tr>
                            <tr>
                                <th scope="row">가격</th>
                                {/* <td>{data.itemPrice}</td>  */}
                                <td><input type="text" value={itemPrice} onChange={handlerChangePrice} /></td>                  
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
                            {/* <tr>
                                <th scope="row">조회수</th>
                                <td>{data.itemReadcount}</td>                  
                            </tr> */}
                            <tr>
                                <th scope="row">내용</th>
                                <td><input type="text" value={itemDetail} onChange={handlerChangeDetail} /></td>
                                {/* <td>{data.itemDetail}</td>                   */}
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
                                <th scope="row">사이즈</th>
                                
                                {
                                (function() {
                                    if( data.itemMaincategory ==="상의"){
                                   return  <td>{data.itemTopsize}</td>
                                   }
                                   else if( data.itemMaincategory ==="하의"){
                                   return  <td>{data.itemBottomsize}</td>  
                                   }
                                  else {return  <td>{data.itemEtcsize}</td>  }
                                })()
                            }                      
                            </tr>
                            
                            <tr>
                                <th scope="row">대여기간</th>
                                <td>{data.itemRentalstart} ~ {data.itemRentalend}</td>                  
                            </tr>
                          
                        </tbody>
                    </table>      
                </form>
                <div className="buttonDiv">   
                    <input type="button" id="goList" className="grayBtn" value="목록으로" onClick={handlerClickList} />
                </div>
            </div>         
        </>

    );
}

export default MyPageItemDetail;