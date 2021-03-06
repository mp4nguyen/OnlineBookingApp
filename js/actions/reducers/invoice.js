import * as types from '../types';
import R from 'ramda';

import {
  FETCH_INVOICES,
} from '../invoice';

const initialState = {
  list: [],
};

const ACTION_HANDLERS = {
  [FETCH_INVOICES]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
