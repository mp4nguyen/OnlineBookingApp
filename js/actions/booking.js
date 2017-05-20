import axios from 'axios';

import type { Action } from './types';
import { getRequest } from '../libs/requests';

export const FETCH_BOOKING_LIST = 'FETCH_BOOKING_LIST';
export const FETCH_BOOKING_TYPE = 'FETCH_BOOKING_TYPE';
export const SET_CLICKED_BOOKING_TYPE = 'SET_CLICKED_BOOKING_TYPE';
export const SEARCH_CLINIC = 'SEARCH_CLINIC';
export const MAKE_A_BOOKING = 'MAKE_A_BOOKING';
export const UPDATE_A_BOOKING = 'UPDATE_A_BOOKING';
export const SELECT_APPOINTMENT = 'SELECT_APPOINTMENT';
export const NEW_PROFILE = 'NEW_PROFILE';


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
  return dispatch => getRequest('/BookingCtrls/getBookingTypes')
    .then((res) => {
      dispatch({
        type: FETCH_BOOKING_TYPE,
        payload: res.BookingTypes,
      });
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


export function searchClinics(clinics): Action {
  return dispatch => getRequest('/BookingCtrls/searchClinics', { clinics: clinics.keyword })
    .then(result =>
      dispatch({
        type: SEARCH_CLINIC,
        payload: {
          list: result.Clinics,
          search: clinics,
        },
      }));
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

