import React from 'react';

import './common.css';

import { Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ItemList from './Item/ItemList';
import ItemUpload from './Item/ItemUpload';
import Main from './Main';
import Login from './member/Login';
import ItemDetail from './Item/ItemDetail';
import Join from './member/Join';
import ItemsubList from './Item/ItemsubList';
import MyPage from './mypage/MyPage';
import MyPageForOthers from './mypage/MyPageForOthers';
import Idfind from './member/Idfind';
import Idfind_Result from './member/Idfind_Result';
import Pwfind from './member/Pwfind';
import Pwfind_Result from './member/Pwfind_Result';
import MyReviewList from './review/MyReviewList';
import YourReviewList from './review/YourReviewList';
import ReviewUpload from './review/ReviewUpload';
import Dec from './admin/Dec';
import WeatherRecItemList from './Item/WeatherRecItemList';
import BookingUpload from './Item/BookingUpload';

function App() {

  return (

    <div className='wholeWrap'>
      <div className='containerWrap'>
        <Header />


        <Route path="/" component={Main} exact={true} />


        {/* admin */}
        <Route path="/admin/dec" component={Dec} exact={true} />


        {/* item */}
        <Route path="/item/cate/:itemMaincategory" component={ItemList} exact={true} />
        <Route path="/item/cate/sub/:itemSubcategory" component={ItemsubList} exact={true} />
        <Route path="/item/write" component={ItemUpload} exact={true} />
        <Route path="/item/detail/:itemNum" component={ItemDetail} exact={true} />
        <Route path="/item/weatherrecitemlist" component={WeatherRecItemList} exact={true} />
        <Route path="/item/bookingupload/:itemNum,:itemName,:itemDeposit,:itemPrice,:itemWriter,:files,:itemRentalstart,:itemRentalend" component={BookingUpload} exact={true} />


        {/* member */}
        <Route path="/member/join" component={Join} exact={true} />
        <Route path="/member/login" component={Login} exact={true} />
        <Route path="/member/id" component={Idfind} exact={true} />
        <Route path="/member/id/find" component={Idfind_Result} exact={true} />
        <Route path="/member/pw" component={Pwfind} exact={true} />
        <Route path="/member/pw/find" component={Pwfind_Result} exact={true} />


        {/* review */}
        <Route path="/reivew/reviewWrite" component={ReviewUpload} />
        <Route path="/review/myReview" component={MyReviewList} exact={true} />
        <Route path="/review/yourReview" component={YourReviewList} exact={true} />


        {/* mypage */}
        <Route path="/mypage" component={MyPage} />
        {/* <Route path="/dec/detail" component={DecDetail} /> */}
        <Route path="/userstoreinfo" component={MyPageForOthers} />
        
        
      </div>
      <Footer />
    </div>
  );
}
export default App;