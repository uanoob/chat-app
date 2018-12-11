import axios from 'axios';

import {
  GET_ALL_CHATS_START,
  GET_ALL_CHATS_SUCCESS,
  GET_ALL_CHATS_FAIL,
} from './types';

const getAllChatsStart = () => ({
  type: GET_ALL_CHATS_START,
});

export const getAllChatsSuccess = data => ({
  type: GET_ALL_CHATS_SUCCESS,
  payload: data,
});

const getAllChatsFail = error => ({
  type: GET_ALL_CHATS_FAIL,
  payload: error,
});

export const getAllChats = () => (dispatch, getState) => {
  dispatch(getAllChatsStart());
  const { token } = getState().auth;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios
    .get('/chats', config)
    .then((response) => {
      dispatch(getAllChatsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getAllChatsFail(error.response.data));
    });
};
