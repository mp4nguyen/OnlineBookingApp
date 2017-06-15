import axios from 'axios';
import { config } from '../global';
import R from 'ramda';
var DeviceInfo = require('react-native-device-info');
// console.log("Device Manufacturer", DeviceInfo.getManufacturer());  // e.g. Apple
//
// console.log("Device Model", DeviceInfo.getModel());  // e.g. iPhone
//
// console.log("Device Name", DeviceInfo.getSystemName());  // e.g. iPhone OS
//
// console.log("Device Version", DeviceInfo.getSystemVersion());  // e.g. 9.0
//
// console.log("Bundle Id", DeviceInfo.getBundleId());  // e.g. com.learnium.mobile
//
// console.log("Build Number", DeviceInfo.getBuildNumber());  // e.g. 89
//
// console.log("App Version", DeviceInfo.getVersion());  // e.g. 1.1.0
//
// console.log("App Version (Readable)", DeviceInfo.getReadableVersion());  // e.g. 1.1.0.89




import { showSpinner, hideSpinner } from '../actions/spinner';
const {simulatorURL,machineURL} = config;

var accessToken = '';

var instance = axios.create({
  baseURL:simulatorURL,
});

let dispatcher;

const showLoading = () => !!dispatcher && dispatcher(showSpinner());
const hideLoading = () => !!dispatcher && dispatcher(hideSpinner());

const reqSuccess = (config) => {
  // if (TOKEN) {
  //   config.headers.Authorization = `Bearer ${TOKEN.access_token}`;
  // }
  showLoading();
  return config;
};
const failure = (error) => {
  // if (error.response && error.response.status === 401) {
  // }
  hideLoading();
  const message = R.pathOr(error, ['response', 'data', 'error', 'message'], error);
  return Promise.reject(message);
};

instance.interceptors.request.use(reqSuccess, failure);

const reSuccess = (response) => {
  hideLoading();
  return response.data;
};

instance.interceptors.response.use(reSuccess, failure);

export const setDispacher = (dispatch) => {
  dispatcher = dispatch;
};

export const setURL = () => {
  var model = DeviceInfo.getModel();
  console.log("Device Model = ", model);  // e.g. iPhone
  if(model != 'Simulator'){
    instance.defaults.baseURL = machineURL;
    console.log("new url = ",instance.defaults.baseURL);
  }
};

export const setToken = (token) => {
  accessToken = token;
  instance.defaults.headers.common['accessToken'] = token;
};

export const postRequest = (url, data, options = {}) => instance.post(url, data, options);

export const getRequest = (url, params, options = {}) => instance.get(url, params, options);

export const putRequest = (url, data, options = {}) => instance.put(url, data, options);

export const deleteRequest = (url, params, options = {}) => instance.delete(url, params, options);
