import { useEffect, useState } from "react";
import axios from "axios";

function YourReviewList() {

       const [ datas, setDatas ] = useState([]);

       useEffect(() => {
           axios.get('http://localhost:8080/api/yourReview')
           .then(response => {console.log(response);
               setDatas(response.data);
           })
           .catch(error => console.log(error));
       }, []);
       return (
           <>
       <div className="container">
       <h1>내 상점 리뷰</h1>
       <table className="myreview">
           <colgroup>
               <col width="15%"/>
               <col width="15%"/>
               <col width="15%"/>
               <col width="15%"/>
               <col width="*"/>
               <col width="15%"/>
           </colgroup>
           <thead>
               <tr>
                   <th scope='col'>번호</th>
                   <th scope='col'>상품정보</th>
                   <th scope='col'>작성자</th>
                   <th scope='col'>이미지</th>
                   <th scope='col'>내용</th>
                   <th scope='col'>만족도</th>
               </tr>
           </thead>
               <tbody>
                   {
                       datas && datas.map(review => (
                           <tr key={review.reviewNum}>
                               <td>{review.reviewNum}</td>
                               <td>{review.reviewProductIdx}</td>
                               <td>{review.reviewId}</td>
                               <td>{review.reviewImage}</td>
                               <td>{review.reviewContents}</td>
                               <td>{review.reviewSatisfaction}</td>
                           </tr>
                       ))
                   }
                   {
                           datas.length === 0 && (
                               <tr>
                                   <td colSpan="6">일치하는게 없습니다</td>
                               </tr>
                           )
                   }
               </tbody>
       </table>
       <a href="/Review/ReviewUploadPage" className="btn">후기작성</a>
       </div>
       </>
    );
}

export default YourReviewList;