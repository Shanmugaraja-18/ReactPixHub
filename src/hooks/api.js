// hooks/api.js
import axios from "axios";

const jsonPlaceholderApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
});

export { jsonPlaceholderApi, unsplashApi };
