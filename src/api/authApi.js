import axiosClient from "../config/axios";

const authApi = {
  async signup(data) {
    return await axiosClient.post("auth", data);
  },
  async login(data) {
    return await axiosClient.post("auth/login", data);
  },
};

export default authApi;
