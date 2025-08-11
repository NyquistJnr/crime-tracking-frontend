import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Axios Request Interceptor
// This function will be called before every request is sent
api.interceptors.request.use(
  (config) => {
    // Retrieve the user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // If a user and token exist, add the token to the Authorization header
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;
