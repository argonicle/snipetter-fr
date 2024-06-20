import React from "react";
import { Input, Button } from "@chakra-ui/react";

import AuthBoxLayout from "../layout/AuthBoxLayout";
import useLogin from "../../../hooks/useLogin";

const LoginBox = () => {
  const {
    handleLogin,
    setEmail,
    setPassword,
    email,
    password,
    error,
    isLoading,
  } = useLogin();

  return (
    <AuthBoxLayout login>
      <Input
        isInvalid={error.email !== undefined}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isDisabled={isLoading}
        focusBorderColor="gray.400"
        placeholder="Enter Email"
        width="80%"
        m="5% 0"
      />
      <Input
        isInvalid={error.password !== undefined}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isDisabled={isLoading}
        focusBorderColor="gray.400"
        placeholder="Enter Password"
        width="80%"
        m="5% 0"
        type="password"
      />
      <Button
        color="gray"
        display="block"
        m="0 auto"
        onClick={handleLogin}
        isLoading={isLoading}
      >
        Login
      </Button>
    </AuthBoxLayout>
  );
};

export default LoginBox;
