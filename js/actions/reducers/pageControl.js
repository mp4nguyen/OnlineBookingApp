import {SET_PROFILES_PROPS,SET_LOGIN_PROPS} from '../pageControl';

const initialState = {
  profiles: {nextPage:''},
  login: {nextPage:''},
};

export default function reducer(state = initialState, action) {

  if(action.type == SET_PROFILES_PROPS){
    var profiles = {...state.profiles,[action.payload.propName]:action.payload.propValue};
    return {...state,profiles};
  }else if(action.type == SET_LOGIN_PROPS){
    var login = {...state.login,[action.payload.propName]:action.payload.propValue};
    return {...state,login};
  }else{
    return state;
  }

}
