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
  const UserSignInWithContext = withContext(UserSignIn);
  const UserSignOutWithContext = withContext(UserSignOut);

  return (
    <BrowserRouter>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses}/>
        <Route path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id"
               render= { (props) => {
                  return <CourseDetail {...props} />
                }
              }
        />
        <Route exact path="/courses/:id/update"
               render= { (props) => {
                  return <UpdateCourse {...props} />
                }
              }
        />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOutWithContext} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
