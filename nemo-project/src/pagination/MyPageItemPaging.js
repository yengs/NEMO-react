import React from "react";
import './Paging.css';
import Pagination from "react-js-pagination"

function MyPageItemPaging({page, count, setPage}){

    const handlerPageChange = (page) => {
        setPage(page);
    };

    return(
        <Pagination
        activePage={page}   // 현재 페이지
        itemsCountPerPage={3}  // 한 페이지당 보여줄 게시글 개수
        totalItemsCount={count}   // 모든 게시글 수
        pageRangeDisplayed={10}  // paginator안에서 보여줄 페이지의 범위
        prevPageText={"<"}  // 이전을
        nextPageText={">"}  // 다음
        onChange={handlerPageChange}    // 페이지가 바뀔 때 핸들러 함수 
        />
    );
};

export default MyPageItemPaging;