import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './styles/global.css';

import withContext from "./Context";
import PrivateRoute from './PrivateRoute';

import Header from './components/Header';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp'
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

function App() {

  const CoursesWithContext = withContext(Courses);
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
        <Route exact path="/" component={CoursesWithContext}/>
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/error" component={UnhandledError} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/notfound" component={NotFound} />
        <Redirect to="/notfound"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
