import { all } from 'redux-saga/effects';

import { operations as missionOperations } from './mission';

const rootSagas = function* () {
    yield all([
        missionOperations,
        /* ...Add module operations (sagas) here */
    ]);
};

export default rootSagas;
