import React from "react";
import './styles/global.css';

import withContext from "./Context";
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp'
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';

function App() {

  const HeaderWithContext = withContext(Header);

  return (
    <>
      <HeaderWithContext />
      <Courses />
      <CourseDetail />
      <UserSignIn />
      <UserSignUp />
      <CreateCourse />
    </>
  );
}

export default App;
