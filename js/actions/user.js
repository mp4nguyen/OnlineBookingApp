
import type { Action } from './types';
import { postRequest,setToken } from '../libs/requests';

export const CHANGE_PROFILE_VALUE = 'CHANGE_PROFILE_VALUE';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD';
export const CREATE_USER = 'CREATE_USER';
export const SET_PROFILE = 'SET_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_ROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const SELECT_PROFILE = 'SELECT_PROFILE';

export const DEFAULT_PROFILE = {
  firstName: '',
  lastName: '',
  patientId: 0,
  gender: false,
  dob: '1990-02-21T02:30:00.000Z',
  mobile: '',
  email: '',
  address: '',
  postCode: '',
  suburb: '',
  isReceiveNews: true,
};

export function changeProfileValue(value): Action {
    return ({
      type: CHANGE_PROFILE_VALUE,
      payload: value,
    });
}

export function login(user): Action {
  return dispatch => postRequest('/api/v1/loginAT', user)
    .then((response) => {
      setToken(response.accessToken);
      dispatch({
        type: USER_LOGIN,
        payload: response,
      });
    });
}

export function logout(): Action {
  return dispatch => postRequest('/api/v1/logout')
    .then((response) => {
      console.log("/api/v1/logout",response);
      dispatch({
        type: USER_LOGOUT,
      });
    });
}

export function selectProfile(profile): Action {
  return dispatch =>
    new Promise((resolve) => {
      dispatch({
        type: SELECT_PROFILE,
        payload:profile
      });
      resolve();
    });
}

export function sendEmail(email): Action {
  return dispatch => postRequest('BookingCtrls/forgotPassword', { email })
    .then((response) => {
      dispatch({
        type: USER_FORGOT_PASSWORD,
        payload: response.account,
      });
    });
}

export function createUser(user): Action {
  return dispatch => postRequest('BookingCtrls/createUser', user)
    .then((response) => {
      dispatch({
        type: CREATE_USER,
        payload: response.user,
      });
    });
}

export function logOut(clinic): Action {
  return dispatch =>
    new Promise((resolve) => {
      dispatch({
        type: USER_LOGOUT,
      });
      resolve();
    });
}


export function setProfile(profile): Action {
  return dispatch =>
    new Promise((resolve) => {
      dispatch({
        type: SET_PROFILE,
        payload: profile,
      });
      resolve();
    });
}

export function deleteProfile(profile): Action {
  return dispatch => postRequest('BookingCtrls/removeProfile', profile)
    .then((response) => {
      dispatch({
        type: DELETE_PROFILE,
        payload: response.profile,
      });
    });
}


export function createProfile(profile): Action {
  return dispatch => postRequest('BookingCtrls/addProfile', profile)
    .then((response) => {
      dispatch({
        type: CREATE_PROFILE,
        payload: response.profile,
      });
    });
}

export function updateProfile(profile): Action {
  return dispatch => postRequest('BookingCtrls/addProfile', profile)
    .then((response) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.profile,
      });
    });
}
