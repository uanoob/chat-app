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
} from '../actions/types';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: false,
  token,
  message: '',
  loading: false,
  loaded: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
    case LOGOUT_START:
    case AUTH_CHECK_START:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload.success,
        token: action.payload.token,
        message: action.payload.message,
        loading: false,
        loaded: true,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT_FAIL:
    case AUTH_CHECK_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        message: action.payload.message,
        loading: false,
        loaded: false,
        user: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        message: action.payload.message,
        loading: false,
        loaded: true,
        user: null,
      };
    case AUTH_CHECK_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload.success,
        message: action.payload.message,
        loading: false,
        loaded: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
}
