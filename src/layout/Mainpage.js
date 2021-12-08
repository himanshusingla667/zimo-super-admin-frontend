import '../App.css';
import React, { useEffect } from "react";
import Sidebar from "../Components/sidebar/Sidebar"
import Header from '../Components/header/Header';
import Sidebarcontent from './Sidebarcontent';
import { useHistory } from "react-router-dom";


function Mainpage() {
  let history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userinfo'));

    if (!userData) {
      history.push("/Login");
    }
  }, [])

  return (

    <div className="container-fluid ">

      <div className="row">

        <Header />

      </div>

      <div className="row " >

        <div> <Sidebar /></div>

        <div className="col-12" >

          <div className="content" id="main" >
      
            <Sidebarcontent >

            </Sidebarcontent>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Mainpage;

