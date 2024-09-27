import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "http://127.0.0.1:5001/clone-265cb/us-central1/api",
  baseURL: "https://amazon-api-7i69.onrender.com/",
});

export { axiosInstance };
