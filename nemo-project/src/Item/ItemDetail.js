import axios from "axios";
import { useEffect, useState } from "react";
// import "./ItemDetail.css";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import styled from "styled-components";

function ItemDetail({ match, history }) {

    const { itemNum } = match.params;

    const [data, setData] = useState({});
    const [datas, setDatas] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDeposit, setItemDeposit] = useState('');
    const [itemDetail, setItemDetail] = useState('');
    const [itemWriter, setItemWriter] = useState('');
    const [files, setItemImage] = useState('');
    const [itemRentalstart, setItemRentalstart] = useState('');
    const [itemRentalend, setItemRentalend] = useState('');
    const [memberImg, setMemberImg] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState(0);

    const reviewProductIdx = itemNum;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/detail/${itemNum}`)
            .then(response => {
                setData(response.data);
                setItemName(response.data.itemName);
                setItemPrice(response.data.itemPrice);
                setItemDeposit(response.data.itemDeposit);
                setItemDetail(response.data.itemDetail);
                setItemWriter(response.data.itemWriter);
                setItemImage(response.data.files);
                setItemRentalstart(response.data.itemRentalstart);
                setItemRentalend(response.data.itemRentalend);
                setMemberImg(response.data.memberImg);

                // 리뷰어의 클린지수 조회
                axios.get(`http://localhost:8080/api/clean/${response.data.itemWriter}`)
                    .then(response => {
                        console.log(response);
                        setReviewSatisfaction(response.data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => { console.log(error); });
    }, []);

    //후기조회
    useEffect(() => {
        axios.get(`http://localhost:8080/api/itemreview/${reviewProductIdx}`)
            .then(response => { setDatas(response.data); })
            .catch(error => { console.log(error); });
    }, []);


    const handlerChangeName = (e) => setItemName(e.target.value);
    const handlerChangePrice = (e) => setItemPrice(e.target.value);
    const handlerChangeDeposit = (e) => setItemDeposit(e.target.value);
    const handlerChangeDetail = (e) => setItemDetail(e.target.value);

    const handlerClickList = () => history.goBack();
    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/item/${itemNum}`)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert("정상적으로 삭제되었습니다.");
                    history.push("/item");
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
                        onClose: () => history.push("/item")
                    });

                } else {
                    alert("수정에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    };

    const goBooking = () => {
        history.push(`/item/bookingupload`);
    }

    const goUserStore = () => {
        history.push(`/userstoreinfo/${data.itemWriter},${data.memberImg}`);
    }

    const handlerMaincate = () => {
        history.push(`/item/cate/${data.itemMaincategory}`);
    }

    const handlerSubcate = () => {
        history.push(`/item/cate/sub/${data.itemSubcategory}`);
    }

    let now = new Date();

    const dateWhat = () => {
        if (new Date(itemRentalend) > now) {
            history.push(`/item/bookingupload/${itemNum},${itemName},${itemDeposit},${itemPrice},${itemWriter},${files},${itemRentalstart},${itemRentalend}`);
        } else {
            alert("대여기간이 지난 상품입니다")
            history.push(`/item/cate/sub/${data.itemSubcategory}`);
        }

        if (sessionStorage.getItem("memberId") === data.itemWriter) {
            alert("본인물품은 대여신청할 수 없습니다.");
            history.goBack();
        }

    }

    const chatting = () => {
        history.push(`/chatting/${itemWriter}`);
    }

    return (
        <ItemDatailContainer style={{padding: "80px 0"}}>
            <div className="DetailContainer">
                <h2>상품 상세</h2>
                <div className="clickList">
                    {/* <p className="cate">{data.itemMaincategory}{' > '}{data.itemSubcategory}</p> */}

                    <div className="Breadcrumb">
                        <Breadcrumb tag='nav' listTag='div'>
                            <BreadcrumbItem tag='a' onClick={handlerMaincate}>{data.itemMaincategory}</BreadcrumbItem>
                            {' > '}
                            <BreadcrumbItem tag='a' onClick={handlerSubcate}>{data.itemSubcategory}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div>
                        <a className="goList" onClick={handlerClickList}>목록으로</a>
                        <p>👀 {data.itemReadcount} 📅 {data.itemDate}</p>
                    </div>
                </div>
                <br></br>
                <div className="tablePlusForm">
                    <div className="imageDiv">
                        <img className="itemImg" src={`../../files/${data.files}`} />
                    </div>
                    <div className="tableform">
                        <form method="post" id="frm" name="frm">
                            <table>
                                <colgroup>
                                    <col width="33%" />
                                    <col width="" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="row">상품명</th>
                                        <td>{data.itemName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">어울리는 계절</th>
                                        <td>{data.itemWeather}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">가격</th>
                                        <td>{data.itemPrice}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">보증금</th>
                                        <td>{data.itemDeposit}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">사이즈</th>
                                        {
                                            (function () {
                                                if (data.itemMaincategory === "상의") {
                                                    return <td>{data.itemTopsize}</td>
                                                }
                                                else if (data.itemMaincategory === "하의") {
                                                    return <td>{data.itemBottomsize}</td>
                                                }
                                                else { return <td>{data.itemEtcsize}</td> }
                                            })()
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row">대여기간</th>
                                        <td>{data.itemRentalstart} ~ {data.itemRentalend}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">내용</th>
                                        <td className="itemDetailContent">{data.itemDetail}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>

                <div className="middleDiv">
                    {/* 대여자 프로필 사진이 떠야함 + 클린지수 퍼센트 숫자 수정
                        + 클린지수 퍼센트에 따라 게이지 차게끔 수정 */}
                    <div className="writerWrap">

                        <div className="writerDiv">
                            <h3>대여자</h3>
                            <img className="memberImg" src={`../../memberImg/${memberImg}`}></img>
                        </div>
                        <div className="cleanDiv">
                            <h4 onClick={goUserStore}>{itemWriter}</h4>
                            <div>

                                {reviewSatisfaction == 0 ?
                                    <div>
                                        <div className='item-detail-clean'> 클린지수 50 % </div>
                                        <img className="myMenu-img" src="/clean/fourtyp.png" alt="50" />
                                    </div>
                                    :
                                    <div>
                                        <div className='item-detail-clean'> 클린지수 {reviewSatisfaction}% </div>
                                        <div> {
                                            (function () {
                                                if (reviewSatisfaction === 0) {
                                                    return <img className="item-detail-Img" src="/clean/zero.png" alt="0percentlass" />
                                                } else if (reviewSatisfaction > 0 && reviewSatisfaction <= 20) {
                                                    return <img className="item-detail-Img" src="/clean/tenp.png" alt="10"></img>
                                                } else if (reviewSatisfaction > 20 && reviewSatisfaction <= 40) {
                                                    return <img className="item-detail-Img" src="/clean/thirtyp.png" alt="40" />
                                                } else if (reviewSatisfaction > 40 && reviewSatisfaction <= 50) {
                                                    return <img className="item-detail-Img" src="/clean/fourtyp.png" alt="50" />
                                                } else if (reviewSatisfaction > 50 && reviewSatisfaction <= 60) {
                                                    return <img className="item-detail-Img" src="/clean/sixtyp.png" alt="60" />
                                                } else if (reviewSatisfaction > 60 && reviewSatisfaction <= 70) {
                                                    return <img className="item-detail-Img" src="/clean/seventyp.png" alt="70" />
                                                } else if (reviewSatisfaction > 70 && reviewSatisfaction <= 80) {
                                                    return <img className="item-detail-Img" src="/clean/eightyp.png" alt="80" />
                                                } else if (reviewSatisfaction > 80 && reviewSatisfaction <= 99) {
                                                    return <img className="item-detail-Img" src="/clean/ninetyp.png" alt="99" />
                                                } else {
                                                    return <img className="item-detail-Img" src="/clean/onehundredp.png" alt="100" />
                                                }
                                            })()
                                        }</div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="buttonDiv">
                        <input type="button" id="chatting" className="ItemgreenBtn" value="채팅하기" onClick={chatting} />
                        <input type="button" id="retals" className="ItemgreenBtn" value="대여하기" onClick={dateWhat} />
                    </div>
                </div>


                <div className="reviewDiv">
                    <h3>대여후기</h3>
                    <div>
                        <table className="reviewTable">
                            <thead>
                                <tr>
                                    <th>작성자</th>
                                    <th>리뷰사진</th>
                                    <th>내용</th>
                                    <th>만족도</th>
                                </tr>
                            </thead>
                            {
                                datas && datas.map(review => (
                                    <tbody>
                                        <tr key={review.reviewNum}>
                                            <td className='ReviewWriter' rowSpan={3}>{review.reviewWriter}</td>
                                            <td rowSpan={2} className="ReviewItemImage2">
                                                <img className="bookingitemImg" src={`../../files_review/${review.reviewFiles}`} />
                                            </td>
                                            <td className='ReviewContent' rowSpan={3}>{review.reviewContents}</td>
                                            <td className='ReviewWriter' rowSpan={3}>
                                                {
                                                    (function () {
                                                        if (reviewSatisfaction === 0) {
                                                            return <img className="item-detail-Img" src="/clean/zero.png" alt="0percentlass" />
                                                        } else if (reviewSatisfaction > 0 && reviewSatisfaction <= 20) {
                                                            return <img className="item-detail-Img" src="/clean/tenp.png" alt="10"></img>
                                                        } else if (reviewSatisfaction > 20 && reviewSatisfaction <= 40) {
                                                            return <img className="item-detail-Img" src="/clean/thirtyp.png" alt="40" />
                                                        } else if (reviewSatisfaction > 40 && reviewSatisfaction <= 50) {
                                                            return <img className="item-detail-Img" src="/clean/fourtyp.png" alt="50" />
                                                        } else if (reviewSatisfaction > 50 && reviewSatisfaction <= 60) {
                                                            return <img className="item-detail-Img" src="/clean/sixtyp.png" alt="60" />
                                                        } else if (reviewSatisfaction > 60 && reviewSatisfaction <= 70) {
                                                            return <img className="item-detail-Img" src="/clean/seventyp.png" alt="70" />
                                                        } else if (reviewSatisfaction > 70 && reviewSatisfaction <= 80) {
                                                            return <img className="item-detail-Img" src="/clean/eightyp.png" alt="80" />
                                                        } else if (reviewSatisfaction > 80 && reviewSatisfaction <= 99) {
                                                            return <img className="item-detail-Img" src="/clean/ninetyp.png" alt="99" />
                                                        } else {
                                                            return <img className="item-detail-Img" src="/clean/onehundredp.png" alt="100" />
                                                        }
                                                    })()
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                            {
                                datas.length === 0 && (
                                    <tr>
                                        <td colSpan="4"> 작성된 글이 없습니다. </td>
                                    </tr>
                                )
                            }

                        </table>
                    </div>
                </div>
            </div>

            <div className="blank"></div>

        </ItemDatailContainer>

    );
}

const ItemDatailContainer = styled.div`
.middleDiv {
    justify-content: space-between;
    align-items: flex-end;
    display: flex;
    height: auto;
    width: 100%;
    margin-top: 50px;
    background-color: rgba(100,165,127,0.1);
    padding: 25px 30px;
}

