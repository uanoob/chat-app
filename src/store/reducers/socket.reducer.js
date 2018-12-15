import {
  SOCKETS_CONNECT_START,
  SOCKETS_CONNECT_SUCCESS,
  SOCKETS_CONNECT_FAIL,
  SOCKETS_CONNECT_MISSING,
  SOCKETS_SEND_MESSAGE_START,
  SOCKETS_SEND_MESSAGE_SUCCESS,
  SOCKETS_MOUNT_CHAT_START,
  SOCKETS_MOUNT_CHAT_SUCCESS,
  SOCKETS_MOUNT_CHAT_FAIL,
  SOCKETS_UNMOUNT_CHAT_START,
  SOCKETS_UNMOUNT_CHAT_SUCCESS,
  SOCKETS_UNMOUNT_CHAT_FAIL,
} from '../actions/types';

const initialState = {
  sockets: '',
  message: '',
  loading: false,
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SOCKETS_CONNECT_START:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case SOCKETS_CONNECT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case SOCKETS_CONNECT_FAIL:
    case SOCKETS_CONNECT_MISSING:
      return {
        ...state,
        message: action.payload,
        loading: false,
        loaded: false,
      };

    case SOCKETS_SEND_MESSAGE_START:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case SOCKETS_SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
        loaded: true,
      };
    case SOCKETS_MOUNT_CHAT_START:
    case SOCKETS_UNMOUNT_CHAT_START:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case SOCKETS_MOUNT_CHAT_SUCCESS:
    case SOCKETS_UNMOUNT_CHAT_SUCCESS:
      return {
        ...state,
        sockets: action.payload,
        loading: false,
        loaded: true,
      };
    case SOCKETS_MOUNT_CHAT_FAIL:
    case SOCKETS_UNMOUNT_CHAT_FAIL:
      return {
        ...state,
        message: action.payload,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}
