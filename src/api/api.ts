import axios from 'axios';

export const createApi = (baseURL: string) => axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});
