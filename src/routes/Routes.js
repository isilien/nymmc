import React, { Component } from 'react';

// React Router
import { Route } from 'react-router';
import {Switch} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

// History
import { history } from '../core/configureStore';

// Components
import Home from '../pages/home';

import {Header, Footer} from '../sharedComponents'

class Routes extends Component {

    render() {

        const routes = (
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={(foo)=>{return (
                    <div className="container"><p>Honestly, I have no idea how you got here. That takes talent.</p> <br/> <p>... oh, 404 BTW</p></div>
                )}}/>
            </Switch>
        )
        return (
            <ConnectedRouter history={history}>
                <div><Header/>{routes}<Footer/></div>
            </ConnectedRouter>
        );
    }
}

export default Routes;
