import axios, {type AxiosInstance } from 'axios';

export const apiClient:AxiosInstance = axios.create({
  baseURL:process.env.SERVER_URL || "http://localhost:5000/"
})