import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import Client from './client';
import Device from './Device';
import FormPage from './dummy';
import * as serviceWorker from './serviceWorker';

const routing = (<Router><div>
    <Route path="/" exact component={App} />
    <Route path="/home" exact component={Client} />
    <Route path="/devices" exact component={Device} />
    <Route path="/dummy" exact component={FormPage} />
</div></Router>)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
