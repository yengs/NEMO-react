import "./Dec.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import Paging from "../pagination/Paging";
import { useEffect, useState } from 'react';

function Dec({ history, match }) {

    const [data, setData] = useState([]);
    const [ memberName, setMemberName ] = useState('');
    const [ memberWarning, setMemberWarning ] = useState('');
    const [ singoReason, setSingoReason ] = useState('');
    const [ singoWriter, setSingoWriter ] = useState('');
    const [ singoNum, setSingoNum ] = useState('');

    // 페이지네이션
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);

    const ITEM_COUNT_PER_PAGE = 10;

    const changePage = page => {
        setPage(page);
        setItems(data.slice((page - 1) * ITEM_COUNT_PER_PAGE, page * ITEM_COUNT_PER_PAGE));
    };

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
                            <th style={{width:"10%"}}>신고 상태</th>
                        </tr>
                    </thead>
                        {
                            items && items.map(data => (
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
                                    </tr>
                                </tbody>
                            ))
                        }
                        {
                            data.length === 0 && (
                                <tr></tr>
                            )
                        }
                </table>
            </div>
            <div>
            <Paging page={page} count={count} setPage={changePage} />
            </div>
            <div>
            </div>
        </div>
    );
}

export default Dec;