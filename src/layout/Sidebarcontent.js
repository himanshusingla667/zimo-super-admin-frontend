import React, { lazy }from 'react'
import { Switch, Route } from "react-router-dom";
import Dashbord from '../pages/Dashbord/Dashbord';


import Designationlist from '../pages/designation/Designationlist';
import Adddesignation from '../pages/designation/Adddesignation';
import Editdesignation from '../pages/designation/Editdesignation';
import Error404 from '../pages/errorPage/Error404';

import SkillsList from '../pages/skills/SkillsList';
import AddSkils from '../pages/skills/AddSkils';
import EditSkills from '../pages/skills/EditSkills';
import AddDomain from '../pages/domain/AddDomain';
import DomainList from '../pages/domain/DomainList';
import EditDomain from '../pages/domain/EditDomain';

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
                
                    {/* department Route path */}
                <Route exact path="/department/add"><Addform/></Route>
                <Route exact path="/department/list"><Listdepartment /></Route>
                <Route exact path="/department/edit/:id"><Editdepartment/></Route>

                <Route exact path="/SkillsList"><SkillsList/></Route>
                <Route exact path="/addSkilss"><AddSkils/></Route>
                <Route exact path="/editSkills/:id"><EditSkills/></Route>

                <Route exact path="/addDomain"><AddDomain/></Route>
                <Route exact path="/domainList"><DomainList/></Route>
                <Route exact path="/domainEdit/:id"><EditDomain/></Route>

                <Route component={Error404} />
            </Switch>
        </div>

    )
}
