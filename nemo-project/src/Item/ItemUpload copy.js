import axios from "axios";
import { useState, useEffect } from "react";

// 카테고리 테이블에 있는 값 가져올 수 있는 방법인데 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
//조인한 값을 ...리스트에 못띄우겠어요


function ItemUpload({ history }) {
    const [iName, setiName] = useState('');
    const [iPrice, setiPrice] = useState('');
    const [itemMaincategory, setitemMaincategory] = useState('');   // 선택된 대분류 값
    const [itemSubcategory, setitemSubcategory] = useState('');     // 선택된 소분류 값
    const [itemDeposit, setitemDeposit] = useState('');
    const [itemDetail, setiitemDetail] = useState('');
    const [itemWeather, setitemWeather] = useState('');
    const [itemTopsize, setitemTopsize] = useState('');
    const [itemBottomsize, setitemBottomsize] = useState('');
    const [itemEtcsize, setitemEtcsize] = useState('');
    const [itemHeight, setitemHeight] = useState('');
    // const [itemRentalperiod, setitemRentalperiod] = useState('');

    const [cate, setCate] = useState([]);       // 카테고리 전체
    const [mainCate, setMainCate] = useState([]);   // 대분류 목록
    const [subCate, setSubCate] = useState([]);     // 소분류 목록



    const [cate1, setCate1] = useState([]);     
    const [cate2, setCate2] = useState([]);     
    

    useEffect(() => {
        axios.get(`http://localhost:8080/api/maincate`)
            .then(response => { 
                console.log(response); 
                setCate(response.data); 
                setMainCate(response.data.filter(c => c.tier === 1));
                // setSubCate(response.data.filter(c => c.tier === 2));                
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/subcate`)
            .then(response => { console.log(response); setCate2(response.data); })
            .catch(error => console.log(error));
    }, []);


    

    
    const handlerChangeiName = (e) => setiName(e.target.value);
    const handlerChangeiPrice = (e) => setiPrice(e.target.value);
    const handlerChangeitemMaincategory = (e) => {
        console.log(e);
        console.log(e.target.value);
        
        setitemMaincategory(e.target.value);    // 선택된 메인 카테고리 값
        // 선택된 메인 카테고리의 서브 카테고리 값을 추출해서 상태 변수에 설정
        setSubCate(cate.filter(c => c.cateParent === e.target.value));      
    }
    const handlerChangeitemSubcategory = (e) => setitemSubcategory(e.target.value);
    const handlerChangeitemDeposit = (e) => setitemDeposit(e.target.value);
    const handlerChangeitemDetail = (e) => setiitemDetail(e.target.value);
    const handlerChangeitemWeather = (e) => setitemWeather(e.target.value);
    const handlerChangeitemTopsize = (e) => setitemTopsize(e.target.value);
    const handlerChangeitemBottomsize = (e) => setitemBottomsize(e.target.value);
    const handlerChangeitemEtcsize = (e) => setitemEtcsize(e.target.value);
    const handlerChangeitemHeight = (e) => setitemHeight(e.target.value);
    // const handlerChangeitemRentalperiod=(e) => setitemRentalperiod(e.target.value);

    const handlerClickSubmit = (e) => {
        e.preventDefault();

        // console.log({ "itemName": iName, "itemPrice": iPrice, "iName": iName, "iPrice": iPrice,"itemMaincategory":itemMaincategory,"itemSubcategory":itemSubcategory,"itemDeposit":itemDeposit,
        // "itemDetail":itemDetail,"itemWeather":itemWeather,"itemTopsize":itemTopsize,"itemBottomsize":itemBottomsize,
        // "itemEtcsize":itemEtcsize,"itemHeight":itemHeight });

        // return;

        axios.post('http://localhost:8080/api/item', { "itemName": iName, "itemPrice": iPrice, "iName": iName, "iPrice": iPrice,"itemMaincategory":itemMaincategory,"itemSubcategory":itemSubcategory,"itemDeposit":itemDeposit,
                                                        "itemDetail":itemDetail,"itemWeather":itemWeather,"itemTopsize":itemTopsize,"itemBottomsize":itemBottomsize,
                                                        "itemEtcsize":itemEtcsize,"itemHeight":itemHeight })
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

                        <tr>
                            <td>상품 대분류</td>
                            <td>
                                <select type="text" id="itemMaincategory" name="itemMaincategory" value={itemMaincategory} onChange={handlerChangeitemMaincategory}>
                                <option value="">선택</option>
                                {
                                    // cate1.map(c => (<option key={c.cateCode} value={c.cateCode} onChange={cateselect}>{c.cateName}</option>))
                                    mainCate.map(c => (<option key={c.cateCode} value={c.cateCode}>{c.cateName}</option>))
                                }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>상품 소분류</td>
                            <td>
                                <select type="text" id="itemSubcategory" name="itemSubcategory"  value={itemSubcategory} onChange={handlerChangeitemSubcategory}>
                                <option value="">선택</option>
                                {
                                    // cate2.map(c2 =>{
                                    //     if(c2.cateParent == cate1.value) {
                                    //         return <option value={c2.cateName}>{c2.cateName}</option>
                                    //     }
                                    // })

                                    subCate.map(c => (<option key={c.cateCode} value={c.cateCode}>{c.cateName}</option>))

                                    // cate2.map(c2 => (<option value={c2.cateName}>{c2.cateName}</option>))

                                    // if c2.cateParent = c1.cateCode 
                                    // return c2.cateName
                                }
                                {/* <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option> */}
                                </select>
                            </td>
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
                            <td> <input className="form-control" type = "file" name="file"/></td>
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