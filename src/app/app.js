import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Parent from './container/Parent'
import { Router, Route, hashHistory } from 'react-router'

import Meal from './container/parent/Meal'
import Plan from './container/parent/Plan'
import Event from './container/parent/Event'
import Notice from './container/parent/Notice'
import Require from './container/parent/Require'
import Feedback from './container/parent/Feedback'
import Info from './container/parent/Info'

injectTapEventPlugin();
ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Parent}>
        <Route path="meal" component={Meal}/>
        <Route path="plan" component={Plan}/>
        <Route path="event" component={Event}/>
        <Route path="event/info/:eventId" component={Info}/>
        <Route path="require/info/:requireId" component={Info}/>
        <Route path="notice" component={Notice}/>
        <Route path="require" component={Require}/>
        <Route path="feedback" component={Feedback}/>
    </Route>
</Router>, document.getElementById('app'));
