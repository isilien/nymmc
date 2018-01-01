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

const HOME_COMPONENT = process.env.NODE_ENV === 'production' ? Placeholder : Home;

class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const routes = (
            <div>
                <Route component={HOME_COMPONENT} exact path="/" />
                <Route component={Blog} path="/blog" />
            </div>
        )
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Header/>
                    {routes}
                </div>
            </ConnectedRouter>
        );
    }
}

export default Routes;
