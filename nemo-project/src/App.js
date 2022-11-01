import React from 'react';

import './common.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemList from './Item/ItemList';
import ItemUpload from './Item/ItemUpload';
import { Route } from 'react-router-dom';
import Main from './Main';
import Login from './member/Login';
import ItemDetail from './Item/ItemDetail';
import Join from './member/Join';
import MyReviewList from './review/MyReviewList';
import YourReviewList from './review/YourReviewList';
import ReviewUploadPage from './review/ReviewUploadPage';
import MyReviewDetail from './review/MyReviewDetail';
import YourReviewDetail from './review/YourReviewDetail';

function App() {

  return (

    <div className='wholeWrap'>
      <div className='containerWrap'>
        <Header />
        <Route path="/" component={Main} exact={true} />
        <Route path="/item/cate/:itemMaincategory" component={ItemList} exact={true} />
        <Route path="/item/write" component={ItemUpload} />
        <Route path="/item/detail/:itemNum" component={ItemDetail} />
        <Route path="/member/join" component={Join} />
        <Route path="/member/login" component={Login} />
        <Route path="/member/login" component={Login} />
        <Route path="/reivew/reviewWrite" component={ReviewUploadPage} />
        <Route path="/review/myReview" component={MyReviewList} exact={true} />
        <Route path="/review/myReview/:reviewNum" component={MyReviewDetail} />
        <Route path="/review/yourReview" component={YourReviewList} />
        <Route path="/review/yourReview/:reviewNum" component={YourReviewDetail} />
        <ReviewUploadPage/>
      </div>
      <Footer />
    </div>
  );
}

export default App;