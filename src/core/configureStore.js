import _ from 'underscore';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createSagaMonitor } from 'redux-saga-devtools';

import rootReducer from './rootReducer';

// Sagas (Operations)
import rootSagas from '../modules/moduleSagas';

import initialState from './initialState';

import { saveState } from './localStorage';

// Browser History
const history = createBrowserHistory();

// Redux Dev Tools Options
const reduxDevToolOptions = { maxAge: 1000 };

// Store Enhancers
const composeEnhancers = composeWithDevTools(reduxDevToolOptions);

// Redux Saga Dev Tools
export const sagaMonitor = createSagaMonitor();

// Saga Middleware
const sagaMiddleware = createSagaMiddleware({ sagaMonitor: sagaMonitor });

// Middleware
const middleware =
    process.env.NODE_ENV !== 'production'
        ? // Development Middleware
        [
            /* require('redux-immutable-state-invariant').default() */
            sagaMiddleware
        ]
        : // Production Middleware
        [routerMiddleware(history), sagaMiddleware];

// Create the store
const store = createStore(
    // Reducer
    rootReducer,
    // Initial State
    initialState,
    // Redux DevTools
    composeEnhancers(applyMiddleware(...middleware))
);

const throttledSave = _.throttle(saveState, 1000);

//TODO: filter locally saved state by whitelist trickled up from modules?
store.subscribe(() => {
    throttledSave({
        //app: store.getState().app
    });
});

// Run Sagas
sagaMiddleware.run(rootSagas);

// Hot Module Reloading
// if (module.hot) {
//     module.hot.accept('./rootReducer', () => {
//         const reducers = require('./rootReducer').default;
//         store.replaceReducer(reducers(store.asyncReducers));
//     });
// }

export { store, history };
