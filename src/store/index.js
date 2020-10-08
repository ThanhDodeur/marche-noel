import { combineReducers } from 'redux';

import { marcheReducer } from './marche.js';

const globalReducer = combineReducers({
    marche: marcheReducer,
})

export { globalReducer };
