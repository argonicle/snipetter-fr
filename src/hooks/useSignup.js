import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import authApi from "../api/authApi";
import { saveAuthUserToStorage } from "../util/authUser";
import useAuthUser from "./useAuthUser";

const useSignup = () => {
  const { setAuthUser } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    const newError = validateSignupInput(email, password, confirmPassword);
    if (Object.keys(newError).length > 0) {
      const emailErrMsg = newError.email ?? "";
      const passwordErrMsg = newError.password ?? "";
      const confirmErrMsg = newError.confirmPassword ?? "";
      const errorMsg = `${emailErrMsg}\n${passwordErrMsg}\n${confirmErrMsg}`;
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
      const signupInput = { email, password, confirmPassword };
      const { data: result } = await authApi.signup(signupInput);
      saveAuthUserToStorage(result.user);
      setAuthUser(result.user);

      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      const newError = handleSignupError(error.response);
      console.log(error);
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

  const validateSignupInput = (email, password, confirmPassword) => {
    const newError = {};
    if (!email) {
      newError.email = "Please enter your email";
    }
    if (!password) {
      newError.password = "Please enter your password";
    }
    if (!confirmPassword) {
      newError.confirmPassword = "Please enter your confirm password";
    } else if (password !== confirmPassword) {
      newError.confirmPassword = "Password does not match";
    }
    return newError;
  };

  const handleSignupError = (error) => {
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
    handleSignup,
    setEmail,
    setPassword,
    setConfirmPassword,
    email,
    password,
    confirmPassword,
    isLoading,
    error,
  };
};

export default useSignup;
