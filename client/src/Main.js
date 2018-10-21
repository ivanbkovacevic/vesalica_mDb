import React, { Component } from 'react';
import About from './About';
import Game from './Game';
import {  Switch, Route } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/about' component={About}></Route>
                <Route exact path='/game' component={Game}></Route>
            </Switch>
        );
    }
}

export default Main;