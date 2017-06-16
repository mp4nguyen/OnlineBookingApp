import {TOAST_CALLBACK,SHOW_TOAST} from '../toast';

const initialState = {
  type: '',
  message: '',
  isShow: false,
  height: 100,
};

export default function reducer(state = initialState, action) {

  if(action.type == TOAST_CALLBACK){
    return {...state,isShow:false};
  }else if(action.type == SHOW_TOAST){
    return {...state,...action.payload,isShow:true};
  }else{
    return state;
  }

}
