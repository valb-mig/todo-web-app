import React from 'react';

import Sidebar from './Sidebar';
import Button  from './Button';
import Header  from './Header';

import './scss/App.scss';
import '../main.css';

const App = (props) => {
  return (
    <div className="App bg-dark">

      <Header/>

      <Sidebar/>

      <div className='content'>

      </div>

    </div>
  );
}

export default App;
