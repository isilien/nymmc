// Module Reducers
import { constants as homeConstants, reducer as homeReducer } from './home';
import { constants as blogConstants, reducer as blogReducer } from './blog';

// Module Reducers List
export default {
    [homeConstants.NAME]: homeReducer,
    [blogConstants.NAME]: blogReducer,
};
