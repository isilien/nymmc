import React, { Component } from 'react';

// React Router
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

// History
import { history } from '../core/configureStore';

// Components
import Home from '../pages/home';
import Blog from '../pages/blog';

class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const routes = (
            <div>
                <Route component={Home} exact path="/" />
                <Route component={Blog} path="/blog" />
            </div>
        )
        return (
            <ConnectedRouter history={history}>
                {routes}
            </ConnectedRouter>
        );
    }
}

export default Routes;
