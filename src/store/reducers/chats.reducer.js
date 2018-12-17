import {
  GET_ALL_CHATS_START,
  GET_ALL_CHATS_SUCCESS,
  GET_ALL_CHATS_FAIL,
  SOCKETS_RECEIVE_NEW_CHAT,
} from '../actions/types';

const initialState = {
  chats: [],
  message: '',
  loading: false,
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHATS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload.chats,
        loading: false,
        loaded: true,
      };
    case GET_ALL_CHATS_FAIL:
      return {
        ...state,
        chats: [],
        message: action.payload.message,
        loading: false,
        loaded: false,
      };
    case SOCKETS_RECEIVE_NEW_CHAT:
      return {
        ...state,
        chats: state.chats.concat(action.payload.chat),
      };
    default:
      return state;
  }
}
