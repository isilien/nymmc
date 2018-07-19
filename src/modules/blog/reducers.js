// The module's reducer(s)

import {handleActions} from 'redux-actions';
import initialState from './initialState';

// Using redux-actions `handleActions`
// @see https://github.com/acdlite/redux-actions#handleactiontype-reducer--reducermap--identity-defaultstate

/*
    NOTE: Reducers can be nested inside one reducer function as below,
        with each action type (case) being handled by one reducer for the module.
        Alternatively, multiple reducer functions can be used and exported.
*/
const reducer = handleActions(
  {
    ACTION_ONE: (state, action) => [...state, {one: action.payload}],
    ACTION_TWO: (state, action) => [...state, {two: action.payload}]

    // Other cases
    // ...
    //
  },
  initialState
);

export default reducer;

/*
    NOTE: Another approach for the module reducer:
    The module may use several reducer fuctions and use `combineReducers` to combine them as below.
*/
/*
    //import {combineReducers} from 'redux';

    const reducerOne = handleActions(
        {
            ACTION_ONE: (state, action) => [...state, action.payload]
        },
        initialState
    );

    const reducerTwo = handleActions(
        {
            ACTION_TWO: (state, action) => [...state, action.payload]
        },
        initialState
    );

    const reducer = combineReducers({
        one: reducerOne,
        two: reducerTwo
        ...
    });

    export default {
        reducer
    };

*/
