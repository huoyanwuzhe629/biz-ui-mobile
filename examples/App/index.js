import './styles/app.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import App from './containers/App';
import API from './containers/Api';
import Start from './containers/Start'
import Demo from './containers/Demo';
import About from './containers/About';
import Main from './containers/Main';
import Todo from './containers/Todo';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="start" component={Start}/>
            <Route path="api/:name" component={API}/>
            <Route path="demo/:name" component={Demo}/>
            <Route path="about" component={About}/>
            <Route path="main" component={Main}/>
            <Route path="h5tools" component={Todo}/>
            <Route path="service" component={Todo}/>
            <Route path="ios" component={Todo}/>
            <Route path="android" component={Todo}/>
            <Route path="**" component={Main}/>
        </Route>
    </Router>,
    document.getElementById('app')
);
