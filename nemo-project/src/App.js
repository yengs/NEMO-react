import React from 'react';

import './common.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemList from './Item/ItemList';
import ItemUpload from './Item/ItemUpload';
import { Route } from 'react-router-dom';
import Main from './Main';
import ItemDetail from './Item/ItemDetail';

function App() {
  return (
    <>
     <Header/>
      <Route path="/" component={Main} exact={true} />
      <Route path="/item" component={ItemList} exact={true} />
      <Route path="/item/write" component={ItemUpload}/>
      <Route path="/item/detail/:itemNum" component={ItemDetail}/>
     <Footer />
    </>
  );
}

export default App;
