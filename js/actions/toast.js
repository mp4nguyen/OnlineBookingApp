export const TOAST_CALLBACK = 'TOAST_CALLBACK';
export const SHOW_TOAST = 'SHOW_TOAST';

export function showStatusCallBack() {
  return ({type:TOAST_CALLBACK})
}

export function showToast(prop) {
  return ({type:SHOW_TOAST,payload:prop})
}
