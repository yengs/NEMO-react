import axios from 'axios';
import { useState } from 'react';
import './common.css';
import Header from './Header';
import Login from './member/Login';
import { Route } from 'react-router-dom';

function App() {
  
  return (
      <>
        <Header />
        <Login />
      </>
  );
}

export default App;
