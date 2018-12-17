export const API_URI = process.env.NODE_ENV === 'production'
  ? 'https://chat-api-ua.herokuapp.com/v1'
  : 'http://localhost:8000/v1';

export const SOCKETS_URI = process.env.NODE_ENV === 'production'
  ? 'wss://chat-api-ua.herokuapp.com/'
  : 'ws://localhost:8000/';
