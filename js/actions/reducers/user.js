
import type { Action } from '../types';
import { USER_LOGIN, USER_LOGOUT, DEFAULT_PROFILE, CREATE_USER, CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE } from '../user';
import { AsyncStorage } from 'react-native';
import R from 'ramda';
export type State = {
    user: object,
    token: object
}

const initialState = {
  user: null,
  token: null,
  defaultProfile: DEFAULT_PROFILE,
};

const ACTION_HANDLERS = {
  [USER_LOGIN]: (state, action) => ({
    ...state,
    user: action.payload,
    token: action.payload.accessToken,
    defaultProfile: action.payload.account.profile
  }),
  [USER_LOGOUT]: (state, action) => ({
    ...state,
    user: null,
  }),
  [CREATE_USER]: (state, action) => ({
    ...state,
    user: action.payload,
  }),
  [CREATE_PROFILE]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      profiles: [...(state.user.profiles || []), action.payload],
    },
  }),
  [UPDATE_PROFILE]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      profiles: [
        ...(R.reject(R.propEq('apptId', action.payload.patientId), state.user.profiles)),
        action.payload,
      ],
    },
  }),
  [DELETE_PROFILE]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      profiles: [...(R.reject(R.propEq('apptId', action.payload.patientId), state.user.profiles))]
    },
  }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
