import React from 'react';
import './App.css';
// or less ideally
import { Button } from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar';
import Memoria from './components/Memoria/Memoria';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        {/* <NavBar></NavBar> */}
        <Memoria size={500}></Memoria>
      </body>
    </div>
  );
}

export default App;
