/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React from 'react';
import Parent from './container/Parent'
import { Router, Route, hashHistory } from 'react-router'

import Meal from './container/parent/Meal'
import Plan from './container/parent/Plan'
import Event from './container/parent/Event'
import Notice from './container/parent/Notice'
import Require from './container/parent/Require'
import Feedback from './container/parent/Feedback'

class Main extends React.Component {


    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Parent}/>
                <Route path="/meal" component={Meal}/>
                <Route path="/plan" component={Plan}/>
                <Route path="/event" component={Event}/>
                <Route path="/notice" component={Notice}/>
                <Route path="/require" component={Require}/>
                <Route path="/feedback" component={Feedback}/>
            </Router>
        );
    }
}

export default Main;
