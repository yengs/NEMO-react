import { useEffect, useState } from "react";
import axios from "axios";
import "./reviewDetail.css";
import Shirt from '../img/shirt.jpg';
import Paging from "../pagination/Paging";

function MyReviewList() {

    const ITEM_COUNT_PER_PAGE = 10;

    const [datas, setDatas] = useState([]);                             // 리뷰 전체 데이터
    const [count, setCount] = useState(0);                              // 전체 개수
    const [page, setPage] = useState(1);                                // 보여지는 페이지
    const [items, setItems] = useState([]);                             // 페이징을 통해서 보여줄 데이터

    useEffect(() => {
        axios.get('http://localhost:8080/api/review/myReview')
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

    return (
        <>
            <div className="rcontainer">
                <h2 className="reviewListTitle">내가 작성한 리뷰</h2>
                <hr className="lineH"></hr>
                <table className="yourreview">
                    <colgroup>
                        <col width="15%" />
                        <col width="25%" />
                        <col width="45%" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope='col'>번호</th>
                            <th scope='col'>이미지</th>
                            <th scope='col'>내용</th>
                            <th scope='col'>만족도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items && items.map(review => (
                                <tr key={review.reviewNum}>
                                    <td>{review.reviewNum}</td>
                                    {/* <td>{review.reviewImage}</td> */}
                                    <td>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                        <div className="reviewListItemImg" style={{ backgroundImage: `url(${Shirt})` }}></div>
                                    </td>
                                    <td>
                                        <div className="reviewContents">
                                            <p className={review.closed ? "close" : ""}>{review.reviewContents}</p>
                                        </div>
                                        <div id="btnView">
                                            {review.reviewContents.length > 36 ?
                                                <button className="moreBtn" onClick={() => handelrMoreBtn(review.reviewNum)}>{review.closed ? " [ + 더보기 ] " : " [ 닫기 ] "}</button>
                                                : null
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        {review.reviewSatisfaction}
                                        <div>
                                            {
                                                (function () {
                                                    if (review.reviewSatisfaction === 0) {
                                                        return <img className="reviewSatisImg" src="/clean/zero.png" alt="0percentlass" />
                                                    }
                                                    else if (review.reviewSatisfaction > 0 && review.reviewSatisfaction <= 20) {
                                                        return <img className="reviewSatisImg" src="/clean/twenty.png" alt="1~20"></img>
                                                    } else if (review.reviewSatisfaction > 20 && review.reviewSatisfaction <= 40) {
                                                        return <img className="reviewSatisImg" src="/clean/forty.png" alt="21~40" />
                                                    } else if (review.reviewSatisfaction > 40 && review.reviewSatisfaction <= 60) {
                                                        return <img className="reviewSatisImg" src="/clean/sixty.png" alt="41~60" />
                                                    } else if (review.reviewSatisfaction > 60 && review.reviewSatisfaction <= 80) {
                                                        return <img className="reviewSatisImg" src="/clean/eighty.png" alt="61~80" />
                                                    } else {
                                                        return <img className="reviewSatisImg" src="/clean/oneHundred.png" alt="81~100" />
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
                                    <td colSpan="4"> 작성된 글이 없습니다. </td>
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

export default MyReviewList;