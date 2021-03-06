import React from 'react'
import './sidebar.css';
import { Link } from 'react-router-dom'
import img from "../../assets /profile.jpg"


export default function Sidebar() {
    return (

        <>

            <div id="mySidenav" className="sidenav col-2" >

                <div className=" ms-auto text-center p-2">
                <div className="image">
            <img src={img} alt="User Img"/>
          </div>
                    <Link className="navbar-brand fw-boold text-uppercase me-auto" to="#">profile</Link>

                </div>
            
                <li><Link to="/" className="nav-link px-3 active">
                    <span className=" me-2">
                        <i className="bi bi-speedometer2"></i>  </span>
                    <span>Dashboard</span>
                </Link>
                </li>
               

                <li>
                    <div className="text-muted small fw-bold text-uppercase px-3"> interface</div>
                </li>
                <li>
                    <Link className="nav-link px-3 sidebar-link    " data-bs-toggle="collapse" to="#collapseExamplefour" role="button" aria-expanded="false" aria-controls="collapseExample">
                        <span className=" me-2"> <i className=" bi bi-gear"></i> </span>
                        <span>Setting</span>
                        <span className="right-icon ms-auto" ><i className="bi bi-chevron-down"></i></span>
                    </Link>
                    <div className="collapse" id="collapseExamplefour">
                        <div >
                            <ul className="navbar-nav ps-3">
                                <li>
                                    <Link to="/Designationlist" className="nav-link px-3">
                                        <span className="me-2">  <i className="bi bi-boxes"></i></span>
                                        <span> Desiganation</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/department/list" className="nav-link px-3">
                                        <span className="me-2"> <i className="bi bi-boxes"></i></span>
                                        <span>Department</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/SkillsList" className="nav-link px-3">
                                        <span className="me-2"> <i className="bi bi-boxes"></i></span>
                                        <span> Skills</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Techknowlogylist" className="nav-link px-3">
                                        <span className="me-2"><i className="bi bi-gear-wide-connected"></i></span>
                                        <span> Technology</span>
                                    </Link>
                                    <Link to="/domainList" className="nav-link px-3">
                                        <span className="me-2"> <i className="bi bi-boxes"></i></span>
                                        <span> Domain</span>
                                    </Link>
                                    <Link to="/Statelist" className="nav-link px-3">
                                        <span className="me-2"> <i className="bi bi-signpost-split-fill"></i></span>
                                        <span> States</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/companyList" className="nav-link px-3">
                                        <span className="me-2"> <i className="bi bi-boxes"></i></span>
                                        <span> Company</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/countryList" className="nav-link px-3">
                                        <span className="me-2"> <i className="bi bi-boxes"></i></span>
                                        <span> Country</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </div>
        </>
    )
}
