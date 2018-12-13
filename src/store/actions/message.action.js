import {
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
} from './types';

import BASE_URL from '../../config';
import { getChatById } from '.';

const sendMessageStart = () => ({
  type: SEND_MESSAGE_START,
});

export const sendMessageSuccess = data => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: data,
});

const sendMessageFail = error => ({
  type: SEND_MESSAGE_FAIL,
  payload: error,
});

export const sendMessage = (message, chatId) => (dispatch, getState) => {
  dispatch(sendMessageStart());
  const { token } = getState().auth;
  fetch(`${BASE_URL}/chats/${chatId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: { content: message },
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success) {
        dispatch(sendMessageSuccess(data));
        dispatch(getChatById(chatId));
      } else {
        dispatch(sendMessageFail(data));
      }
    })
    .catch((error) => {
      dispatch(sendMessageFail(error));
    });
};
