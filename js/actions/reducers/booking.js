import * as types from '../types';
import R from 'ramda';

import {
  SELECT_SLOT,
  FETCH_BOOKING_LIST,
  SET_ACTIVE_BOOKING_SECTION,
  MAKE_A_BOOKING,
  UPDATE_A_BOOKING,
  UPDATE_PROFILE_BOOKING,
  AUTH_USER,
  VIEW_A_BOOKING,
  UPDATE_APPOINTMENT,
  SELECT_APPOINTMENT,
  NEW_PROFILE,
} from '../booking';

import {
  USER_LOGIN,
} from '../user';

export const initialProfile = {
  patientId: -1,
  firstName: '',
  lastName: '',
  dob: '',
  mobile: '',
  email: '',
  address: '',
  purhurb: '',
};
const initialBooking = {
  clinic: null,
  item: null,
  slot: null,
  patientId: -1,
  apptForMySelf: 'My self',
  apptForFistTime: '',
  isGeneralAppointment: false,
  isIllness: false,
  isCarAccident: false,
  isMedicalCertificate: false,
  isNonWorkplaceInjury: false,
  isWorkplaceInjury: false,
  isPrescription: false,
  isUnsureOrOther: false,
  hasPrivateInsurance: '',
  isAsthma: false,
  isBeastCancerRisk: false,
  isDiabetes: false,
  isCholesterolOrBloodPressure: false,
  isPainRelief: false,
  isProtateCancerRisk: false,
  isHearingLoss: false,
  FertilityOrPregnancy: false,
  isQuitSmoking: false,
  isWeightLoss: false,
  profile: initialProfile,
  isReceiveNews: false,
  codeVerify: '',
  Suburb: '',
  aptType: 'isGeneralAppointment',
  aboutThisPracice: true,
  reasonForApt: '',
  hasHealthInsurance: false,
  isFilledProfile: false,
};

const initialState = {
  booking: initialBooking,
  slot: {},
  bookings: []
};

const ACTION_HANDLERS = {
  // [USER_LOGIN]: (state, action) => {
  //   if (!state.booking.isFilledProfile) {
  //     console.log(action.payload);
  //     const profile = R.find(R.propEq('patientId', action.payload.patientId), action.payload.profiles);
  //     return {
  //       ...state,
  //       booking: {
  //         ...state.booking,
  //         profile,
  //         isFilledProfile: true,
  //       },
  //     };
  //   }
  //   return state;
  // },


  [SELECT_SLOT]: (state, action) => ({
    ...state,
    slot: action.payload,
  }),
  [SELECT_APPOINTMENT]: (state, action) => ({
    ...state,
    appt: action.payload,
  }),
  [FETCH_BOOKING_LIST]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [SET_ACTIVE_BOOKING_SECTION]: (state, action) => ({
    ...state,
    activeSection: action.payload,
  }),
  [MAKE_A_BOOKING]: (state, action) => ({
    ...state,
    activeSection: 'section-1',
    booking: {
      ...initialBooking,
      ...action.payload,
    },
  }),
  [UPDATE_A_BOOKING]: (state, action) => ({
    ...state,
    booking: {
      ...state.booking,
      ...action.payload,
    },
  }),
  [UPDATE_PROFILE_BOOKING]: (state, action) => ({
    ...state,
    booking: {
      ...state.booking,
      profile: {
        ...state.booking.profile,
        ...action.payload,
      },
    },
  }),
  [AUTH_USER]: (state, action) => {
    const patient = R.find(R.propEq('patientId', action.user.patientId))(action.user.profiles);
    const { booking } = state;
    if (!booking.item || !booking.slot && booking.apptForMySelf !== 'My self') {
      return state;
    }
    return {
      ...state,
      booking: {
        ...state.booking,
        profile: {
          ...booking.profile,
          ...patient,
        },
      },
    };
  },
  [VIEW_A_BOOKING]: (state, action) => ({
    ...state,
    viewedBooking: action.payload,
  }),
  [UPDATE_APPOINTMENT]: (state, action) => {
    const rejectItem = R.reject(R.propEq('apptId', action.payload.apptId));
    return {
      ...state,
      viewedBooking: action.payload,
      types: [...rejectItem(state.list), action.payload],
    };
  },
  [NEW_PROFILE]: (state, action) => {
    return {
      ...state,
      initNewProfile: action.payload,
    };
  },
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
