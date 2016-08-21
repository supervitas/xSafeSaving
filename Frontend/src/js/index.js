import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, browserHistory} from "react-router";
import App from "./containers/App";
import {RegisterForm} from "./components/Regiser";
import configureStore from "./store/configureStore";
import "semantic-ui/dist/semantic";
import "semantic-ui/dist/semantic.css";

const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path='/' component={ App }>
            </Route>
            <Route path='/register' component={ RegisterForm }>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);