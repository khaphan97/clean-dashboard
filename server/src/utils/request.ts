import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

function service(url: string) {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: process.env.API_KEY,
      'Content-Type': 'application/json',
    },
  });
}

export default service;
