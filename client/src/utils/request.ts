import axios from 'axios';
// Create an axios instance

const service = axios.create({
  baseURL: 'http://localhost:4000/api/v1/node',
  timeout: 5000,
  headers: {
    accept: 'application/json',
  },
});

export default service;
