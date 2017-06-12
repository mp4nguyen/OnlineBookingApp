import * as types from '../types';
import R from 'ramda';

import {
  FETCH_BOOKING_LIST,
  FETCH_BOOKING_TYPE,
  SET_ACTIVE_BOOKING_SECTION,
  MAKE_A_BOOKING,
  UPDATE_A_BOOKING,
  UPDATE_PROFILE_BOOKING,
  AUTH_USER,
  VIEW_A_BOOKING,
  UPDATE_APPOINTMENT,
  SET_CLICKED_BOOKING_TYPE,
  SEARCH_CLINIC,
  SELECT_APPOINTMENT,
  NEW_PROFILE,
  SET_SEARCH_KEY_WORDS
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
const moreType = {
  bookingTypeId: 0,
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAAErdZjwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUUxMkE2MUM2RjA5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5Q0EwNTcxNkJGQkExMUU2QUM1MjgwRkUwMkI3Q0JFQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5Q0EwNTcxNUJGQkExMUU2QUM1MjgwRkUwMkI3Q0JFQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDY4MDExNzQwNzIwNjgxMTgyMkFFMTJBNjFDNkYwOUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFFMTJBNjFDNkYwOUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WKFcfAAAE/UlEQVR42mL8//8/w0ACFnI0cU46hdXV3/PMGEk1i4lhgMGoA0YdMOAOYCSnHGBkxJ7byDFrNApGHUBWXcAx8SSu1DZaF4w6YNQBo3XBqANG64LRumDUASOkKKYmAAjAjh3UAADAIAwM/k1XCOegD7YSZh9wBQA8Ip0QgE4oAwC4gAsAcIEMALjfBxJAAHbs4AYAEAQC2P5bO8H54IESehOYBgnw/AEj+1Al6aaRUrl1jPwD65sAAAAAAKyYA9IemdL1Ll8AAIDdadsFLneM2DdVAAAAAAAYhVUAAAAAjMIqAAAAAAAATN4Ffs0RgH07MAEAhGEguP/W3SIU/rKAcBiQqnkAJ8HVQh5IqAAAAAAAAAAAAAAAAACK8wCXoyoAAAAAAAAAAHgWL0RUAAAAAAAAAAAAAACAZIzFVQAAAAAAAAAAUI2xuAoAAAAAAAAAAAAAAJCM3+P1HXACsHcHRwDBUBRFNylQp+hQC54RI/+fUwCDO7GQRPsCjIG0NqpdULpPReqrfS2MAAgAASAABIAAEAACQAAIAAEgAN5Q7nNwuh4vVe1+GQG8AhAAAkAACAABIAAEQBPlpoU/2I8hZVo4AkAACAABIAAEgAAQAAJAAAiAZYyC13R6rPdZFxCyLgABIAAEgAAQAAJAAKyq4rTwbfIpDgH82z75+NYFIAAEgAAQAAJAAAgAASAABIAAWIa/hxsB6OwSgL07tmEQBgIoSpGCLJQ5MgITsEvYgAmijBEKhmAJWhgBFydbx3tSWktEXycK6zABTAAEgAC4p3RXwp7TEvlSM+/jazABEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAB1+W5gId8NRAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAiARqVbF99//qHr4s/fYAIgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAFQ3SPhM/0Cz16z/VnWxReyLh4BIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAHQrozbwt+Bx29dsnuBGS+FfgPPti4e7wAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACoA3ptoVjAiAABMAlhwDt3cENgkAQQNFMwgEbsg1jB1RgL9ABHViBdyzDCrx5XGnAmHiacd9LuG92yHfxAM4A4BcAEABAAIA+DLYgt8Nyr/wnzfq6HCdTdAIABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQAEAAAAEABAAQABAAQACArvgyUH7nwmt/GF9uPg+efUARpdfv/vIIAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgA8I13AiY3ztu18PJv+7WYogDwu1PhtT+NzyMAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAIAAAAIAdCdaa3Yh84AiSq/f/eUEAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIADAR4MtyG2ct8ov1Vv3azJFJwBAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAEABAAQAKAP0VqzC+AEAAgAIADA/3sDvc3L5XjVbGkAAAAASUVORK5CYII=',
  bookingTypeName: 'More',
};
const initialState = {
  appt: null,
  types: [],
  activeSection: 'section-1',
  booking: initialBooking,
  list: [],
  search: {
    keyword: '',
    bookingTypeId: null,
    searchDate: null
  },
  moreType,
  initNewProfile: false,
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


  [SELECT_APPOINTMENT]: (state, action) => ({
    ...state,
    appt: action.payload,
  }),
  [FETCH_BOOKING_LIST]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [SEARCH_CLINIC]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [SET_CLICKED_BOOKING_TYPE]: (state, action) => ({
    ...state,
    selectedType: action.payload,
    search: {
      ...state.search,
      bookingTypeId: action.payload,
    },
  }),
  [SET_SEARCH_KEY_WORDS]: (state, action) => ({
    ...state,
    search: {
      ...state.search,
      keyword: action.payload,
    },
  }),
  [FETCH_BOOKING_TYPE]: (state, action) => ({
    ...state,
    types: action.payload,
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
