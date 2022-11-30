import { useEffect, useState } from "react";
import axios from "axios";
import "./reviewDetail.css";
import Paging from "../pagination/Paging";
import { Link } from "react-router-dom";

function MyReviewList({ history, match }) {

    const { reviewWriter } = match.params;

    const ITEM_COUNT_PER_PAGE = 10;

    const [datas, setDatas] = useState([]);                             // 리뷰 전체 데이터
    const [count, setCount] = useState(0);                              // 전체 개수
    const [page, setPage] = useState(1);                                // 보여지는 페이지
    const [items, setItems] = useState([]);                             // 페이징을 통해서 보여줄 데이터


    const handleImgError = (e) => {
        e.target.src = '../../../noimage/noreviewimage.png';
    }

    const handlerClickList = () => history.goBack();

    // 후기 데이터 가져오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/myReview/${reviewWriter}`,
            { headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}` } })
            .then(response => {
                console.log(response);
                const list = response.data.map(data => ({ ...data, closed: true }));
                console.log(list);
                setDatas(list);                                 // 리뷰 전체 데이터 설정
                setCount(list.length);
                setItems(list.slice((page - 1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
            })
            .catch(error => console.log(error));
    }, []);

    const changePage = page => {
        setPage(page);
        setItems(datas.slice((page - 1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
    };

    const handelrMoreBtn = (reviewNum) => {
        setItems(items.map(item =>
            item.reviewNum === reviewNum ? ({ ...item, closed: !item.closed }) : item
        ));
    };

    // 후기 수정 
    const handlerReviewUpdate = (reviewNum) => {
        history.push(`/review/myReview/${reviewWriter}/${reviewNum}`);    
        console.log(reviewNum);
    }

    // 후기 삭제
    const handlerReviewDelete = (reviewNum) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8080/api/review/myReview/${reviewWriter}/${reviewNum}`)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        alert("정상적으로 삭제되었습니다.");
                        history.push(`/review/myReview/${reviewWriter}`);
                        window.location.reload();
                    } else {
                        alert("삭제에 실패했습니다.");
                        return;
                    }
                })
                .catch(error => console.log(error));
        };
    }

    return (
        <>
            <div className="rcontainer">
                <h2 className="reviewListTitle">내가 작성한 후기</h2>
                <hr className="lineH"></hr>
                <table className="yourreview">
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="35%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope='col'>번호</th>
                            <th colSpan={2}>상품 정보</th>
                            <th scope='col'>대여료</th>
                            <th colSpan={2}>내용</th>
                            <th scope='col'>만족도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items && items.map(review => (
                                <tr key={review.reviewNum}>
                                    <td>{review.reviewNum}</td>
                                    <td className="rReviewItemImageOrigin">
                                            <img className="bookingitemImgreview" src={`../../files/${review.reviewItemfiles}`} />
                                        </td>
                                        <td className='ReviewItemNameOrigin'>
                                        <Link to={`/item/detail/${review.reviewProductIdx}`}>
                                            {review.reviewItemname}
                                            </Link>
                                            </td>
                                        <td className='ReviewWriter'>{review.reviewItemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>
                                    <Link to={`/review/yourReview/${review.reviewWriter}/${review.reviewNum}`}><img className="reviewListItemImg" src={`../../files_review/${review.reviewFiles}`} onError={handleImgError}></img></Link>
                                        {/* 이미지 업로드 부분 */}
                                        {/* <img className="reviewListItemImg" src={`../../files_review/${review.reviewFiles}`} onError={handleImgError}></img> */}
                                    </td>
                                    <td>
                                        <div className="reviewContents">
                                            <p className={review.closed ? "close" : ""}>{review.reviewContents}</p>
                                        </div>
                                        <div id="btnView">
                                            {review.reviewContents.length > 18 ?
                                                <button className="moreBtn" onClick={() => handelrMoreBtn(review.reviewNum)}>
                                                    {review.closed ? " [ + 더보기 ] " : " [ 닫기 ] "}</button>
                                                : null
                                            } 
                                            <button className="moreBtn" onClick={() => handlerReviewUpdate(review.reviewNum)}> [ 수정 ] </button>
                                            <button className="moreBtn" onClick={() => handlerReviewDelete(review.reviewNum)}> [ 삭제 ] </button>
                                        </div>
                                    </td>
                                    <td>
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
                            ))
                        }
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td className="nonedata" colSpan="7"> 작성된 글이 없습니다. </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div>
                    <table className="sun">
                       <tr >
                        <td>
                        <Paging page={page} count={count} setPage={changePage} />
                        </td><td> <input type="button" id="list" className="greyBtnMPID" value="뒤로가기" onClick={handlerClickList} />
                        </td> </tr>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MyReviewList;