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


function App() {
  
  return (

    <>
     <Header/>
      <Route path="/" component={Main} exact={true} />
      <Route path="/item/cate/:itemMaincategory" component={ItemList} exact={true} />
      <Route path="/item/write" component={ItemUpload}/>
      <Route path="/item/detail/:itemNum" component={ItemDetail}/>
      <Route path="/member/join" component={Join}/>
      <Route path="/member/login" component={Login}/>
      
     <Footer />
    </>
  );
}

export default App;
