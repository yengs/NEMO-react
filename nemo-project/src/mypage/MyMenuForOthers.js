import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Singo from './Singo';
import MyStore from './MyUserStore';

function MyMenu() {

    const history = useHistory();
    const params = useParams();
       
    const [singo, setSingo] = useState(false);
    const [myStore, setMyStore] = useState(false);

    const goSingo = () => setSingo(true);
    const goMyStore = () => setMyStore(true);
    
    return (
        <div className='myPageWrap'>
        <div className="myMenuWrap">
            <div className="memberImg"></div>
            <div>{params.itemWriter}</div>
            <div className="cleanG">
                클린지수 <span>65</span>%
                <div style={{"width":"100%", "height":"13px", "backgroundColor":"rgb(53, 77, 119)", "borderRadius":"20px"}}></div>
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