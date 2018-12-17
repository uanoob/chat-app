import SocketIOClient from 'socket.io-client';
import {
  SOCKETS_CONNECT_START,
  SOCKETS_CONNECT_SUCCESS,
  SOCKETS_CONNECT_FAIL,
  SOCKETS_CONNECT_MISSING,
  SOCKETS_RECEIVE_NEW_CHAT,
  SOCKETS_RECEIVE_NEW_MESSAGE,
  SOCKETS_SEND_MESSAGE_START,
  SOCKETS_SEND_MESSAGE_SUCCESS,
  // SOCKETS_SEND_MESSAGE_FAIL,
  SOCKETS_MOUNT_CHAT_START,
  SOCKETS_MOUNT_CHAT_SUCCESS,
  SOCKETS_MOUNT_CHAT_FAIL,
  SOCKETS_UNMOUNT_CHAT_START,
  SOCKETS_UNMOUNT_CHAT_SUCCESS,
  SOCKETS_UNMOUNT_CHAT_FAIL,
} from './types';

import { SOCKETS_URI } from '../../config';

let socket = null;

export const socketsConnectMissing = error => ({
  type: SOCKETS_CONNECT_MISSING,
  payload: error,
});

const socketsConnectStart = () => ({
  type: SOCKETS_CONNECT_START,
});

const socketsConnectSuccess = () => ({
  type: SOCKETS_CONNECT_SUCCESS,
});

const socketsConnectFail = error => ({
  type: SOCKETS_CONNECT_FAIL,
  payload: error,
});

const socketsReceiveNewChat = chat => ({
  type: SOCKETS_RECEIVE_NEW_CHAT,
  payload: chat,
});

const socketsReceiveMessage = message => ({
  type: SOCKETS_RECEIVE_NEW_MESSAGE,
  payload: message,
});

export const socketsConnect = () => (dispatch, getState) => {
  dispatch(socketsConnectStart());
  const { token } = getState().auth;
  socket = SocketIOClient(SOCKETS_URI, {
    query: { token },
  });
  socket.on('connect', () => {
    dispatch(socketsConnectSuccess());
  });
  socket.on('error', (error) => {
    dispatch(socketsConnectFail(`Socket connection: ${error}`));
  });
  socket.on('connect_error', () => {
    dispatch(socketsConnectMissing('Socket: lost connection.'));
  });
  socket.on('new-chat', (chat) => {
    dispatch(socketsReceiveNewChat(chat));
  });
  socket.on('new-message', (message) => {
    dispatch(socketsReceiveMessage(message));
  });
};

const socketsSendMessageStart = () => ({
  type: SOCKETS_SEND_MESSAGE_START,
});

const socketsSendMessageSuccess = data => ({
  type: SOCKETS_SEND_MESSAGE_SUCCESS,
  payload: data,
});

// const socketsSendMessageFail = error => ({
//   type: SOCKETS_SEND_MESSAGE_FAIL,
//   payload: error,
// });

export const socketsSendMessage = (content, chatId) => (dispatch) => {
  dispatch(socketsSendMessageStart());
  const sendData = {
    chatId,
    content,
  };
  if (!socket) {
    dispatch(socketsConnectMissing());
  }
  socket.emit('send-message', sendData, () => {
    dispatch(socketsSendMessageSuccess(sendData));
  });
};

const socketsMountChatStart = () => ({
  type: SOCKETS_MOUNT_CHAT_START,
});

const socketsMountChatSuccess = chatId => ({
  type: SOCKETS_MOUNT_CHAT_SUCCESS,
  payload: chatId,
});

const socketsMountChatFail = error => ({
  type: SOCKETS_MOUNT_CHAT_FAIL,
  payload: error,
});

export const socketsMountChat = chatId => (dispatch) => {
  dispatch(socketsMountChatStart());
  if (!socket) {
    dispatch(socketsConnectMissing());
    dispatch(socketsMountChatFail('No socket connection.'));
  }
  socket.emit('mount-chat', chatId);
  dispatch(socketsMountChatSuccess(chatId));
};

const socketsUnmountChatStart = () => ({
  type: SOCKETS_UNMOUNT_CHAT_START,
});

const socketsUnmountChatSuccess = chatId => ({
  type: SOCKETS_UNMOUNT_CHAT_SUCCESS,
  payload: chatId,
});

const socketsUnmountChatFail = error => ({
  type: SOCKETS_UNMOUNT_CHAT_FAIL,
  payload: error,
});

export const socketsUnmountChat = chatId => (dispatch) => {
  dispatch(socketsUnmountChatStart());
  if (!socket) {
    dispatch(socketsConnectMissing());
    dispatch(socketsUnmountChatFail('No socket connection.'));
  }
  socket.emit('unmount-chat', chatId);
  dispatch(socketsUnmountChatSuccess(chatId));
};
