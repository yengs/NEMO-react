import './DecDetail.css';

const styles = {
    adminInnerPage: {  
        borderRadius: 20, 
        width: 1000, 
        padding: "10px 10px 70px 10px", 
        margin: "70px auto",
        backgroundColor: "rgb(248, 248, 248)",
        border: "2px solid #bbb"
    }, 
    form: {
        position: "relative"
    }, 
    table: {
        minWidth: 980,
        borderSpacing: 0, 
        borderCollapse: "collapse", 
    }
};

function DecDetail({history}){
    const decList = () => history.push(`/dec`)
    return(
        <div style={styles.adminInnerPage}>
            <h3>신고상세페이지</h3>
            <form style={styles.form} method="post" id="frm" name="frm">
                <input type="hidden" name="reviewNum" />
                <table style={styles.table}>
                    <colgroup>
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="*" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">신고번호</th>
                        <td>1</td>
                        <th scope="row">신고사유</th>
                        <td>비방 및 언어폭력</td>
                        <th scope="row">신고대상</th>
                        <td>선희곤듀</td>
                        <th scope="row">작성자</th>
                        <td>예린</td>
                    </tr>
                    <tr>
                        <th scope="row">이미지</th>
                        <td colSpan={7}>
                            ~~~~~~~
                            <br></br>
                            ~~~~~~~
                            <br></br>
                            ~~~~~~~
                            <br></br>
                            ~~~~~~~
                            <br></br>
                            ~~~~~~~
                            <br></br>
                            ~~~~~~~
                            <br></br>
                            ~~~~~~~
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td colSpan={7}>~~~~~~~</td>
                    </tr>
                    </tbody>
                </table>
                <input type="button" id="declist" className="decDetailGrayBtn" value="목록으로" onClick={decList} />
            </form>                
        </div>   
    )
}

export default DecDetail;