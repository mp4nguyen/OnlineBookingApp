
import type { Action } from './types';
import { postRequest,setToken } from '../libs/requests';

import _ from 'lodash';


export const CHANGE_SIGNUP_VALUE = 'CHANGE_SIGNUP_VALUE';
export const VALIDATE_SIGNUP = 'VALIDATE_SIGNUP';
export const CHANGE_PROFILE_VALUE = 'CHANGE_PROFILE_VALUE';
export const VALIDATE_PROFILE = 'VALIDATE_PROFILE';

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

var isEmpty = (fieldName,v) => {
  console.log(" value = ",v);
  var value = !v || _.isEmpty(v);
  return { value, fieldName ,description: "empty" };
};

var isNotValidateEmail = (fieldName,mail) => {

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(mailformat.test(mail)){
    return  { value: false, fieldName ,description: "Valid email" };
  }else{
    return  { value: true, fieldName ,description: "Invalid email" };
  }
};


const profileValidator = [
  {field:'firstName',func: value => isEmpty("First name",value)},
  {field:'lastName',func: value => isEmpty("Last name",value)},
  {field:'dob',func: value => isEmpty("Date of birth",value)},
  {field:'email',func: value => isEmpty("Email",value)},
  {field:'email',func: value => isNotValidateEmail("Email",value)},
  {field:'mobile',func: value => isEmpty("Mobile",value)},
];

const signupValidator = [
  {field:'email',func: value => isEmpty("Email",value)},
  {field:'email',func: value => isNotValidateEmail("Email",value)},
  {field:'password',func: value => isEmpty("Password",value)},
];

export function changeSignUpValue(value): Action {
    return ({
      type: CHANGE_SIGNUP_VALUE,
      payload: value,
    });
}

export function changeProfileValue(value): Action {
    return ({
      type: CHANGE_PROFILE_VALUE,
      payload: value,
    });
}

export function checkAvailableAccount(accountInfo): Action {
  //console.log("checkAvailableAccount: will check accunt = ",accountInfo);
  return (dispatch,getState) => {
    return new Promise((resolve,reject) => {
      var signup = getState().user.signup;
      postRequest('/api/v1/checkAvailableAccount',signup).then(res=>{
        //console.log("checkAvailableAccount = ",res);
        if (res.isAvailable == false){
          reject(res.reason)
        }else{
          resolve("OK");
        }
      });
    });
  }
}

export function validateProfile(): Action {
  return (dispatch,getState) => new Promise((resolve,reject) => {
      var profile = getState().user.profile;
      var errors = {};
      let count = 0;

      console.log("profile = ",profile);

      profileValidator.forEach( (validator) => {

        validatorValue = validator.func(profile[validator.field]);

        console.log("will validate key = ",validator.field, " validatorValue = ",validatorValue);

        if (validatorValue.value) {
          count += 1;
          var error = errors[validatorValue.fieldName];
          if(error){
            error.push(validatorValue.description)
          }else{
            errors[validatorValue.fieldName] = [validatorValue.description]
          }
        }
      });

      if (count > 0) {
        reject(errors);
      }else{
        resolve();
      }
      dispatch({
        type: VALIDATE_PROFILE,
        payload: errors
      });

    });
}

export function validateSignup(): Action {
  return (dispatch,getState) => new Promise((resolve,reject) => {
      var signup = getState().user.signup;
      var errors = {};
      let count = 0;

      console.log("signup = ",signup);

      signupValidator.forEach( (validator) => {

        validatorValue = validator.func(signup[validator.field]);

        console.log("will validate key = ",validator.field, " validatorValue = ",validatorValue);

        if (validatorValue.value) {
          count += 1;
          var error = errors[validatorValue.fieldName];
          if(error){
            error.push(validatorValue.description)
          }else{
            errors[validatorValue.fieldName] = [validatorValue.description]
          }
        }
      });

      if (count > 0) {
        reject(errors);
      }else{
        resolve();
      }
      dispatch({
        type: VALIDATE_SIGNUP,
        payload: errors
      });

    });
}

export function signupOrCreateMemberOrUpdateMember(): Action {
  //this function is used to signup and make a new member if signup object is not null and personId is null
  //will create new member if signup object is null and personId is null
  //will update member if personId is not null
  return (dispatch,getState) => {
    let state = getState();
    //state.member.member.baseinfo.dob = state.member.member.baseinfo.dob.format("YYYY-MM-DDTHH:mm:ssZ")
    //state.member.member.gp.medicareExpired = state.member.member.gp.medicareExpired.format("YYYY-MM-DDTHH:mm:ssZ")
    ////console.log("stateOrigin = ",stateOrigin," state = ",state);

    return new Promise((resolve,reject) => {
      if( state.user.signup && state.user.signup.email && state.user.signup.password){
        var object = {...state.user.profile};
        object.username = object.email;
        console.log("Will create account for ",object);
        postRequest('api/v1/signup2', object).then((res) => {
            console.log("api/v1/signup2 = ",res);

            dispatch({
              type: USER_LOGIN,
              payload: res.account,
            });

            if(res.isSuccess){
              resolve("OK");
            }else{
              reject();
            }
        });
      }
      // else if (!state.member.member.baseinfo.personId && !state.member.member.signup.username){
      //   postRequest2('api/v1/newMember', state.member.member).then((response) => {
      //     console.log("api/v1/newMember = ",response);
      //       resolve("OK");
      //       dispatch({
      //         type: UPDATE_MEMBER,
      //         payload: response,
      //       });
      //   });
      // }else{
      //   postRequest2('api/v1/updateMember', state.member.member).then((response) => {
      //     console.log("api/v1/updateMember = ",response);
      //       resolve("OK");
      //       dispatch({
      //         type: UPDATE_MEMBER,
      //         payload: response,
      //       });
      //   });
      // }


    });


  }
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
