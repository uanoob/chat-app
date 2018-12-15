import { combineReducers } from 'redux';

import auth from './auth.reducer';
import chats from './chats.reducer';
import chat from './chat.reducer';
// import message from './message.reducer';
import sockets from './socket.reducer';

export default combineReducers({
  auth,
  chats,
  chat,
  // message,
  sockets,
});
