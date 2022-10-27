import axios from "axios";
import { useState } from "react";

function ItemUpload({ history }) {
    const [iName, setiName] = useState('');
    const [iPrice, setiPrice] = useState('');
    const [itemMaincategory, setitemMaincategory] = useState('');
    const [itemSubcategory, setitemSubcategory] = useState('');
    const [itemDeposit, setitemDeposit] = useState('');
    const [itemDetail, setiitemDetail] = useState('');
    const [itemWeather, setitemWeather] = useState('');
    const [itemTopsize, setitemTopsize] = useState('');
    const [itemBottomsize, setitemBottomsize] = useState('');
    const [itemEtcsize, setitemEtcsize] = useState('');
    const [itemHeight, setitemHeight] = useState('');
        // const [itemRentalperiod, setitemRentalperiod] = useState('');

    
    const handlerChangeiName = (e) => setiName(e.target.value);
    const handlerChangeiPrice = (e) => setiPrice(e.target.value);
    const handlerChangeitemMaincategory =(e) => setitemMaincategory(e.target.value);
    const handlerChangeitemSubcategory =(e) => setitemSubcategory(e.target.value);
    const handlerChangeitemDeposit=(e) => setitemDeposit (e.target.value);
    const handlerChangeitemDetail=(e) =>  setiitemDetail(e.target.value);
    const handlerChangeitemWeather=(e) => setitemWeather(e.target.value);
    const handlerChangeitemTopsize=(e) => setitemTopsize(e.target.value);
    const handlerChangeitemBottomsize=(e) => setitemBottomsize(e.target.value);
    const handlerChangeitemEtcsize=(e) => setitemEtcsize(e.target.value);
    const handlerChangeitemHeight=(e) => setitemHeight(e.target.value);
    // const handlerChangeitemRentalperiod=(e) => setitemRentalperiod(e.target.value);


    

    // const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files) {
    //       setFiles(event.target.files[0])
    //     }

    const handlerClickSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/item', { "itemName": iName, "itemPrice": iPrice, "iName": iName, "iPrice": iPrice,"itemMaincategory":itemMaincategory,"itemSubcategory":itemSubcategory,"itemDeposit":itemDeposit,
                                                        "itemDetail":itemDetail,"itemWeather":itemWeather,"itemTopsize":itemTopsize,"itemBottomsize":itemBottomsize,
                                                        "itemEtcsize":itemEtcsize,"itemHeight":itemHeight})
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
                <form id="frm" name="frm" method="post" enctype="multipart/form-dat">

                    <table className="board_detail">
                        <tr>
                            <td>상품명</td>
                            <td><input type="text" id="iName" name="iName" value={iName} onChange={handlerChangeiName} /></td>
                        </tr>
                        <tr>
                            <td>가격</td>
                            <td><input type="text" id="iPrice" name="iPrice" value={iPrice} onChange={handlerChangeiPrice} /></td>
                        </tr>

                        <tr>
                            <td>상품 대분류</td>
                            <td><input type="text" id="itemMaincategory" name="itemMaincategory" value={itemMaincategory} onChange={handlerChangeitemMaincategory} /></td>
                        </tr>
                        <tr>
                            <td>상품 소분류</td>
                            <td><input type="text" id="itemSubcategory" name="itemSubcategory" value={itemSubcategory} onChange={handlerChangeitemSubcategory} /></td>
                        </tr>
                        <tr>
                            <td>보증금</td>
                            <td><input type="text" id="itemDeposit" name="itemDeposit" value={itemDeposit} onChange={handlerChangeitemDeposit} /></td>
                        </tr>

                        <tr>
                            <td>상품설명</td>
                            <td><input type="text" id="itemDetail" name="itemDetail" value={itemDetail} onChange={handlerChangeitemDetail} /></td>
                        </tr>  <tr>
                            <td>계절</td>
                            <td><input type="text" id="itemWeather" name="itemWeather" value={itemWeather} onChange={handlerChangeitemWeather} /></td>
                        </tr>
                        <tr>
                            <td>이미지</td>
                            <td> <input type = "file" name="file" /></td>
                     
                        </tr>
                        <tr>
                            <td>상의 사이즈</td>
                            <td><input type="text" id="itemTopsize" name="itemTopsize" value={itemTopsize} onChange={handlerChangeitemTopsize} /></td>
                        </tr>
                        <tr>
                            <td>하의사이즈</td>
                            <td><input type="text" id="itemBottomsize" name="itemBottomsize" value={itemBottomsize} onChange={handlerChangeitemBottomsize} /></td>
                        </tr>
                        <tr>
                            <td>겉옷사이즈</td>
                            <td><input type="text" id="itemEtcsize" name="itemEtcsize" value={itemEtcsize} onChange={handlerChangeitemEtcsize} /></td>
                        </tr>
                        <tr>
                            <td>키</td>
                            <td><input type="text" id="itemHeight" name="itemHeight" value={itemHeight} onChange={handlerChangeitemHeight} /></td>
                        </tr>
                    
                       
                    

                        
                    </table>		
                    <input type="submit" id="submit" value="저장" className="btn" onClick={handlerClickSubmit}/>
                </form>		
            </div>
        </>
    );
}

export default ItemUpload;