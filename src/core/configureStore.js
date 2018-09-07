import 'regenerator-runtime/runtime'

import _ from 'underscore';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

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

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Middleware
const middleware =
    process.env.NODE_ENV !== 'production'
        ? // Development Middleware
        [
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

// Run Sagas
sagaMiddleware.run(rootSagas);

// //TODO: filter locally saved state by whitelist trickled up from modules?
// store.subscribe(() => {
//     throttledSave({
//         //app: store.getState().app
//     });
// });

export { store, history };
