import {
  GET_CHAT_BY_ID_START,
  GET_CHAT_BY_ID_SUCCESS,
  GET_CHAT_BY_ID_FAIL,
  CREATE_CHAT_START,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
} from './types';

import BASE_URL from '../../config';
import redirect from './redirect.action';

const getChatByIdStart = () => ({
  type: GET_CHAT_BY_ID_START,
});

export const getChatByIdSuccess = data => ({
  type: GET_CHAT_BY_ID_SUCCESS,
  payload: data,
});

const getChatByIdFail = error => ({
  type: GET_CHAT_BY_ID_FAIL,
  payload: error,
});

export const getChatById = id => (dispatch, getState) => {
  dispatch(getChatByIdStart());
  const url = BASE_URL;
  const { token } = getState().auth;
  fetch(`${url}/chats/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success) {
        dispatch(getChatByIdSuccess(data));
      } else {
        dispatch(getChatByIdFail(data));
      }
    })
    .catch((error) => {
      dispatch(getChatByIdFail(error));
    });
};

const createChatStart = () => ({
  type: CREATE_CHAT_START,
});

const createChatSuccess = data => ({
  type: CREATE_CHAT_SUCCESS,
  payload: data,
});

const createChatFail = error => ({
  type: CREATE_CHAT_FAIL,
  payload: error,
});

export const createChat = content => (dispatch, getState) => {
  dispatch(createChatStart());
  const url = BASE_URL;
  const { token } = getState().auth;
  const sendData = {
    data: { title: content },
  };
  fetch(`${url}/chats`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.success) {
        dispatch(createChatSuccess(data));
        dispatch(redirect(`/chat/${data.chat._id}`));
      } else {
        dispatch(createChatFail(data));
      }
    })
    .catch((error) => {
      dispatch(createChatFail(error));
    });
};
