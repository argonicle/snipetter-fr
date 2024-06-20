import { useState } from "react";
import userApi from "../api/userApi";
import { useToast } from "@chakra-ui/react";
import useAuthUser from "./useAuthUser";
import uploadApi from "../api/uploadApi";
import { saveAuthUserToStorage } from "../util/authUser";

const useUser = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async (userId) => {
    try {
      setIsLoading(true);
      const { data: result } = await userApi.getById(userId);
      setUser(result.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const { authUser, setAuthUser } = useAuthUser();
  const [username, setUsername] = useState(authUser.username);
  const [profileImage, setProfileImage] = useState(authUser.profileImage);
  const [bio, setBio] = useState(authUser.info.bio);
  const [languages, setLanguages] = useState(authUser.info.languages);
  const [comment, setComment] = useState(authUser.info.comment);
  const toast = useToast();

  const editProfile = async (e) => {
    try {
      setIsLoading(true);

      const newProfileImage = e.target.files
        ? Date.now() + e.target.files[0].name
        : authUser.profileImage;

      if (e.target.files) {
        await uploadFile(e.target.files[0]);
      }

      const newProfile = {
        username,
        profileImage: newProfileImage,
        info: { bio, languages, comment },
      };
      const { data: result } = await userApi.editProfile(
        authUser._id,
        newProfile
      );
      saveAuthUserToStorage(result.user);
      setAuthUser(result.user);
      setUser(result.user);
      toast({
        title: "Success.",
        description: "Update your profile",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("filename", Date.now() + file.name);
    data.append("file", file);
    try {
      await uploadApi.upload(data);
    } catch (error) {
      console.log(error);
    }
  };

  const follow = async (userId) => {
    try {
      setIsLoading(true);
      const { data: result } = await userApi.follow(userId, authUser._id);
      console.log(result.users);
      saveAuthUserToStorage(result.users.updatedFollowingUser);
      setAuthUser(result.users.updatedFollowingUser);
      setUser(result.users.updatedFollowedUser);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return {
    getUser,
    editProfile,
    setUsername,
    setProfileImage,
    setBio,
    setLanguages,
    setComment,
    follow,
    user,
    isLoading,
    username,
    profileImage,
    bio,
    languages,
    comment,
  };
};

export default useUser;
