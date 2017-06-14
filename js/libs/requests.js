import axios from 'axios';
import { config } from '../global';
import R from 'ramda';
import { showSpinner, hideSpinner } from '../actions/spinner';
const {baseURL,} = config;

var accessToken = '';

const instance = axios.create({
  baseURL,
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

export const setToken = (token) => {
  accessToken = token;
  instance.defaults.headers.common['accessToken'] = token;
};

export const postRequest = (url, data, options = {}) => instance.post(url, data, options);

export const getRequest = (url, params, options = {}) => instance.get(url, params, options);

export const putRequest = (url, data, options = {}) => instance.put(url, data, options);

export const deleteRequest = (url, params, options = {}) => instance.delete(url, params, options);
