import history from '../../utils/history.utils';
import { REDIRECT } from './types';

const redirect = to => (dispatch) => {
  history.push(to);
  dispatch({
    type: REDIRECT,
    payload: to,
  });
};

export default redirect;
