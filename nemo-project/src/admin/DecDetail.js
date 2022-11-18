import axios from 'axios';
import { useEffect, useState } from 'react';
import './DecDetail.css';

const styles = {
    adminInnerPage: {  
        borderRadius: 20, 
        width: "calc(100% - 230px)",
        padding: "10px 10px 70px 10px", 
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
                console.log(match.params.singoNum,"번");
                setData(response.data);
                setSingoNum(response.data.singoNum);
            }else {
              alert("신고 정보를 불러올 수 없습니다.");
              return;
            }
          })
          .catch(error => console.log(error));
      }, []);


    const decList = () => history.goBack();
    
    return(
        <div style={styles.adminInnerPage}>
            <h3>신고 상세</h3>
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
                                        <div className="imageDiv">
                                            
                                        <img className="itemImg" src={`../../public/files/${data.singoImage}`} />
                                        </div>
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
                <input type="button" id="declist" className="decDetailGrayBtn" value="목록으로" onClick={decList} />
            </form>                
        </div>   
    );
}

export default DecDetail;