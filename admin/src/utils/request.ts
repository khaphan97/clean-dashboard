import axios from 'axios';

// Create an axios instance
const service = axios.create({
//   baseURL: 'http://localhost:4000/api/v1',
  baseURL :'https://chatbot-version-11.herokuapp.com/api/v1'
  // timeout: 5000, // request timeout.
});

export default service;
