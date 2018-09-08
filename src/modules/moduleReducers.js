// Module Reducers
import { constants as missionConstants, reducer as missionReducer } from './mission';

// Module Reducers List
export default {
    [missionConstants.NAME]: missionReducer,
};
