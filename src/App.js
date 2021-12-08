import './App.css';
import React, {lazy,Suspense}from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Mainpage from './layout/Mainpage';

const Login = lazy(() => import('./pages/credentials/Login'));
const Signup = lazy(() => import('./pages/credentials/Signup'));
const Forgotpassword = lazy(() => import('./pages/credentials/Forgotpassword'));

function App() {

  return (

    <Router>
      <Suspense fallback={<div>Loading...</div>}>
            <Switch>

              <Route exact path="/Login"><Login/></Route>
              <Route exact path="/Signup"><Signup/></Route>
              <Route exact path="/Forgotpassword"><Forgotpassword/></Route>
              <Route   path="/"><Mainpage/></Route>

            </Switch>
        </Suspense>
    </Router>
  );
}

export default App;







