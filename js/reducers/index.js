
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import booking from './booking';
import user from './user';
import invoice from './invoice';
import spinner from './spinner'
export default combineReducers({
  drawer,
  cardNavigation,
  booking,
  user,
  invoice,
  spinner,
});
