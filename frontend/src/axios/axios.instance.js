import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-authentication-m0qo.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies when making requests
});

export default instance;
