import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Singo from './Singo';
import MyStore from './MyUserStore';
import CleanG from '../member/CleanG';
import axios from 'axios';

function MyMenu() {

    const history = useHistory();
    const params = useParams();

    console.log(params);

    const [singo, setSingo] = useState(false);
    const [myStore, setMyStore] = useState(false);

    const goSingo = () => setSingo(true);
    const goMyStore = () => setMyStore(true);

    const reviewId = params.itemWriter;
    const [reviewSatisfaction, setReviewSatisfaction] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/clean/${reviewId}`)
            .then(response => {
                console.log(response.data)
                setReviewSatisfaction(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className='myPageWrap'>
            <div className="myMenuWrap">
                <img className="memberImg" src={`../../memberImg/${params.memberImg}`}></img>
                <div className='myMenuUserName'>{params.memberNickname}</div>
                <div className='cleanG'>
                    {reviewSatisfaction == 0 || reviewSatisfaction == null ?
                        <div>
                            <div> 클린지수 50 % </div>
                            <img className="myMenu-img" src="/clean/fourtyp.png" alt="50" />
                        </div>
                        :
                        <div>
                            <div className='cleanDefault'> 클린지수 {reviewSatisfaction}% </div>
                            <div>
                                {
                                    (function () {
                                        if (reviewSatisfaction === 0) {
                                            return <img className="mypage-clean-img" src="/clean/zero.png" alt="0percentlass" />
                                        } else if (reviewSatisfaction > 0 && reviewSatisfaction <= 20) {
                                            return <img className="mypage-clean-img" src="/clean/tenp.png" alt="10"></img>
                                        } else if (reviewSatisfaction > 20 && reviewSatisfaction <= 40) {
                                            return <img className="mypage-clean-img" src="/clean/thirtyp.png" alt="40" />
                                        } else if (reviewSatisfaction > 40 && reviewSatisfaction <= 50) {
                                            return <img className="mypage-clean-img" src="/clean/fourtyp.png" alt="40" />
                                        } else if (reviewSatisfaction > 50 && reviewSatisfaction <= 60) {
                                            return <img className="mypage-clean-img" src="/clean/sixtyp.png" alt="40" />
                                        } else if (reviewSatisfaction > 60 && reviewSatisfaction <= 70) {
                                            return <img className="mypage-clean-img" src="/clean/seventyp.png" alt="40" />
                                        } else if (reviewSatisfaction > 70 && reviewSatisfaction <= 80) {
                                            return <img className="mypage-clean-img" src="/clean/eightyp.png" alt="40" />
                                        } else if (reviewSatisfaction > 80 && reviewSatisfaction <= 99) {
                                            return <img className="mypage-clean-img" src="/clean/ninetyp.png" alt="40" />
                                        } else {
                                            return <img className="mypage-clean-img" src="/clean/onehundredp.png" alt="81~100" />
                                        }
                                    })()
                                }</div>
                        </div>
                    }
                </div>
                <div className="menu" style={{height: "calc(100% - 220px)"}}>
                    <div></div>
                    {!singo && <button className="warnBtn" onClick={goSingo}>신고하기</button>}
                </div>
            </div>

            {singo && <Singo itemWriter={params.itemWriter} setSingo={setSingo}></Singo>}
            {!singo && <MyStore />}

        </div>
    );
}

export default MyMenu;