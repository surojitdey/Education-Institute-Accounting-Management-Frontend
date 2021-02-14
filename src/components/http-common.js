import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://127.0.0.1:8000/api/v1/student/`,
  headers: {
    Authorization: 'Token d5f01202c5678697f8979e4b4ec86244223e1efc'
  }
})
