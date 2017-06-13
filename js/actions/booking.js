import axios from 'axios';
import moment from 'moment';

import type { Action } from './types';
import { getRequest,postRequest } from '../libs/requests';

export const FETCH_BOOKING_LIST = 'FETCH_BOOKING_LIST';
export const FETCH_BOOKING_TYPE = 'FETCH_BOOKING_TYPE';
export const SET_CLICKED_BOOKING_TYPE = 'SET_CLICKED_BOOKING_TYPE';
export const SEARCH_CLINIC = 'SEARCH_CLINIC';
export const MAKE_A_BOOKING = 'MAKE_A_BOOKING';
export const UPDATE_A_BOOKING = 'UPDATE_A_BOOKING';
export const SELECT_APPOINTMENT = 'SELECT_APPOINTMENT';
export const NEW_PROFILE = 'NEW_PROFILE';
export const SET_SEARCH_KEY_WORDS = 'SET_SEARCH_KEY_WORDS';


export function getBookings(): Action {
  return dispatch => getRequest('/BookingCtrls/getBookings')
    .then((res) => {
      dispatch({
        type: FETCH_BOOKING_LIST,
        payload: res.bookings,
      });
    }).catch((e) => {
      console.log(e);
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

export function searchClinics(searchInfo): Action {
  var searchCriteria = {keyword: searchInfo.keyword,bookingTypeId: searchInfo.bookingTypeId,searchDate: moment().startOf('day') };
  console.log("searchCriteria = ",searchCriteria);
  return dispatch => postRequest('/api/v1/searchClinics', searchCriteria)
    .then(result =>{
      console.log("/api/v1/searchClinics = ",result);
      dispatch({
        type: SEARCH_CLINIC,
        payload: {
          list: result,
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
        type: MAKE_A_BOOKING,
        payload: clinic,
      });
      resolve();
    });
}



export function selectSlot(slot): Action {
  return dispatch =>
    new Promise((resolve) => {
      dispatch({
        type: UPDATE_A_BOOKING,
        payload: slot,
      });
      resolve();
    });
}

export function updateBooking(item): Action {
  return dispatch =>
    new Promise((resolve) => {
      dispatch({
        type: UPDATE_A_BOOKING,
        payload: item,
      });
      resolve();
    });
}

export function setAppointment(item): Action {
  return dispatch =>
    new Promise((resolve) => {
      dispatch({
        type: SELECT_APPOINTMENT,
        payload: item,
      });
      resolve();
    });
}

export function setNewProfile(value): Action {
  return dispatch =>
    new Promise((resolve) => {
      dispatch({
        type: NEW_PROFILE,
        payload: value,
      });
      resolve();
    });
}
