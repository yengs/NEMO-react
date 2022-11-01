import axios from "axios";
import { useEffect, useState } from "react";

function MyReviewDetail({   match, location, history  }){

    const { reviewNum } = match.params;

    const [ data, setData ] = useState({});
    const [ reviewImage, setReviewImage ] = useState('');
    const [ reviewContents, setReviewContents ] = useState('');
    const [ reviewSatisfaction, setReviewSatisfaction ] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/review/myReview/${reviewNum}`)
        .then(response => {
            console.log(response);
            setData(response.data);
            setReviewImage(response.data.reviewImage);
            setReviewContents(response.data.reviewContents);
            setReviewSatisfaction(response.data.reviewSatisfaction)
        })
        .catch(error => {console.log(error)});
    },[]);

    // const handlerChangeImage = (e) => setReviewImage(e.target.value);
    // const handlerChangeContents = (e) => setReviewContents(e.target.value);
    // const handlerChangeSatisfaction = (e) => setReviewSatisfaction(e.target.value);

    const handlerReviewList = () => history.push('/review/myReview');
    
    const handlerReviewUpdate = () => {
            axios.put(`http://localhost:8080/api/review/myReview/${reviewNum}`, 
            { "reviewImage": reviewImage, "reviewContents": reviewContents, "reviewSatisfaction": reviewSatisfaction})
            .then(response => {
                if (response.status === 200) {
                    alert("수정완료");
                    history.push("/review/myReview");
                } else {
                    alert("수정실패");
                    return;
                }
            })
            .catch(error => console.log(error));
    };

    const handlerReviewDelete = () => {
        axios.delete(`http://localhost:8080/api/review/myReview/${reviewNum}`)
        .then(response => { 
            console.log(response);
            if (response.status === 200) {
                alert("삭제완료");
                history.push("/review/myReview");
            } else {
                alert("삭제실패");
                return;
            }
        })
        .catch(error => console.log(error));
    };


    return(
        <>
        <div className="container">
            <h1>나의 리뷰 상세페이지</h1>
            <form method="post" id="frm" name="frm">
                <input type="hidden" name="reviewNum" />
                <table className="myreviewdetail">
                    <colgroup>
                        <col width="15%"/>
                        <col width="30%"/>
                        <col width="40%"/>
                        <col width="15%"/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">번호</th>
                            <td>{data.reviewNum}</td>
                            <th scope="row">작성자</th>
                            <td>{data.reviewWriter}</td>
                        </tr>
                        <tr>
                            <th scope="row">이미지</th>
                            <td>{data.reviewImage}</td>
                        </tr>
                        <tr>
                          <th scope="row">내용</th>
                          <td>{data.reviewContents}</td>
                        </tr>
                        <th>
                            <th scope="row">평점</th>
                            <td>{data.reviewSatisfaction}</td>
                        </th>
                    </tbody>
                </table>
            </form>
            <input type="button" id="reviewlist" className="btn" value="목록" onClick={handlerReviewList}/>
            <input type="button" id="reviewupdate"   className="btn" value="수정" onClick={handlerReviewUpdate} />
            <input type="button" id="reviewdelete" className="btn" value="삭제" onClick={handlerReviewDelete} />   
        </div>
        </>
    )

}

export default MyReviewDetail;