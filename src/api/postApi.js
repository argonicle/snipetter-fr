import axiosClient from "../config/axios";

const postApi = {
  async getAll() {
    return await axiosClient.get("post");
  },
  async getByUserId(userId) {
    return await axiosClient.get(`post/${userId}`);
  },
  async create(post) {
    return await axiosClient.post("post", post);
  },
  async like(postId, userId) {
    return await axiosClient.put(`post/${postId}/like`, { userId });
  },
  async comment(postId, comment) {
    return await axiosClient.put(`post/${postId}/comment`, { comment });
  },
  async delete(postId) {
    return await axiosClient.delete(`post/${postId}`);
  },
};

export default postApi;
