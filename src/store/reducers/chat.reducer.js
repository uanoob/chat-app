import {
  GET_CHAT_BY_ID_START,
  GET_CHAT_BY_ID_SUCCESS,
  GET_CHAT_BY_ID_FAIL,
} from '../actions/types';

const initialState = {
  chat: null,
  message: '',
  loading: false,
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CHAT_BY_ID_START:
      return {
        ...state,
        loading: true,
      };
    case GET_CHAT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        chat: action.payload.chat,
      };
    case GET_CHAT_BY_ID_FAIL:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        loaded: false,
        chat: null,
      };
    default:
      return state;
  }
}
