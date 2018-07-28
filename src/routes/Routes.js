import React, { Component } from 'react';

// React Router
import { Route } from 'react-router';
import {Switch} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

// History
import { history } from '../core/configureStore';

// Components
import Home from '../pages/home';
import Quizlet from '../pages/quizlet';
import Resume from '../pages/resume';

import {Header, Placeholder} from '../sharedComponents'
//import Blog from '../pages/blog';

class Routes extends Component {

    render() {

        const routes = (
            <Switch>
                <Route component={Quizlet} exact path="/quizlet" />
                <Route component={Resume} exact path="/resume" />
                <Route component={Home} exact path="/" />
                <Route component={(foo)=>{return (
                    <div className="container"><p>Honestly, I have no idea how you got here. That takes talent.</p> <br/> <p>... oh, 404 BTW</p></div>
                )}}/>
                {/*<Route component={Blog} path="/blog" />*/}
            </Switch>
        )
        return (
            <ConnectedRouter history={history}>
                <div>
                    {process.env.NODE_ENV === 'production' ? <Route component={Placeholder} /> : <div><Header/>{routes}</div>}
                </div>
            </ConnectedRouter>
        );
    }
}

export default Routes;
