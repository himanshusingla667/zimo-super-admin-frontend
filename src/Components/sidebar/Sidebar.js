import React from 'react'
import './sidebar.css';
import { Link } from 'react-router-dom'




export default function Sidebar() {
  return (

    <>
      <div id="mySidenav" className="sidenav col-2">
        <li><Link to="/" className="nav-link px-3 active">

          <span className=" me-2">

            <i className="bi bi-speedometer2"></i> </span>

          <span>Dashbord</span>

        </Link>

        </li>
        <div className=" ms-auto text-center p-4">

          <Link to="/Designationlist">Designation</Link>

        </div>
      </div>



    </>
  )
}
