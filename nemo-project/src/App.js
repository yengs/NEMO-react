import './common.css';
import Header from './Header';
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
      <Route path="/itemList" component={ItemList} exact={true} />
      <Route path="/itemList/itemUpload" component={ItemUpload}/>
      <Route path="/itemList/itemDetail/:itemNum" component={ItemDetail}/>
     
    </>
  );
}

export default App;
