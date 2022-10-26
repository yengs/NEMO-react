import './common.css';
import Header from './Header';
import ItemList from './pages/ItemList';
import ItemUpload from './pages/ItemUpload';

function App() {
  return (
    <div className="App">
      <Header />
      <ItemUpload/>
    </div>
  );
}

export default App;
