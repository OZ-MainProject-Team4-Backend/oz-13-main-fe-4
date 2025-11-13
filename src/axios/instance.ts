import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5173/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export const diaryInstance = axios.create({
  baseURL: 'http://localhost:5173/',
  timeout: 1000,
});
