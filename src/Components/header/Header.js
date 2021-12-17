import { Link, useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import './//style.css'
import Info from '../../context/Info';
import * as Apis from '../../context/Api'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


export default function Header() {
  


  

  let name= Info.userInfo.firstName

  useEffect(() => {
    document.getElementById("mySidenav").style.width = "14.66666667%";

    document.getElementById("main").style.marginLeft = "260px";

  }, []);

  let history = useHistory()
  let logout = () => {
    let data= {
      userId:Info.userInfo._id
    }
    axios.post(Apis.logout(), data, {headers: {'x-access-token': Info.token}}).then((response) => {
      if (response.data.code === 200) {
          
          history.push('/Login')
          localStorage.clear()
      }
      else {
          toast(response.data.message);
      }
  })
    
    
  }

  let clicked = false
  let openNav = () => {
    if (clicked === false) {
      document.getElementById("mySidenav").style.width = "14.66666667%";
      document.getElementById("main").style.marginLeft = "260px";
      clicked = true
    } else if (clicked === true) {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      clicked = false
    } else {
      console.log("another issue");
    }
  }

  // console.warn(user)

  return (
    <div className="fixed-top p-0">
      <nav className="navbar navbar-height navbar-expand-lg  navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand ps-3" to="/">Zimo</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <button className="sidebar-btn btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" onClick={openNav}><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <h5 className='navbar-brand ps-3 mt-2'>Welcome {name}</h5>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle mb-4" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-fill"></i>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><button className="dropdown-item " onClick={logout}><i className="bi bi-gear px-2"></i>Logout</button></li>
                <li><button className="dropdown-item " ><i className="bi bi-gear px-2"></i>Usre profile</button></li>

              </ul>
            </li>
          </div>
        </div>
        <ToastContainer />
      </nav>
    </div>
  )
}
