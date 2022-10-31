
function MyReviewDetail({reviewNum}){
    return(
        <>
        <div className="container">
            <h1>게시판 상세</h1>
            <form method="post" id="frm" name="frm">
                <input type="hidden" name="reviewNum" />
                <table className="myreviewdetail">
                    <colgroup>
                    <col width="15%"/>
            <col width="15%"/>
            <col width="15%"/>
            <col width="15%"/>
            <col width="*"/>
            <col width="15%"/>
                    </colgroup>
                </table>
            </form>
            <h2>게시판 번호: {reviewNum}</h2>
        </div>
        </>
    )

}

export default MyReviewDetail
;