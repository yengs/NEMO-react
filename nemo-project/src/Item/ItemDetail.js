import axios from "axios";
import { useEffect, useState } from "react";
// import "./ItemDetail.css";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import styled from "styled-components";
import { Link } from "react-router-dom";
import Paging from "../pagination/Paging";
import Pagination from "react-js-pagination"

function ItemDetail({ match, history }) {

    const ITEM_COUNT_PER_PAGE = 5;

    const [data, setData] = useState({});
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const [page, setPage] = useState(1);   
    const [count, setCount] = useState(0); 
    const [items, setItems] = useState([]);   

    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDeposit, setItemDeposit] = useState('');
    const [itemDetail, setItemDetail] = useState('');
    const [itemWriter, setItemWriter] = useState('');
    const [files, setItemImage] = useState('');
    const [itemRentalstart, setItemRentalstart] = useState('');
    const [itemRentalend, setItemRentalend] = useState('');
    const [memberImg, setMemberImg] = useState('');
    const [memberNickname,setMemberNickname]= useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState(0);

    const { itemNum } = match.params;
    const reviewProductIdx = itemNum;

    const handleImgError = (e) => {
        e.target.src = '../../../noimage/noimage.gif';
    }

    const changePage = page => {
        setPage(page);
        setItems(datas.slice((page - 1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
    };

    const handelrMoreBtn = (reviewNum) => {
        setItems(items.map(item =>
            item.reviewNum === reviewNum ? ({ ...item, closed: !item.closed }) : item
        ));
    };

    const [isFetched, setFetched] = useState(false);
    

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/detail/${itemNum}`)
            .then(response => {
                setFetched(true);
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
                setMemberNickname(response.data.memberNickname);

                // 리뷰어의 클린지수 조회
                axios.get(`http://localhost:8080/api/clean/${response.data.itemWriter}`)
                    .then(response => {
                        console.log(response);
                        setReviewSatisfaction(response.data);
                    })
                    .catch(error => console.log(error));

                axios.get(`http://localhost:8080/api/mypage/mypageitem/${response.data.itemWriter}`)
                    .then(response => {
                        setDatas2(response.data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => { setFetched(true); console.log(error); });
        //후기조회
        axios.get(`http://localhost:8080/api/itemreview/${reviewProductIdx}`)
            .then(response => { 
                const list = response.data.map(data => ({ ...data, closed: true }));
                console.log(list);
                setDatas(list)
                setCount(list.length);
                setItems(list.slice((page - 1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
                })
            .catch(error => { console.log(error); });

    }, [match.params]);


    const handlerChangeName = (e) => setItemName(e.target.value);
    const handlerChangePrice = (e) => setItemPrice(e.target.value);
    const handlerChangeDeposit = (e) => setItemDeposit(e.target.value);
    const handlerChangeDetail = (e) => setItemDetail(e.target.value);

    const handlerClickList = () => history.push(`/item/cate/sub/${data.itemSubcategory}`);
    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/item/${match.params.itemNum}`)
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
        axios.put(`http://localhost:8080/api/item/${match.params.itemNum}`, { 'itemName': itemName, 'itemPrice': itemPrice, 'itemDetail': itemDetail })
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
        if (sessionStorage.getItem("memberId") === data.itemWriter) {
            history.push(`/mypage/mypageitem/${sessionStorage.getItem("memberId")}`);
        } else {
            history.push(`/userstoreinfo/${data.memberNickname},${data.itemWriter},${data.memberImg}`);
        }
    }

    const handlerMaincate = () => {
        history.push(`/item/cate/${data.itemMaincategory}`);
    }

    const handlerSubcate = () => {
        history.push(`/item/cate/sub/${data.itemSubcategory}`);
    }

    let now = new Date();

    const dateWhat = () => {

        if (sessionStorage.getItem("memberId") === data.itemWriter) {
            alert("본인물품은 대여신청할 수 없습니다.");
            history.goBack();
        } else if (sessionStorage.getItem("memberId") === null) {
            alert("로그인 해주세요.");
            history.push('/member/login');
        } else if (new Date(itemRentalend) > now) {
            history.push(`/item/bookingupload/${match.params.itemNum},${itemName},${itemDeposit},${itemPrice},${itemWriter},${files},${itemRentalstart},${itemRentalend}`);
        } else {
            alert("대여기간이 지난 상품입니다")
            history.push(`/item/cate/sub/${data.itemSubcategory}`);
        }

    }


    const chatting = () => {
        if (sessionStorage.getItem("memberId") === null) {
            alert("로그인이 필요합니다.");
            history.push('/member/login');
        }
        else if (new Date(itemRentalend) < now) {
            alert("대여기간 지난 상품입니다.");
            history.goBack();
        }
        else if (sessionStorage.getItem("memberId") !== data.itemWriter) {
            history.push(`/chatting/${itemWriter}`);
        }
        else if (sessionStorage.getItem("memberId") === data.itemWriter) {
            alert("본인은 본인에게 채팅을 할수 없습니다.");
            history.goBack();
        }
        
       
    
    }

    if (isFetched && data.itemName !== undefined) {
    return (
        <ItemDatailContainer style={{ padding: "30px 0" }}>
            <>
                <div className="DetailContainer" style={{ maxWidth: '1000px' }}>
                    <h2>상품 상세</h2>
                    <div className="clickList">

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
                            <img className="itemImg" src={`../../files/${data.files}`} onError={handleImgError} />
                        </div>
                        <div className="tableform">
                            <div>
                                <h2 className="itemName">{data.itemName}</h2>
                                <h3 className="itemPrice"><span>{itemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>원</h3>
                                <p className="itemDeposit">보증금<span>{itemDeposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>원</p>
                                <div style={{ borderBottom: "1px solid #ddd" }}></div>
                                <p className="itemSize">사이즈
                                    {
                                        (function () {
                                            if (data.itemMaincategory === "상의") {
                                                return <span>{data.itemTopsize}</span>
                                            }
                                            else if (data.itemMaincategory === "하의") {
                                                return <span>{data.itemBottomsize}</span>
                                            }
                                            else { return <span>{data.itemEtcsize}</span> }
                                        })()
                                    }
                                </p>
                                <h4 className="itemRentalPeriod">대여기간<span>{data.itemRentalstart} ~ {data.itemRentalend}</span></h4>
                                <p className="itemDetailContent">{data.itemDetail}</p>
                            </div>

                            <div className="buttonDiv">
                                <input type="button" id="chatting" className="ItemgreenBtn" value="채팅하기" onClick={chatting} />
                                <input type="button" id="retals" className="ItemgreenBtn" value="대여하기" onClick={dateWhat} />
                            </div>
                        </div>
                    </div>

                    <div className="middleDiv">
                        {/* 대여자 프로필 사진이 떠야함 + 클린지수 퍼센트 숫자 수정
                        + 클린지수 퍼센트에 따라 게이지 차게끔 수정 */}
                        <div className="writerWrap">

                            <div className="writerDiv" style={{ cursor: "pointer" }} onClick={goUserStore}>
                                <h3>대여자</h3>
                                <img className="memberImg" src={`../../memberImg/${memberImg}`} onError={handleImgError}></img>
                            </div>
                            <div style={{ cursor: "pointer", marginTop:'25px' }} onClick={goUserStore} className="cleanDiv">
                                <h4>{memberNickname}</h4>
                                <div>

                                    {reviewSatisfaction == 0 ?
                                        <div>
                                            <div className='item-detail-clean'> 클린지수 50 % </div>
                                            <img className="myMenu-img" src="/clean/fourtyp.png" alt="50" />
                                        </div>
                                        :
                                        <div>
                                            <div className='item-detail-clean' style={{marginTop: '12px'}}> 클린지수 {reviewSatisfaction}% </div>
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
                            <div className="myitem1">


                                <div className="myitem">

                                    {
                                        datas2 && datas2.map(items => (
                                            <div key={items.itemNum} >
                                                <div className="itemInfoWrap" style={{ width: "130px", height: "140px", backgroundColor: "transparent", marginLeft: "20px" }}  >
                                                    <Link to={`/item/detail/${items.itemNum}`}>
                                                        <img className="itemImggg" src={`../../files/${items.files}`} onError={handleImgError}></img>
                                                    </Link>
                                                </div>
                                            </div>
                                        )).slice(0, 4)
                                    }
                                    {
                                        datas2.length === 0 && (
                                            <tr>
                                                <td colSpan="4">일치는 데이터가 없습니다!.</td>
                                            </tr>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="reviewDiv">
                        <h3>대여후기</h3>
                        <div>
                            <table className="reviewTable">
                                <colgroup>
                                    <col width={"13%"}></col>
                                    <col width={"auto"}></col>
                                    <col width={"54%"}></col>
                                    <col width={"auto"}></col>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>작성자</th>
                                        <th>리뷰사진</th>
                                        <th>내용</th>
                                        <th>만족도</th>
                                    </tr>
                                </thead>
                                {
                                    items && items.map(review => (
                                        <tbody>
                                            <tr key={review.reviewNum}>
                                                <td className='ReviewWriter' rowSpan={3}>{review.reviewWriter}</td>
                                                <td rowSpan={2} className="ReviewItemImage2">
                                                <Link to={`/review/yourReview/${review.reviewWriter}/${review.reviewNum}`}>
                                                    <img className="bookingitemImg" src={`../../files_review/${review.reviewFiles}`} onError={handleImgError} />
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="reviewContents">
                                                        <p className={review.closed ? "close" : ""}>{review.reviewContents}</p>
                                                    </div>
                                                    <div id="btnView">
                                                        {review.reviewContents.length > 28 ?
                                                            <button className="moreBtn" onClick={() => handelrMoreBtn(review.reviewNum)}>{review.closed ? " [ + 더보기 ] " : " [ 닫기 ] "}</button>
                                                            : null
                                                        }
                                                    </div>
                                                </td>
                                                <td className='ReviewWriter' rowSpan={3}>
                                                    {review.reviewSatisfaction}
                                                    <div>
                                                        {
                                                            (function () {
                                                                if (review.reviewSatisfaction === 0) {
                                                                    return <img className="reviewSatisImg" src="/clean/zero.png" alt="0percentlass" />
                                                                } else if (review.reviewSatisfaction > 0 && review.reviewSatisfaction <= 20) {
                                                                    return <img className="reviewSatisImg" src="/clean/tenp.png" alt="10"></img>
                                                                } else if (review.reviewSatisfaction > 20 && review.reviewSatisfaction <= 40) {
                                                                    return <img className="reviewSatisImg" src="/clean/thirtyp.png" alt="40" />
                                                                } else if (review.reviewSatisfaction > 40 && review.reviewSatisfaction <= 50) {
                                                                    return <img className="reviewSatisImg" src="/clean/fourtyp.png" alt="40" />
                                                                } else if (review.reviewSatisfaction > 50 && review.reviewSatisfaction <= 60) {
                                                                    return <img className="reviewSatisImg" src="/clean/sixtyp.png" alt="40" />
                                                                } else if (review.reviewSatisfaction > 60 && review.reviewSatisfaction <= 70) {
                                                                    return <img className="reviewSatisImg" src="/clean/seventyp.png" alt="40" />
                                                                } else if (review.reviewSatisfaction > 70 && review.reviewSatisfaction <= 80) {
                                                                    return <img className="reviewSatisImg" src="/clean/eightyp.png" alt="40" />
                                                                } else if (review.reviewSatisfaction > 80 && review.reviewSatisfaction <= 99) {
                                                                    return <img className="reviewSatisImg" src="/clean/ninetyp.png" alt="40" />
                                                                } else {
                                                                    return <img className="reviewSatisImg" src="/clean/onehundredp.png" alt="81~100" />
                                                                }
                                                            })()
                                                        }
                                                    </div>
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
                            <div>
                             {/* <Paging page={page} count={count} setPage={changePage} /> */}
                             <Pagination
                                activePage={page}   // 현재 페이지
                                itemsCountPerPage={5}  // 한 페이지당 보여줄 게시글 개수
                                totalItemsCount={count}   // 모든 게시글 수
                                pageRangeDisplayed={10}  // paginator안에서 보여줄 페이지의 범위
                                prevPageText={"<"}  // 이전을
                                nextPageText={">"}  // 다음
                                onChange={changePage}    // 페이지가 바뀔 때 핸들러 함수 
                            />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blank"></div>
            </>
        </ItemDatailContainer>

    );
                            }
                            if (isFetched && data.itemName === undefined) {
                               history.goBack();
                               alert("정지된 회원의 상품입니다.")
                            }                  
                                            
}

const ItemDatailContainer = styled.div`

.itemImggg{
    width: 100% !important;
    height: 100%;
    border: 1px solid rgb(194, 217, 204);
    border-radius: 5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}


.myitem{
    margin-left:33px;
    display:flex;
    box-sizing: border-box;
    text-align: center;
}
.myitem1{
    display:inline-block;
    
}
.middleDiv {
    // justify-content: center;
    // align-items: center;
    // display: flex;
    height: auto;
    width: 100%;
    margin-top: 50px;
    background-color: rgba(100,165,127,0.1);
    padding: 25px 30px;
}

.writerWrap {
    display:inline-flex;
}

.writerDiv {
    display: inline-block;
    margin-right: 10px;
}

.writerDiv h3 {
    margin: 0 0 10px 0;
    text-align: left;
}

.cleanDiv {
    justify-content: right;
    align-self: center;
    text-align: -webkit-center;
    margin: 0 50px 20px 5px;
    display: inline-block;
    font-size: 15px;
}

.middleDiv .memberImg {
    background-color: rgb(219, 219, 219);
    width: 100px;
    height: 100px;
    border-radius: 50%;
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

.DetailContainer .reviewCate {
    text-align: center;
    height: 30px;
    border-bottom: 1px solid rgb(219, 219, 219);
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


.reviewContents p {
    display: -webkit-box;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    // font-size: 13px;
    color: rgb(85, 85, 85);
    text-align: left;
    width: auto;
}

.reviewContents p.close {
    display: -webkit-box;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: left;
    width: auto;
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
    border-bottom: 1px solid #aaa;
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
    justify-content: flex-start;
    align-items: center;
}

.tableform {
    width: 650px;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 400px;
}

.tableform table {
    width: 100%;
}

.tableform table th {
    text-align: right;
    padding: 15px 10px 15px 0;
}

.tableform table td {
    text-align: left;
    padding: 15px 0 15px 10px;
}

.tableform .itemName {
    font-size: 28px;
    margin: 0;
}

.tableform .itemPrice {
    font-size: 22px;
    margin: 7px 0 0 0;
}

.tableform .itemDeposit {
    font-size: 18px;
    font-weight: 700;
    color: #666;
}

.tableform .itemDeposit span {
    margin: 0 1px 0 10px;
}

.tableform .itemPrice span {
    color: rgb(100,165,127);
    margin-right: 3px;
}

.tableform .itemSize {
    margin-top: 30px;
    font-size: 18px;
}

.tableform .itemSize span {
    font-weight: 700;
    margin-left: 7px;
}

.tableform .itemRentalPeriod {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 500;
}

.tableform .itemRentalPeriod span {
    margin-left: 10px;
    font-weight: 600;
}

.tableform .itemDetailContent {
    margin-top: 25px;
    font-size; 17px;
    line-height: 23px;
    overflow-y: scroll;
    height: 155px;
    white-space: pre-wrap;
    word-break: break-all;
    
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
    width: 350px;
    height: 400px;
    object-fit: cover;
}

/* -- clean */

.item-detail-clean {
    text-align: left;
}

.item-detail-Img {
    margin-top: 7px;
    width: 140px;
    margin-bottom: 3px;
}

.deleteitem{
    background-color:rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 200px;
    margin-top : 10%;
}

.deleteitem2{
    text-align: center;
    vertical-align : middle;
    font-size: 80px;
}

.backBtn {
    padding: 10px 10px;
    margin: 0px 3px 0;
    text-align: center;
    font-size: 15px;
    border-radius: 3px;

    border: rgb(100, 165, 127);
    background-color: rgb(100, 165, 127);
    color: #fff;
}

/* -------- */
`

export default ItemDetail;