.writerWrap {
    display: flex;
}

.writerDiv {
    margin-right: 10px;
}

.writerDiv h3 {
    margin: 0 0 7px 13px;
    text-align: left;
}

.cleanDiv {
    justify-content: right;
    align-self: center;
    text-align: -webkit-center;
    margin-top: 40px;
    margin-bottom: 13px;
    font-size: 15px;
}

.middleDiv .memberImg {
    background-color: rgb(219, 219, 219);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px;
}
.ReviewItemImage2 .bookingitemImg{
    width: 100px;
    height: 100px;
}

.reviewDiv {
    margin-top: 80px;
}

.reviewDiv h3 {
    font-size: 21px;
    margin-bottom: 18px;
}

.reviewDiv .reviewTable th{
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #bbb;
    padding: 10px 5px;
    text-align: center;
}

.reviewDiv .reviewTable tr{
    border-bottom: 1px solid #ccc;
    padding: 10px 5px;
    text-align: center;
}

.DetailContainer p {
    font-size: 15px;
    margin-bottom: 0.4em;
}

a.goList {
    font-weight: bold;
    cursor: pointer;
}

.Breadcrumb {
    // margin-right: 80%;
    font-size: 15px;
    font-weight: 300;
    cursor: pointer;
    margin: 0.4em 0;
    color: #666;
}

