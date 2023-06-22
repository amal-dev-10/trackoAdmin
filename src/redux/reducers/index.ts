// src/redux/reducers/index.ts

import { combineReducers } from 'redux';
import { bottomTabReducer } from './tabReducer';
import { memberShipReducer } from './memberShipReducer';

const rootReducer = combineReducers({
  bottomTab: bottomTabReducer,
  memberShip: memberShipReducer
});

export default rootReducer;
