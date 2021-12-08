import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Login from './pages/credentials/Login';
import Signup from './pages/credentials/Signup';
import Forgotpassword from './pages/credentials/Forgotpassword';
import Mainpage from './layout/Mainpage';


function App() {

  return (

    <Router>
            <Switch>

              <Route exact path="/Login"><Login/></Route>
              <Route exact path="/Signup"><Signup/></Route>
              <Route exact path="/Forgotpassword"><Forgotpassword/></Route>
              <Route   path="/"><Mainpage/></Route>

            </Switch>
    </Router>
  );
}

export default App;







