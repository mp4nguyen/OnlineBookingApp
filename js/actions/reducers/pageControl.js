import {SET_PROFILES_PROPS} from '../pageControl';

const initialState = {
  profiles: {nextPage:''},
};

export default function reducer(state = initialState, action) {

  if(action.type == SET_PROFILES_PROPS){
    var profiles = {...state.profiles,[action.payload.propName]:action.payload.propValue};
    return {...state,profiles};
  }else{
    return state;
  }

}
