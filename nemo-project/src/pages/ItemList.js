import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ItemList() {
    return (
        <>
            <div className="container">
                <h2>item list</h2>
                <table className="item_list">
                    <thead>
                    <tr>
                    <th scope="col">일련번호</th>
                        <th scope="col">상품명</th>
                        <th scope="col">가격</th>
                        <th scope="col">등록일</th>
                    </tr>
                        
                    </thead>
                </table>
                <input type="submit" id="submit" value="등록하기" className="btn"/>
                <input type="submit" id="submit" value="수정하기" className="btn"/>
                <input type="submit" id="submit" value="삭제하기" className="btn"/>
            </div>
        </>
    );
}

export default ItemList;