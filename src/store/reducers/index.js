import { combineReducers } from 'redux';

import auth from './auth.reducer';
import chats from './chats.reducer';

export default combineReducers({
  auth,
  chats,
});
