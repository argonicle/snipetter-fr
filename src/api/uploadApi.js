import axiosClient from "../config/axios";

const uploadApi = {
  async upload(data) {
    await axiosClient.post("upload", data);
  },
};

export default uploadApi;
