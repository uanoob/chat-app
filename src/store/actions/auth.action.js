import { API_URI } from '../../config';

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

const logoutFail = error => ({
  type: LOGOUT_FAIL,
  payload: error,
});

export const logout = () => (dispatch) => {
  dispatch(logoutStart());
  const url = API_URI;
  fetch(`${url}/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success) {
        dispatch(logoutSuccess(data));
        localStorage.removeItem('token');
      } else {
        dispatch(logoutFail(data));
        localStorage.removeItem('token');
      }
    });
};

const authCheckStart = () => ({
  type: AUTH_CHECK_START,
});

export const authCheckSuccess = user => ({
  type: AUTH_CHECK_SUCCESS,
  payload: user,
});

const authCheckFail = error => ({
  type: AUTH_CHECK_FAIL,
  payload: error,
});

export const authCheck = () => (dispatch, getState) => {
  dispatch(authCheckStart());
  const { token } = getState().auth;
  const url = API_URI;
  fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success) {
        dispatch(authCheckSuccess(data));
      } else {
        dispatch(authCheckFail(data));
      }
    })
    .catch((error) => {
      dispatch(authCheckFail(error));
    });
};

const loginStart = () => ({
  type: LOGIN_START,
});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const loginFail = error => ({
  type: LOGIN_FAIL,
  payload: error,
});

export const login = (email, password) => (dispatch) => {
  dispatch(loginStart());
  const url = API_URI;
  fetch(`${url}/login`, {
    method: 'POST',
    body: JSON.stringify({
      username: email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        dispatch(loginSuccess(data));
      } else {
        dispatch(loginFail(data));
      }
    })
    .catch((error) => {
      dispatch(loginFail(error));
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
  const url = API_URI;
  fetch(`${url}/signup`, {
    method: 'POST',
    body: JSON.stringify({
      username: email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        dispatch(signUpSuccess(data));
      } else {
        dispatch(signUpFail(data));
      }
    })
    .catch((error) => {
      dispatch(signUpFail(error));
    });
};
