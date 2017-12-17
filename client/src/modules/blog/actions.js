// Action Creators for this module
import types from './types';
import {createAction} from 'redux-actions';

// Using redux-actions `createAction`
// @see https://github.com/acdlite/redux-actions#createactiontype-payloadcreator--identity-metacreator
const doActionOne = createAction(types.ACTION_ONE, payload => payload);

// Using FSA
// @see https://github.com/acdlite/flux-standard-action
const doActionTwo = payload => ({
  type: types.ACTION_TWO,
  payload: {
    payload
  }
});

export default {
  doActionOne,
  doActionTwo
};
