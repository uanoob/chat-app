import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
const devtoolsString = '__REDUX_DEVTOOLS_EXTENSION__';
const enhancer = compose(
  applyMiddleware(...middleware),
  window[devtoolsString] && window[devtoolsString](),
);
const store = createStore(rootReducer, initialState, enhancer);

export default store;
