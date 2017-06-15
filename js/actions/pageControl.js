export const SET_PROFILES_PROPS = 'SET_PROFILES_PROPS';
export const SET_LOGIN_PROPS = 'SET_LOGIN_PROPS';

export function setProfilesProps(prop) {
  return ({type:SET_PROFILES_PROPS,payload:prop})
}

export function setLoginProps(prop) {
  return ({type:SET_LOGIN_PROPS,payload:prop})
}
