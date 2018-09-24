import React, { Component } from 'react';

// React Router
import { Route } from 'react-router';
import {Switch} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

// History
import { history } from '../core/configureStore';

// Components
import Home from '../pages/home';
import tutorial from '../pages/tutorial';
import mission from '../pages/mission';

import {Header, Footer} from '../sharedComponents'

class Routes extends Component {

    render() {

        const routes = (
            <Switch>
                <Route component={Home} exact path="/"/>
                <Route component={tutorial} exact path="/tutorial" />
                <Route component={mission} exact path="/mission/:id" />
                <Route component={()=>{return (
                    <div className="container">404: Not Found</div>
                )}}/>
            </Switch>
        )
        return (
            <ConnectedRouter history={history}>
                <div className="container">
                    <Header/>
                    {routes}
                    <Footer/>
                </div>
            </ConnectedRouter>
        );
    }
}

export default Routes;
