import React, { lazy }from 'react'
import { Switch, Route } from "react-router-dom";
import Dashbord from '../pages/Dashbord/Dashbord';


import Designationlist from '../pages/designation/Designationlist';
import Adddesignation from '../pages/designation/Adddesignation';
import Editdesignation from '../pages/designation/Editdesignation';
import Error404 from '../pages/errorPage/Error404';
import Deldes from '../pages/designation/Deldes';

// import Editdepartment from "../pages/Departments/Editdepartment";
const Editdepartment = lazy(() => import('../pages/Departments/Editdepartment'));
const Listdepartment = lazy(() => import('../pages/Departments/Listdepartment'));
const Addform = lazy(() => import('../pages/Departments/Addform'));

export default function Sidebarcontent() {
    return (



        <div>
            <div className="bg">

            </div>
            
            <Switch>

                <Route exact path='/'><Dashbord /></Route>
                <Route exact path="/Designationlist"> <Designationlist /></Route>
                <Route exact path="/adddesignation"> <Adddesignation /></Route>
                <Route exact path="/editdesignation/:id" component={Editdesignation} />
                <Route exact path="/DesDelList"><Deldes></Deldes></Route>
                    {/* department Route path */}
                <Route exact path="/department/add"><Addform/></Route>
                <Route exact path="/department/list"><Listdepartment /></Route>
                <Route exact path="/department/edit/:id"><Editdepartment/></Route>

               
                <Route component={Error404} />
            </Switch>
        </div>

    )
}
