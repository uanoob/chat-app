import {
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
} from '../actions/types';

const initialState = {
  message: '',
  loading: false,
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_START:
      return {
        ...state,
        loading: true,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: action.payload.success,
        message: action.payload.message,
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}
