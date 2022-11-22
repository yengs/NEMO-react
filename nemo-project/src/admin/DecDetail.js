import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DecDetail.css';

const styles = {
    adminInnerPage: {  
        borderRadius: 20, 
        width: "calc(100% - 230px)",
        padding: "10px 10px 30px 10px", 
        margin: "60px auto auto auto",
        backgroundColor: "rgb(248, 248, 248)",
        border: "2px solid #bbb"
    }, 
    form: {
        position: "relative"
    }, 
    table: {
        minWidth: "100%",
        borderSpacing: 0, 
        borderCollapse: "collapse", 
    }
};

function DecDetail({history, match}){

    const [data, setData] = useState([]);
    const [singoNum, setSingoNum] = useState('');

     // 신고 상세보기
     useEffect(() => {
        axios.get(`http://localhost:8080/api/dec/detail/${match.params.singoNum}`)
          .then(response => {
            console.log(response);
            if (response.status === 200){
                setData(response.data);
                setSingoNum(response.data.singoNum);
            }else {
              alert("신고 정보를 불러올 수 없습니다.");
              return;
            }
          })
          .catch(error => console.log(error));
      }, []);

    // 목록으로
    const decList = () => history.goBack();

    const singoInfo = {
        "singoNum" : match.params.singoNum
    }

    // 접수하기
    const confirmWarn = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8080/api/dec/detail/${match.params.singoNum}`, singoInfo)
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

    // 취소하기
    const deleteWarn = () => {
        axios.delete(`http://localhost:8080/api/dec/detail/${match.params.singoNum}`)
            .then(response => {
                console.log(response);
                if(response.status == 200) {
                    alert("정상적으로 삭제되었습니다.");
                    console.log(match.params.singoNum);
                    history.goBack();
                }else{
                    alert("삭제에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    }
    
    return(
        <div style={styles.adminInnerPage}>
            <h3>신고 상세</h3>
            {/* <a className='greyDec' onclick={decList}>목록으로</a> */}
            {/* <input type="button" id="list" className="greyDec" value="목록으로" onClick={decList} /> */}
            <form style={styles.form} method="post" id="frm" name="frm">
                <input type="hidden" name="reviewNum" />
                <table style={styles.table}>
                    <colgroup>
                        <col width="50" />
                        <col width="50" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="50" />
                        <col width="100" />
                        <col width="50" />
                    </colgroup>
                    {
                        data && data.map(data => (
                            <tbody>
                                <tr>
                                    <th scope="row">신고번호</th>
                                    <td>{data.singoNum}</td>
                                    <th scope="row">신고사유</th>
                                    <td>{data.singoReason}</td>
                                    <th scope='row'>피신고자 아이디</th>
                                    <td>{data.singoPisingoja}</td>
                                    <th scope='row'>작성자 아이디</th>
                                    <td>{data.singoWriter}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>이미지</th>
                                    <td colSpan={7}>
                                    <img className="itemImg" src={`../../files_singo/${data.singoImage}`} />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">상세내용</th>
                                    <td colSpan={7}>{data.singoContent}</td>
                                </tr>
                                {/* <div className="imageDiv">
                                <img className="itemImg" src={`../../files/${data.singoImage}`} />
                                </div> */}
                            </tbody>
                        ))
                    }
                    {
                        data.length === 0 && (
                            <tr></tr>
                        )
                    }
                </table>
                
                <div className="btnDivDec">
                    <input type="button" id="list" className="greyDec" value="목록으로" onClick={decList} />
                    <input type="button" id="edit"   className="redBtnDec" value="접수하기" onClick={confirmWarn} />
                    <input type="button" id="delete" className="grayBtnDec" value="삭제하기" onClick={deleteWarn} />
                </div>
            </form>        
        </div>   
    );
}

export default DecDetail;