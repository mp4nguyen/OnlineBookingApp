import axios from 'axios';
import moment from 'moment';

import type { Action } from './types';
import { getRequest,postRequest } from '../libs/requests';



export const SELECT_CLINIC = 'SELECT_CLINIC';
export const FETCH_BOOKING_LIST = 'FETCH_BOOKING_LIST';
export const FETCH_BOOKING_TYPE = 'FETCH_BOOKING_TYPE';
export const SET_CLICKED_BOOKING_TYPE = 'SET_CLICKED_BOOKING_TYPE';
export const SEARCH_CLINIC = 'SEARCH_CLINIC';
export const MAKE_A_BOOKING = 'MAKE_A_BOOKING';
export const UPDATE_A_BOOKING = 'UPDATE_A_BOOKING';
export const SELECT_APPOINTMENT = 'SELECT_APPOINTMENT';
export const NEW_PROFILE = 'NEW_PROFILE';
export const SET_SEARCH_KEY_WORDS = 'SET_SEARCH_KEY_WORDS';
export const SET_SEARCH_DATE = 'SET_SEARCH_DATE';
export const UPDATE_SLOTS_FOR_CLINIC = 'UPDATE_SLOTS_FOR_CLINIC';

function getSlotsForClinic(dispatch,nextState,resolve,reject){
  console.log("nextState = ",nextState);
  var slotCriteria = {
    bookingTypeId: nextState.searchClinic.searchCriteria.bookingTypeId,
    clinicId: nextState.searchClinic.clinic.clinicId,
    searchDate: nextState.searchClinic.searchCriteria.searchDate,
  };

  postRequest('/api/v1/getSlots', slotCriteria ).then(result =>{
      console.log("/api/v1/getSlots = ",result);
      dispatch({
        type: UPDATE_SLOTS_FOR_CLINIC,
        payload: result
      })
      resolve();

    },err=>{
      console.log("/api/v1/searchClinics = ",err);
      reject('err');
    });
}

export function fetchBookingTypesFromServer(): Action {
  return dispatch => getRequest('/api/v1/getBookingTypes')
    .then((res) => {

      dispatch({
        type: FETCH_BOOKING_TYPE,
        payload: res,
      });

      if (res.length >0){
        dispatch({
          type: SET_CLICKED_BOOKING_TYPE,
          payload: res[0].bookingTypeId,
        });
      }


    }).catch((e) => {
      console.log(e);
    });
}

export function setClickedBookingType(bookingTypeId): Action {
  return {
    type: SET_CLICKED_BOOKING_TYPE,
    payload: bookingTypeId,
  };
}

export function setKeyWords(keyword): Action {
  return {
    type: SET_SEARCH_KEY_WORDS,
    payload: keyword,
  };
}

export function setSearchDate(date): Action {
  return dispatch =>
    new Promise((resolve) => {

      dispatch({
        type: SET_SEARCH_DATE,
        payload: date,
      });

      resolve();
    });
}

export function nextDate(): Action {
  return (dispatch,getState) =>
    new Promise((resolve,reject) => {


      var currentState = getState();
      console.log("nextDate.....currentState = ",currentState);
      var currentSearchDate = currentState.searchClinic.searchCriteria.searchDate.clone();
      console.log("nextDate.....currentSearchDate = ",currentSearchDate);
      dispatch({
        type: SET_SEARCH_DATE,
        payload: currentSearchDate.add(1,'day'),
      });

      var nextState = getState();

      getSlotsForClinic(dispatch,nextState,resolve,reject)
      // console.log("nextState = ",nextState);
      // var slotCriteria = {
      //   bookingTypeId: nextState.searchClinic.searchCriteria.bookingTypeId,
      //   clinicId: nextState.searchClinic.clinic.clinicId,
      //   searchDate: nextState.searchClinic.searchCriteria.searchDate,
      // };
      //
      // postRequest('/api/v1/getSlots', slotCriteria ).then(result =>{
      //     console.log("/api/v1/getSlots = ",result);
      //     dispatch({
      //       type: UPDATE_SLOTS_FOR_CLINIC,
      //       payload: result
      //     })
      //     resolve();
      //
      //   },err=>{
      //     console.log("/api/v1/searchClinics = ",err);
      //     reject('err');
      //   });


    });
}

export function prevDate(): Action {
  return  (dispatch,getState) =>
    new Promise((resolve,reject) => {

      console.log("prevDate.....");
      var currentState = getState();
      var currentSearchDate = currentState.searchClinic.searchCriteria.searchDate.clone();

      dispatch({
        type: SET_SEARCH_DATE,
        payload: currentSearchDate.add(-1,'day'),
      });

      var nextState = getState();
      getSlotsForClinic(dispatch,nextState,resolve,reject)

    });
}

export function searchClinics(searchInfo): Action {
  //var searchCriteria = {keyword: searchInfo.keyword,bookingTypeId: searchInfo.bookingTypeId,searchDate: moment().startOf('day') };
  console.log("searchCriteria = ",searchInfo);
  return dispatch => postRequest('/api/v1/searchClinics', searchInfo)
    .then(result =>{
      console.log("/api/v1/searchClinics = ",result);
      dispatch({
        type: SEARCH_CLINIC,
        payload: {
          clinics: result,
        },
      })
    },err=>{
      console.log("/api/v1/searchClinics = ",err);
    });
}

export function selectClinic(clinic): Action {
  return dispatch =>
    new Promise((resolve) => {
      dispatch({
        type: SELECT_CLINIC,
        payload: clinic,
      });
      resolve();
    });
}