p.cate {
    margin-right: 80%;
    font-size: medium;
}

th {
    height: 48px;
}

h4 {
    margin-bottom: 7px;
    font-size: medium;
    text-align: left;
}

.middleDiv .input {
    font-weight: 100;
    margin: 20px 15px 0;
    font-size: 15px;
    padding: 10px 30px;
    border-radius: 3px;
}

.ItemgreenBtn {
    padding: 10px 10px;
    margin: 0px 3px 0;
    text-align: center;
    font-size: 15px;
    border-radius: 3px;

    border: rgb(100, 165, 127);
    background-color: rgb(100, 165, 127);
    color: #fff;
}

.buttonDiv {
    text-align: right;
    margin-bottom: 0;
}

.writeDate {
    flex-direction: row-reverse;
}

.DetailContainer form {
    display: inline;
    justify-content: center;
    align-content: center;
}

.DetailContainer th {
    text-align: right;
    vertical-align: middle;
}

.DetailContainer .reviewCate {
    text-align: center;
    height: 30px;
    border-bottom: 1px solid rgb(219, 219, 219);
}

.DetailContainer td {
    text-align: left;
    vertical-align: middle;
    width: 100%;
    height: 48px;
    padding-inline: 20px;
    padding-top: 5px;
}

.reviewDiv table {
    width: 100%;
    height: max-content;
    border-top: 1px solid rgb(219, 219, 219);
    border-collapse: collapse;
}

