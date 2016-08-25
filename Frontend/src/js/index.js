import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, browserHistory} from "react-router";
import App from "./containers/App";
import configureStore from "./store/configureStore";
import "../../assets/semantic.min";
import "../../assets/semantic.min.css";
import "../../assets/build.css";
const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path='/' component={ App }>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);