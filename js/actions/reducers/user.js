
import type { Action } from '../types';
import {CHANGE_SIGNUP_VALUE,VALIDATE_SIGNUP,CHANGE_PROFILE_VALUE,VALIDATE_PROFILE, USER_LOGIN, USER_LOGOUT, DEFAULT_PROFILE, CREATE_USER, CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE,SELECT_PROFILE } from '../user';
import { AsyncStorage } from 'react-native';
import R from 'ramda';
import moment from 'moment';

export type State = {
    user: object,
    token: object
}

export const initialProfile = {
  patientId: -1,
  personId: -1,
  firstName: null,
  lastName: null,
  dob: null,
  gender: 'MALE',
  mobile: null,
  email: null,
  address: null,
  ward: null,
  suburbDistrict: null,
  stateProvince: null,
  postcode:null,
};

const initialState = {
  user: null,
  token: null,
  defaultProfile: DEFAULT_PROFILE,
  fatherPersonId: null,
  fatherPatientId: null,
  profile:initialProfile,
  profiles:[],
  profileErrors:{},
  signup: {
    email:'',
    password:''
  },
  signupErrors:{}
};



const ACTION_HANDLERS = {
  [USER_LOGIN]: (state, action) => {
    var profile = action.payload.account.profile;
    profile.patientId = action.payload.account.patientId;
    profile.dob = moment(profile.dob);

    return ({
      ...state,
      user: action.payload,
      token: action.payload.accessToken,
      defaultProfile: action.payload.account.profile,
      profile,
      profiles: action.payload.account.profile.relationships && [profile, ...action.payload.account.profile.relationships] || [profile],
      fatherPersonId: action.payload.account.personId,
      fatherPatientId: action.payload.account.patientId,
    });
  },
  [SELECT_PROFILE]: (state, action) => {
    var profile =  {...action.payload};
    profile.dob = moment(profile.dob);

    return ({
      ...state,
      profile,
    });
  },
  [CHANGE_SIGNUP_VALUE]: (state, action) => {
    var signup = {...state.signup,...action.payload};
    return ({
      ...state,
      signup,
    });
  },
  [VALIDATE_SIGNUP]: (state, action) => {
    return ({
      ...state,
      signupErrors: action.payload,
    });
  },
  [CHANGE_PROFILE_VALUE]: (state, action) => {
    var value = action.payload
    var profile = {...state.profile,...value};
    return ({
      ...state,
      profile,
    });
  },
  [VALIDATE_PROFILE]: (state, action) => {
    return ({
      ...state,
      profileErrors: action.payload,
    });
  },
  [USER_LOGOUT]: (state, action) => ({
    ...state,
    user: null,
    token: null,
    defaultProfile: DEFAULT_PROFILE,
    fatherPersonId: null,
    fatherPatientId: null,
    profile:{},
    profiles:[],
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
