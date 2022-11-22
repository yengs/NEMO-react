import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reviewDetail.css";
import Paging from "../pagination/Paging";

function YourReviewList({ match }) {

    const { reviewId } = match.params;

    const ITEM_COUNT_PER_PAGE = 10;
    const [datas, setDatas] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);

    const handleImgError = (e) => {
        e.target.src = '../../../noimage/noreviewimage.png';
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/yourReview/${reviewId}`, { headers: { "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}` } })
            .then(response => {
                const list = response.data.map(data => ({ ...data, closed: true }));
                console.log(response);
                setDatas(list);
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

    return (
        <>
            <div className="rcontainer">
                <h2>내 상점 후기</h2>
                <hr className="lineH"></hr>
                <table className="myreview">
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
                            <th colSpan={2}>상품정보</th>
                            <th scope='col'>작성자</th>
                            <th colSpan={2}>내용</th>
                            <th scope='col'>만족도</th>
                        </tr>
                    </thead>
                    <tbody className="reviewBody">
                        {
                            items && items.map(review => (
                                <tr key={review.reviewNum}>
                                    <td>{review.reviewNum}</td>
                                    <td className="rReviewItemImageOrigin">
                                        <img className="yourBbookingitemImg" src={`../../files/${review.reviewItemfiles}`} />
                                    </td>
                                    <td className='ReviewItemNameOrigin'>{review.reviewItemname}</td>
                                    <td className='ReviewWriter'>{review.reviewWriter}</td>
                                    <td>
                                        {/* 이미지 업로드 부분 여기 사진 안뜨는거 수정하긴 함 */}
                                        <img className="reviewListItemImg" src={`../../files_review/${review.reviewFiles}`} onError={handleImgError}></img>
                                    </td>
                                    <td>
                                        <div className="reviewContents">
                                            <p className={review.closed ? "close" : ""}>{review.reviewContents}</p>
                                        </div>
                                        <button className="moreBtn" onClick={() => handelrMoreBtn(review.reviewNum)}>{review.closed ? " [ + 더보기 ] " : " [ 닫기 ] "}</button>
                                    </td>
                                    <td>
                                        <div className="reviewSatisImg">
                                            {review.reviewSatisfaction}
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
                                    <td colSpan="7"> 작성된 글이 없습니다. </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div>
                    <Paging page={page} count={count} setPage={changePage} />
                </div>
            </div>
        </>
    );
}

export default YourReviewList;