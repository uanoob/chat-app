import {
  GET_CHAT_BY_ID_START,
  GET_CHAT_BY_ID_SUCCESS,
  GET_CHAT_BY_ID_FAIL,
} from './types';

import BASE_URL from '../../config';

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
