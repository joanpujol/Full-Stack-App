import React from "react";
import './styles/global.css';

import withContext from "./Context";
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {

  const HeaderWithContext = withContext(Header);

  return (
    <>
      <HeaderWithContext />
      <Courses />
      <CourseDetail />
    </>
  );
}

export default App;
