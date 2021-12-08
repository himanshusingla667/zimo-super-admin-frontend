import React from 'react'
import { Switch, Route } from "react-router-dom";
import Dashbord from '../pages/Dashbord/Dashbord';


import Designationlist from '../pages/designation/Designationlist';
import Adddesignation from '../pages/designation/Adddesignation';
import Editdesignation from '../pages/designation/Editdesignation';
import Error404 from '../pages/errorPage/Error404';
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
                <Route component={Error404} />
            </Switch>
        </div>

    )
}
