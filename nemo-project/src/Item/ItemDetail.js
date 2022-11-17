import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, Route } from "react-router-dom";
import "./ItemDetail.css";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


function ItemDetail({ match, location, history }) {
    const { itemNum } = match.params;


    const [ data, setData ] = useState({});
    const [ itemName, setItemName ] = useState('');
    const [ itemPrice, setItemPrice ] = useState('');
    const [ itemDeposit, setItemDeposit] = useState('');
    const [ itemDetail, setItemDetail ] = useState('');
    const [ itemWriter , setItemWriter] = useState('');
    const [ files ,setItemImage] = useState('');
    const [ itemRentalstart ,setItemRentalstart] = useState('');
    const [ itemRentalend ,setItemRentalend] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/${itemNum}`)
        .then(response => { 
            setData(response.data);
            setItemName(response.data.itemName);
            setItemPrice(response.data.itemPrice);
            setItemDeposit(response.data.itemDeposit);
            setItemDetail(response.data.itemDetail);
            setItemWriter(response.data.itemWriter);
            setItemImage(response.data.files);
            setItemRentalstart(response.data.itemRentalstart);
            setItemRentalend(response.data.itemRentalend);
            
        })
        .catch(error => { console.log(error); });
    }, []);

    const reviewProductIdx = itemNum;
    const [ datas, setDatas ] = useState([]);

    //후기조회
    useEffect(() => {
        axios.get(`http://localhost:8080/api/itemreview/${reviewProductIdx}`)
        .then(response => { 
            setDatas(response.data);
            // setReviewWriter(response.data.reviewWriter);
            // setReviewSatisfaction(response.data.reviewSatisfaction);
            // setReviewFiles(response.data.reviewFiles);
            // setReviewContents(response.data.reviewContents);
 
        })
        .catch(error => { console.log(error); });
    }, []);


    const handlerChangeName = (e) => setItemName(e.target.value);
    const handlerChangePrice = (e) => setItemPrice(e.target.value);
    const handlerChangeDeposit = (e) => setItemDeposit(e.target.value);
    const handlerChangeDetail = (e) => setItemDetail(e.target.value);
    
    const handlerClickList = () => history.goBack();
    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/item/${itemNum}`)
        .then(response => { 
            console.log(response);
            if (response.status === 200) {
                alert("정상적으로 삭제되었습니다.");
                history.push("/item");
            } else {
                alert("삭제에 실패했습니다.");
                return;
            }
        })
        .catch(error => console.log(error));
    };
    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/api/item/${itemNum}`, { 'itemName': itemName, 'itemPrice': itemPrice, 'itemDetail': itemDetail })
            .then(response => {
                if (response.status === 200) {
                    alert("정상적으로 수정되었습니다.", {
                        onClose: () => history.push("/item")
                    });
                    
                } else {
                    alert("수정에 실패했습니다.");
                    return;
                }
            })
            .catch(error => console.log(error));
    };

    const goBooking = () => {
        window.location.href = "/item/bookingupload";
    }
    
    const goUserStore = () => {
        window.location.href = "/userstoreinfo";
    }

    const handlerMaincate = () => {
        window.location.href = `/item/cate/${data.itemMaincategory}`;
    }

    const handlerSubcate = () => {
        window.location.href = `/item/cate/sub/${data.itemSubcategory}`;
    }
    
    let now = new Date();

    const dateWhat = () =>{
        if(new Date(itemRentalend) > now){
            window.location.href = `/item/bookingupload/${itemNum},${itemName},${itemDeposit},${itemPrice},${itemWriter},${files},${itemRentalstart},${itemRentalend}`;
        }else{
            alert("대여기간이 지난 상품입니다")
            window.location.href = `/item/cate/sub/${data.itemSubcategory}`;
        }
    }
    
    const chatting = () => {
        window.location.href = `/chatting/${itemWriter}`;
    }

    return (
        <>
            <div className="DetailContainer">
                 <h2>상품 상세</h2>
                 <div className="clickList">
                    <a className="goList" onClick={handlerClickList}>목록으로</a>
                    {/* <p className="cate">{data.itemMaincategory}{' > '}{data.itemSubcategory}</p> */}
                   
                   <div className="Breadcrumb">
                    <Breadcrumb tag='nav' listTag='div'>
                        <BreadcrumbItem tag='a' onClick={handlerMaincate}>{data.itemMaincategory}</BreadcrumbItem>
                        {' > '}
                        <BreadcrumbItem tag='a' onClick={handlerSubcate}>{data.itemSubcategory}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                   
                    <p>👀 {data.itemReadcount} 📅 {data.itemDate}</p>
                </div>
                <br></br>

                <div className="tablePlusForm">
                    <div className="imageDiv">
                        <img className="memberImg" src={`../../files/${data.files}`}/>
                    </div>

                    <div className="tableform">
                    <form method="post" id="frm" name="frm">
                    <table>
                        <colgroup>
                            <col width="40%" />
                            <col width="60%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">상품명</th>
                                <td>{data.itemName}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">어울리는 계절</th>
                                <td>{data.itemWeather}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">가격</th>
                                <td>{data.itemPrice}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">보증금</th>
                                <td>{data.itemDeposit}</td>                   
                            </tr>
                            <tr>
                                <th scope="row">사이즈</th>
                                
                                {
                                (function() {
                                    if( data.itemMaincategory ==="상의"){
                                   return  <td>{data.itemTopsize}</td>
                                   }
                                   else if( data.itemMaincategory ==="하의"){
                                   return  <td>{data.itemBottomsize}</td>  
                                   }
                                  else {return  <td>{data.itemEtcsize}</td>  }
                                })()
                            }                      
                            </tr>
                            <tr>
                                <th scope="row">대여기간</th>
                                <td>{data.itemRentalstart} ~ {data.itemRentalend}</td>                  
                            </tr>
                            <tr>
                                <th scope="row">내용</th>
                                <td>{data.itemDetail}</td>
                            </tr>
                        </tbody>
                    </table>      
                    </form>
                    </div>
                </div>
                
                <div className="middleDiv">
                    {/* 대여자 프로필 사진이 떠야함 + 클린지수 퍼센트 숫자 수정
                        + 클린지수 퍼센트에 따라 게이지 차게끔 수정 */}
                    <div className="writerDiv">
                        <h3>대여자</h3>
                        <p className="memberImg" onClick={goUserStore}></p>
                    </div>
                    <div className="cleanDiv">
                        <h4 onClick={goUserStore}>{data.itemWriter}</h4>
                        클린지수 <span>65</span>%
                        <div style={{"width":"100%", "height":"13px", "backgroundColor":"rgb(53, 77, 119)", "borderRadius":"20px"}}></div>
                    </div>
                </div>

                <div className="buttonDiv">
                        <input type="button" id="chatting" className="ItemgreenBtn" value="채팅하기" onClick={chatting}/>
                        <input type="button" id="retals" className="ItemgreenBtn" value="대여하기" onClick={dateWhat}/>
                </div>

                <div className="reviewDiv">
                    <h2>후기</h2>
                    <br/><br/>
                    <div>
                        <table className="reviewTable">
                        <thead>
                            <tr>
                                 <th>작성자</th>
                                <th>리뷰사진</th>
                                <th >내용</th>
                                <th >만족도</th>
                            </tr>
                        </thead>
                        {
                            datas && datas.map(review => (
                        <tbody>
                                <tr key={review.reviewNum}>
                                <td className='ReviewWriter' rowSpan={3}>{review.reviewWriter}</td>
                                <td rowSpan={2} className="ReviewItemImage2">
                                    <img className="bookingitemImg" src={`../../files_review/${review.reviewFiles}`}/>   
                                </td>
                                <td className='ReviewContent' rowSpan={3}>{review.reviewContents}</td>
                                <td className='ReviewWriter' rowSpan={3}>
                                {
                                                (function () {
                                                    if (review.reviewSatisfaction === 0) {
                                                        return <img className="reviewSatisImg" src="/clean/zero.png" alt="0percentlass" />
                                                    } else if (review.reviewSatisfaction > 0 && review.reviewSatisfaction <= 20) {
                                                        return <img className="reviewSatisImg" src="/clean/tenp.png" alt="10"></img>
                                                    } else if (review.reviewSatisfaction > 20 && review.reviewSatisfaction <= 40) {
                                                        return <img className="reviewSatisImg" src="/clean/thirtyp.png" alt="40" />
                                                    } else if (review.reviewSatisfaction > 40 && review.reviewSatisfaction <= 50) {
                                                        return <img className="reviewSatisImg" src="/clean/fourtyp.png" alt="40" />
                                                    } else if (review.reviewSatisfaction > 50 && review.reviewSatisfaction <= 60) {
                                                        return <img className="reviewSatisImg" src="/clean/sixtyp.png" alt="40" />
                                                    } else if (review.reviewSatisfaction > 60 && review.reviewSatisfaction <= 70) {
                                                        return <img className="reviewSatisImg" src="/clean/seventyp.png" alt="40" />
                                                    } else if (review.reviewSatisfaction > 70 && review.reviewSatisfaction <= 80) {
                                                        return <img className="reviewSatisImg" src="/clean/eightyp.png" alt="40" />
                                                    } else if (review.reviewSatisfaction > 80 && review.reviewSatisfaction <= 99) {
                                                        return <img className="reviewSatisImg" src="/clean/ninetyp.png" alt="40" />
                                                    } else {
                                                        return <img className="reviewSatisImg" src="/clean/onehundredp.png" alt="81~100" />
                                                    }
                                                })()
                                            }
                                </td>
                            </tr>
                            </tbody>
                            ))
                        }
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4"> 작성된 글이 없습니다. </td>
                                </tr>
                            )
                        }
                           
                        </table>
                    </div>
                </div>
            </div> 
            
            <div className="blank"></div>
                    
        </>

    );
}

export default ItemDetail;