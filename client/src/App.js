import React from "react";
import './styles/global.css';

import withContext from "./Context";
import Header from './components/Header';

function App() {

  const HeaderWithContext = withContext(Header);

  return (
    <HeaderWithContext />
  );
}

export default App;
