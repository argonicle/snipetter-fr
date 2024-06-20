import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import authApi from "../api/authApi";
import { saveAuthUserToStorage } from "../util/authUser";
import useAuthUser from "./useAuthUser";

const useLogin = () => {
  const { setAuthUser } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    const newError = validateLoginInput(email, password);
    if (Object.keys(newError).length > 0) {
      const emailErrMsg = newError.email ?? "";
      const passwordErrMsg = newError.password ?? "";
      const errorMsg = `${emailErrMsg}\n${passwordErrMsg}`;
      toast({
        title: "Failed.",
        description: errorMsg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return setError(newError);
    } else {
      setError({});
    }

    try {
      setIsLoading(true);
      const loginInput = { email, password };
      const { data: result } = await authApi.login(loginInput);
      saveAuthUserToStorage(result.user);
      setAuthUser(result.user);
      toast({
        title: "Success.",
        description: "Enjoy snippetter",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      navigate("/home/timeline");
    } catch (error) {
      const newError = handleLoginError(error.response);
      setError(newError);
      toast({
        title: "Failed.",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    }
  };

  const validateLoginInput = (email, password) => {
    const newError = {};
    if (!email) {
      newError.email = "Please enter your email";
    }
    if (!password) {
      newError.password = "Please enter your password";
    }
    return newError;
  };

  const handleLoginError = (error) => {
    const newError = {};
    if (error.statusCode === 404) {
      newError.email = error.message;
    }
    if (error.statusCode === 401) {
      newError.password = error.message;
    }
    return newError;
  };

  return {
    handleLogin,
    setEmail,
    setPassword,
    email,
    password,
    isLoading,
    error,
  };
};

export default useLogin;
