import axios from "axios";

export const api = axios.create({
  baseURL: "https://todo-redev.herokuapp.com/api",
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdGFyb2dAbWFpbC5ydSIsImlkIjoxNzQyLCJpYXQiOjE3NTM3MzE0NTd9.8_88eILNwjwr9seP10oxnxHhXQ78fD2Qd5lXiCHNNIA",
    "Content-Type": "application/json",
  },
});
