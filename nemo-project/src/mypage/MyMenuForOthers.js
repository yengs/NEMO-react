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
            .then(response => { setReviewSatisfaction(response.data) })
            .catch(error => console.log(error));
    }, []);
    
    return (
        <div className='myPageWrap'>
        <div className="myMenuWrap">
        <img className="memberImg" src={`../../memberImg/${params.memberImg}`}></img>
            <div className='myMenuUserName'>{params.itemWriter}</div>
            <div className='cleanG'>
                {params.itemWriter.reviewSatisfaction == 0 ?
                    <div>
                        <div> 클린지수 50 % </div>
                        <img className="myMenu-img" src="/clean/fourtyp.png" alt="50" />
                    </div>
                    :
                    <div>
                        <div className='cleanDefault'> 클린지수 {reviewSatisfaction}% </div>
                        <div> <CleanG /> </div>
                    </div>
                }
            </div>
            <div className="menu">
                <div></div>
                { !singo && <button className="warnBtn" onClick={goSingo}>신고하기</button> }
            </div>
        </div>
        
        { singo && <Singo itemWriter={params.itemWriter} setSingo={setSingo}></Singo> }
        { !singo && <MyStore /> }

        </div>
    );
}

export default MyMenu;