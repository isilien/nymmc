import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Module Reducers
import reducers from '../modules/moduleReducers.js';

// The root reducer
const rootReducer = combineReducers({
    navigation: routerReducer,
    ...reducers
    // Add additional reducers to `./modules/moduleReducers`
});

export default rootReducer;
