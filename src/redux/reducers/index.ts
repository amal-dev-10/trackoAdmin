// src/redux/reducers/index.ts

import { combineReducers } from 'redux';
import { bottomTabReducer } from './tabReducer';
import { memberShipReducer } from './memberShipReducer';
import { requestReducer } from './requestReducer';
import { packageReducer } from './packageReducer';
import { overlayReducer } from './overlays';
import { profileReducer } from './profileReducer';
import { dropDownReducer } from './dropDownReducer';
import { loaderReducer } from './loader';

const rootReducer = combineReducers({
  bottomTab: bottomTabReducer,
  memberShip: memberShipReducer,
  requests: requestReducer,
  packages: packageReducer,
  overlay: overlayReducer,
  profile: profileReducer,
  dropDown: dropDownReducer,
  loader: loaderReducer
});

export default rootReducer;
