import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import './index.css';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import BASE_URL from './config';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const app = (
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
