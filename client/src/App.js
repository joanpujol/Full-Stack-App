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
import PrivateRoute from './PrivateRoute';

function App() {

  const HeaderWithContext = withContext(Header);
  const CourseDetailWithContext = withContext(CourseDetail);
  const CreateCourseWithContext = withContext(CreateCourse)
  const UserSignInWithContext = withContext(UserSignIn);
  const UserSignOutWithContext = withContext(UserSignOut);
  const UserSignUpWithContext = withContext(UserSignUp);
  const UpdateCourseWithContext = withContext(UpdateCourse);

  return (
    <BrowserRouter>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses}/>
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
                }
              }
        />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
