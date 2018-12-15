import {
  GET_CHAT_BY_ID_START,
  GET_CHAT_BY_ID_SUCCESS,
  GET_CHAT_BY_ID_FAIL,
  SOCKETS_RECEIVE_MESSAGE,
} from '../actions/types';

const initialState = {
  chat: null,
  messages: [],
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
        messages: action.payload.chat.messages,
      };
    case GET_CHAT_BY_ID_FAIL:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        loaded: false,
        chat: null,
      };
    case SOCKETS_RECEIVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload.message),
      };
    default:
      return state;
  }
}
