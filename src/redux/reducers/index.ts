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
import { authReducer } from './authReducer';
import { mainLoaderReducer } from './mainLoader';
import { businessReducer } from './dashboardReducer';
import { clientReducer } from './clientReducer';
import { transactionReducer } from './transactionReducer';
import { statsReducer } from './statsReducer';
import { insightReducer } from './insightReducer';
import { routeReducer } from './routeReducer';
import { confirmationReducer } from './confirmReducer';
import { clientFilters } from './clientFilter';

const rootReducer = combineReducers({
  bottomTab: bottomTabReducer,
  memberShip: memberShipReducer,
  requests: requestReducer,
  packages: packageReducer,
  overlay: overlayReducer,
  profile: profileReducer,
  dropDown: dropDownReducer,
  loader: loaderReducer,
  auth: authReducer,
  mainLoader: mainLoaderReducer,
  dashboard: businessReducer,
  client: clientReducer,
  transactions: transactionReducer,
  homeStat: statsReducer,
  insight: insightReducer,
  route: routeReducer,
  confirmation: confirmationReducer,
  clientFilter: clientFilters
});

export default rootReducer;
