import { all } from 'redux-saga/effects';

import { operations as homeOperations } from './home';

const rootSagas = function* () {
    yield all([
        homeOperations,
        /* ...Add module operations (sagas) here */
    ]);
};

export default rootSagas;
