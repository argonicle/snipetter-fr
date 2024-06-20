import axiosClient from "../config/axios";

const userApi = {
  async getById(userId) {
    return await axiosClient.get(`user/${userId}`);
  },
  async editProfile(userId, profile) {
    return await axiosClient.put(`user/${userId}`, profile);
  },
  async follow(followedUserId, followingUserId) {
    return await axiosClient.put(`user/${followedUserId}/follow`, {
      followingUserId,
    });
  },
};

export default userApi;
