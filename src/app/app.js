import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Parent from './container/Parent'
import { Router, Route, hashHistory } from 'react-router'

import P_Meal from './container/parent/Meal'
import P_Plan from './container/parent/Plan'
import P_Event from './container/parent/Event'
import P_Notice from './container/parent/Notice'
import P_Require from './container/parent/Require'
import P_Feedback from './container/parent/Feedback'
import P_Info from './container/parent/Info'
import Login from './container/Login'

import Teacher from './container/Teacher'

import T_Meal from './container/teacher/Meal'
import T_Classes from './container/teacher/Classes'
import T_Event from './container/teacher/Event'
import T_EventEdit from './container/teacher/EventEdit'
import T_Notice from './container/teacher/Notice'
import T_Plan from './container/teacher/Plan'
import T_Require from './container/teacher/Require'

injectTapEventPlugin();
ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Parent}>
        <Route path="meal" component={P_Meal}/>
        <Route path="plan" component={P_Plan}/>
        <Route path="event" component={P_Event}/>
        <Route path="event/info/:eventId/:studentId" component={P_Info}/>
        <Route path="require/info/:requireId" component={P_Info}/>
        <Route path="notice" component={P_Notice}/>
        <Route path="require" component={P_Require}/>
        <Route path="feedback" component={P_Feedback}/>
        <Route path="login" component={Login}/>
    </Route>
    <Route path="/teacher" component={Teacher}>
        <Route path="meal" component={T_Meal}/>
        <Route path="plan" component={T_Plan}/>
        <Route path="event" component={T_Event}/>
        <Route path="event/edit" component={T_EventEdit}/>
        <Route path="event/edit/:eventId" component={T_EventEdit}/>
        <Route path="notice" component={T_Notice}/>
        <Route path="require" component={T_Require}/>
        <Route path="classes" component={T_Classes}/>
    </Route>
</Router>, document.getElementById('app'));
