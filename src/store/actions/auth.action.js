import axios from 'axios';

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTH_CHECK_START,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAIL,
} from './types';

const logoutStart = () => ({
  type: LOGOUT_START,
});

const logoutSuccess = data => ({
  type: LOGOUT_SUCCESS,
  payload: data,
});

const logoutFail = err => ({
  type: LOGIN_FAIL,
  payload: err,
});

export const logout = () => (dispatch) => {
  dispatch(logoutStart());
  axios
    .get('/logout')
    .then((response) => {
      dispatch(logoutSuccess(response.data));
      localStorage.removeItem('token');
    })
    .catch((error) => {
      dispatch(logoutFail(error.response.data));
    });
};

const authCheckStart = () => ({
  type: AUTH_CHECK_START,
});

export const authCheckSuccess = user => ({
  type: AUTH_CHECK_SUCCESS,
  payload: user,
});

const authCheckFail = err => ({
  type: AUTH_CHECK_FAIL,
  payload: err,
});

export const authCheck = () => (dispatch, getState) => {
  dispatch(authCheckStart());
  const { token } = getState().auth;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios
    .get('/users/me', config)
    .then((response) => {
      dispatch(authCheckSuccess(response.data));
    })
    .catch((error) => {
      dispatch(authCheckFail(error.response.data));
    });
};

const loginStart = () => ({
  type: LOGIN_START,
});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const loginFail = data => ({
  type: LOGOUT_FAIL,
  payload: data,
});

export const login = (email, password) => (dispatch) => {
  dispatch(loginStart());
  const loginData = {
    username: email,
    password,
  };
  axios
    .post('/login', loginData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loginFail(error.response.data));
    });
};

const signUpStart = () => ({
  type: SIGNUP_START,
});

const signUpSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});

const signUpFail = err => ({
  type: SIGNUP_FAIL,
  payload: err,
});

export const signUp = (email, password) => (dispatch) => {
  dispatch(signUpStart());
  const signUpData = {
    username: email,
    password,
  };
  axios
    .post('/signup', signUpData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(signUpSuccess(response.data));
    })
    .catch((error) => {
      dispatch(signUpFail(error.response.data));
    });
};