.reviewDiv tr,
th,
td {
    align-content: center;
    width: auto;
    /* text-align: center; */
    padding: 10px;
    vertical-align: middle;
}

td.reviewImg,
.reviewCtns,
.reviewClean {
    text-align: left;
}

.reviewDiv .reviewClean,
.leftside {
    border-bottom: 1px solid rgb(219, 219, 219);
}

.reviewDiv .leftside {
    text-align: center;
}

.DetailContainer form tr>td>input {
    border: 1px solid #ddd;
    width: 95%;
    padding: 8px 6px;
    border-radius: 3px;
}

.clickList,
.p {
    position: relative;
    /* top: 10px; */
    // right: 30px;
    text-align: right;
}

.clickList {
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.DetailContainer {
    max-width: 1200px;
    margin: 0 auto;
}

.DetailContainer h2 {
    position: relative;
    // left: 30px;
    text-align: left;
}

.tablePlusForm{
    display: flex;
    justify-content: center;
    align-items: center;
}

.tableform table {
    width: 100%;
}

.tableform table td {
    padding-top: 10px;
}

.DetailContainer form {
    width: 500px;
    margin: auto;
    text-align: -webkit-center;
}

/* 후기 아래로 푸터랑 너무 붙길래 만든 공간 */
.blank {
    padding-bottom: 50px;
}

a.ItemReviewList {
    padding-left: 95%;
    text-decoration: none;
}

.tablePlusForm .itemImg {
    background-color: rgb(219, 219, 219);
    width: 370px;
    height: 420px;
}

/* -- clean */

.item-detail-clean {
    text-align: left;
}

.item-detail-Img {
    margin-top: 7px;
    width: 140px;
}

/* -------- */
`

export default ItemDetail;