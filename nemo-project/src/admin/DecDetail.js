import './DecDetail.css';

const styles = {
    adminInnerPage: {  
        "borderRadius": 20, 
        "width": 1000, 
        "border": "2px solid #bbb",
        "padding": "10px 10px 70px 10px", 
        "margin": "70px auto",
        "background-color": "rgb(248, 248, 248)"
        }, 
    form: {
        "position": "relative"
    }, 
    table: {
        "minWidth": 1000,
        "borderSpacing": 0, 
        "borderCollapse": "collapse", 
    },
    greenBtn:{
        "font-size": "12px",
        "border-radius": "3px",
        "width": "70px",
        "padding": "5px 10px",
        "position": "absolute",
        "right": "0px",
        "margin-top": "20px",
        "border": "2px solid rgb(49, 150, 54)",
        "background-color": "rgb(49, 150, 54)",
        "color": "rgb(255, 255, 255)"
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

                <input type="button" id="declist" style={styles.greenBtn} value="목록으로" onClick={decList} />
            </form>                
        </div>
            
    )
}

export default DecDetail;