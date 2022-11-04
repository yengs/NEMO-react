import { Link, Route } from 'react-router-dom';

function MyMenu() {

    const goSingo = () => {
        window.location.href = "/userstoreinfo/warn";
    }

    return (
        <div className="myMenuWrap">
            <div>

                <div className="memberImg"></div>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <span style={{ paddingRight: '3px', fontSize: '19px', fontWeight: '800' }}>잠시안녕</span>님
                </div>
            </div>
            <div className="cleanG">
                클린지수 <span>65</span>%
                <div style={{ "width": "100%", "height": "13px", "backgroundColor": "rgb(88, 145, 112)", "borderRadius": "20px" }}></div>
            </div>
            <div className="menu">
                <div></div>
                <button className="warnBtn" onClick={goSingo}>신고하기</button>
            </div>
        </div>
    );
}

export default MyMenu;