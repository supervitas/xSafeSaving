import React from 'react';
import ReactDOM from 'react-dom';
import { RegisterForm } from './Components/Regiser'
import {  Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Layout } from './Components/Layout'


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={ Layout }>
            </Route>
        <Route path='/register' component={ RegisterForm }>
        </Route>
    </Router>,
    document.getElementById('app')
);
