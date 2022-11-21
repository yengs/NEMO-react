import "./Dec.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import Paging from "../pagination/Paging";
import { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";

function Dec({history, match}) {
    
    const [data, setData] = useState([]);
    const [ memberName, setMemberName ] = useState('');
    const [ memberWarning, setMemberWarning ] = useState('');
    const [ singoReason, setSingoReason ] = useState('');
    const [ singoWriter, setSingoWriter ] = useState('');
    const [ singoNum, setSingoNum ] = useState('');

    // 신고대상자 불러오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/dec/dec/${match.params.memberWarning}`)
          .then(response => {
            console.log(response);
            if (response.status === 200){
                console.log("신고대상자 정보 불러오기 성공");
                setData(response.data);
                setCount(response.data.length);
                setItems(response.data.slice((page - 1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
                setMemberWarning(response.data.memberWarning);
            }else {
              alert("신고대상자 정보를 불러올 수 없습니다.");
              return;
            }
          })
          .catch(error => console.log(error));
      }, []);

    // 페이지네이션
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);

    const ITEM_COUNT_PER_PAGE = 10;

    const handlerPageChange = (page) => {
        setPage(page);
        setItems(data.slice((page-1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
    };

    // 관리자 신고 접수하기
    const handlerSingo = (e) => {
        e.preventDefault();

        const singoInfo = {
            "memberWarning" : memberWarning
        }

        axios.put(`http://localhost:8080/api/dec/dec/${memberWarning}`, singoInfo)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
            console.log(singoInfo);
            alert("정상적으로 접수되었습니다.");
            history.goBack();
        } else {
            alert("접수 실패했습니다.");
            return;
        }
      })
      .catch(error => console.log(error));
    }

    // 관리자 신고 취소하기
    const handlerDelete = () => {
        axios.delete(`http://localhost:8080/api/dec/dec/delete/${singoWriter}`)
            .then(response => {
                console.log(response);
                if(response.status == 200) {
                    alert("정상적으로 삭제되었습니다."); //<- 여기는 나오고
                    console.log(singoWriter); //<-여기서부터는 안 탄다...
                    history.push(`/dec/dec/${memberWarning}`);
                }else{
                    alert("삭제에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="adminInnerPage">
            <div className="userReviewListAboutStoreWrapAdmin">
                <h3 className="pageTitle">신고 내역</h3>
                <table className="userReviewListAboutStore2">
                    <thead>
                        <tr className="topline">
                            <th style={{width:"9%"}}>No.</th>
                            <th style={{width:"12%"}}>신고 대상</th>                 
                            <th style={{width:"30%"}}>신고 사유</th>
                            <th style={{width:"12%"}}>신고 날짜</th>
                            <th style={{width:"12%"}}>작성자 ID</th>
                            <th></th>
                            <th>신고 상태</th>
                        </tr>
                    </thead>
                        {
                            data && data.map(data => (
                                <tbody>
                                    <tr>
                                        <td className='Dec'>{data.singoNum}</td>
                                        <td className='Dec'>{data.memberName}</td>
                                        <td className='Dec'>{data.singoReason}</td>
                                        <td className='Dec'>{data.singoDate}</td>
                                        <td className='Dec'>{data.singoWriter}</td>

                                        <td className='Dec'>
                                            <Link to={`/dec/detail/${data.singoNum}`}>상세보기</Link>
                                        </td>
                                        <td className='Dec'>
                                            <tr>
                                                <td>
                                                    <button className='RedBtn btnBok' onClick={handlerSingo}>접수</button>
                                                </td>
                                                <td>
                                                    <button className='grayBtn btnBok'onClick={handlerDelete}>취소</button>
                                                </td>
                                            </tr>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                        {
                            data.length === 0 && (
                                <tr>
                                    
                                </tr>
                            )
                        }
                </table>
            </div>
            <div>
            <Pagination
                activePage={page}   // 현재 페이지
                itemsCountPerPage={10}  // 한 페이지당 보여줄 게시글 개수
                totalItemsCount={count}   // 모든 게시글 수
                pageRangeDisplayed={10}  // paginator안에서 보여줄 페이지의 범위
                prevPageText={"<"}  // 이전을
                nextPageText={">"}  // 다음
                onChange={handlerPageChange}    // 페이지가 바뀔 때 핸들러 함수 
            />
            </div>
            <div>
        </div>
    </div>
    );
}

export default Dec;