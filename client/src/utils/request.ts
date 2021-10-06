import axios from 'axios';
// Create an axios instance

const service = axios.create({
  baseURL: 'https://chatbot-version-11.herokuapp.com/api/v1/node',
  // baseURL: 'http://localhost:4000/api/v1/node',
  timeout: 10000,
  headers: {
    accept: 'application/json',
  },
});

export default service;
