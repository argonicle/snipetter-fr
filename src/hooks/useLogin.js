import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authApi from "../api/authApi";
import { saveAuthUserToStorage } from "../util/authUser";
import useAuthUser from "./useAuthUser";
import useMessage from "./useMessage";

const useLogin = () => {
  const { setAuthUser } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const handleLogin = async (e) => {
    e.preventDefault();
    const newError = validateLoginInput(email, password);
    if (Object.keys(newError).length > 0) {
      const emailErrMsg = newError.email ?? "";
      const passwordErrMsg = newError.password ?? "";
      const errorMsg = `${emailErrMsg}\n${passwordErrMsg}`;
      showMessage("Failed.", errorMsg, "error");
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
      showMessage("Success.", "Enjoy snippetter", "success");
      setIsLoading(false);
      navigate("/home/timeline");
    } catch (error) {
      const newError = handleLoginError(error.response);
      setError(newError);
      showMessage("Failed.", error.response.data.message, "error");
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
