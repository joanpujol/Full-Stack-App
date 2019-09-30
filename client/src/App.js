import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import './styles/global.css';

import withContext from "./Context";
import Header from './components/Header';

function App() {

  const HeaderWithContext = withContext(Header);

  return (
    <div className="App">

    <HeaderWithContext />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
