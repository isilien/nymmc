// The module's selectors
import {createSelector} from 'reselect';

// Get's the 'app' part of the state
const appSelector = state => state.app;

// Selector Logic
const selectorLogic = input => input.filter(o => o === o); // Example Doesn't filter anything

const selectorOne = createSelector(
  appSelector, // Peice of state
  selectorLogic // Last argument to createSelector is the function that contains select logic
);

export {selectorOne};

/*
    // Alternatively, a basic selector can be used without `reselect`:

    const selectorOne = state => state.one + ' you'; // Adds ' you' to value of state.one.

    // OR:
    const selectorOne = function(state) {
        return state.one + ' you';
    }

    export default {
        selectorOne
    };
*/
