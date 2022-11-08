import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reviewDetail.css";
import Shirt from '../img/shirt.jpg';
import Paging from "../pagination/Paging";

function YourReviewList() {
    
    const ITEM_COUNT_PER_PAGE = 10;
    const [datas, setDatas] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/review/yourReview')
            .then(response => {
                const list = response.data.map(data => ({ ... data, closed: true}));
                console.log(response);
                setDatas(list);
                setCount(list.length);
                setItems(list.slice((page - 1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
            })
            .catch(error => console.log(error));
    }, []);

    const changePage = page => {
        setPage(page);
        setItems(datas.slice((page-1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
    };

    const handelrMoreBtn = (reviewNum) => {
        setItems(items.map(item =>
            item.reviewNum === reviewNum ? ({ ...item, closed: !item.closed }) : item
        ));
    };

    return (
        <>
            <div className="rcontainer">
                <h1>내 상점 리뷰</h1>
                <hr className="lineH"></hr>
                <table className="myreview">
                    <colgroup>
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="*" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope='col'>번호</th>
                            <th scope='col'>작성자</th>
                            <th scope='col'>이미지</th>
                            <th scope='col'>내용</th>
                            <th scope='col'>만족도</th>
                        </tr>
                    </thead>
                    <tbody className="reviewBody">
                        {
                            items && items.map(review => (
                                <tr key={review.reviewNum}>
                                    <td>{review.reviewNum}</td>
                                    <td>{review.reviewId}</td>
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
                                        <button className="moreBtn" onClick={() => handelrMoreBtn(review.reviewNum)}>{review.closed ? " [ + 더보기 ] " : " [ 닫기 ] "}</button>
                                    </td>
                                    <td>{review.reviewSatisfaction}</td>
                                </tr>
                            ))
                        }
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="6"> 작성된 글이 없습니다. </td>
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