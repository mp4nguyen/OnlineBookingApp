
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import booking from './booking';
import user from './user';
import invoice from './invoice';
import spinner from './spinner'
import searchClinic from './searchClinic'
import pageControl from './pageControl'
import toast from './toast'

export default combineReducers({
  drawer,
  cardNavigation,
  searchClinic,
  booking,
  user,
  invoice,
  spinner,
  pageControl,
  toast
});
