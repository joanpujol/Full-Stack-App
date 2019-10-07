import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './styles/global.css';

import withContext from "./Context";
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp'
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';

function App() {

  const HeaderWithContext = withContext(Header);

  return (
    <BrowserRouter>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses}/>
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOut} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
