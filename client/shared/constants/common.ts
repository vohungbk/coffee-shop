export const API_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'http://node-cors-client.herokuapp.com/';
