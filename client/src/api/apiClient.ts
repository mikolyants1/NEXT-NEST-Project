import axios, {type AxiosInstance } from 'axios';

export const baseUrl:string = "http://localhost:5000/";

export const apiClient:AxiosInstance = axios.create({
  baseURL:"http://localhost:5000/"
})