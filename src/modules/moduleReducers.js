// Module Reducers
import { constants as homeConstants, reducer as homeReducer } from './home';

// Module Reducers List
export default {
    [homeConstants.NAME]: homeReducer,
};
