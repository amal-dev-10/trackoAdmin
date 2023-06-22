// src/redux/reducers/index.ts

import { combineReducers } from 'redux';
import { bottomTabReducer } from './tabReducer';

const rootReducer = combineReducers({
  bottomTab: bottomTabReducer
});

export default rootReducer;
