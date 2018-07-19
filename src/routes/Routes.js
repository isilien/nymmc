import React, { Component } from 'react';

// React Router
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

// History
import { history } from '../core/configureStore';

// Components
import Home from '../pages/home';
import {Header, Placeholder} from '../sharedComponents'
import Blog from '../pages/blog';

class Routes extends Component {

    render() {

        const routes = (
            <div>
                <Header />
                <Route component={Home} exact path="/" />
                <Route component={Blog} path="/blog" />
            </div>
        )
        return (
            <ConnectedRouter history={history}>
                <div>
                    {process.env.NODE_ENV === 'production' ? <Route component={Placeholder} exact path="/" /> : routes}
                </div>
            </ConnectedRouter>
        );
    }
}

export default Routes;
