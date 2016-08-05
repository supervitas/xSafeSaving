import React from 'react';
import ReactDOM from 'react-dom';
import { RegisterForm } from './Components/Regiser'
import {  Router, Route, IndexRoute, browserHistory } from 'react-router'
import  Layout  from './Components/Layout'

import { Provider } from 'react-redux'
import configureStore from './store/appStore'



const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
            <Router history={browserHistory}>
                <Route path='/' component={ Layout }>
                </Route>
                <Route path='/register' component={ RegisterForm }>
                </Route>
            </Router>
    </Provider>,
    document.getElementById('app')
);
