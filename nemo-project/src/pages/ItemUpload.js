import axios from "axios";
import { useState } from "react";

function ItemUpload({ history }) {
    const [iName, setiName] = useState('');
    const [iPrice, setiPrice] = useState('');
    
    const handlerChangeiName = (e) => setiName(e.target.value);
    const handlerChangeiPrice = (e) => setiPrice(e.target.value);
    const handlerClickSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/item', { "itemName": iName, "itemPrice": iPrice, "iName": iName, "iPrice": iPrice})
        .then(response => {
            if (response.status === 200) {
                alert("정상적으로 등록되었습니다.");
                history.push("/item");
            } else {
                alert("등록에 실패했습니다.");
                return;
            }
        })
        .catch(error => console.log(error));
    };
    return (
        <>
            <div className="container">
                <h2>상품 등록</h2>
                <form id="frm" name="frm">
                    <table className="board_detail">
                        <tr>
                            <td>상품명</td>
                            <td><input type="text" id="iName" name="iName" value={iName} onChange={handlerChangeiName} /></td>
                        </tr>
                        <tr>
                            <td>가격</td>
                            <td><input type="text" id="iPrice" name="iPrice" value={iPrice} onChange={handlerChangeiPrice} /></td>
                        </tr>
                        
                    </table>		
                    <input type="submit" id="submit" value="저장" className="btn" onClick={handlerClickSubmit}/>
                </form>		
            </div>
        </>
    );
}

export default ItemUpload;