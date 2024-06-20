import React from "react";
import styled from "styled-components";
import { Input, Button } from "@chakra-ui/react";

import AuthBoxLayout from "../layout/AuthBoxLayout";
import useSignup from "../../../hooks/useSignup";

const SignupBox = () => {
  const {
    handleSignup,
    setEmail,
    setPassword,
    setConfirmPassword,
    email,
    password,
    confirmPassword,
    error,
    isLoading,
  } = useSignup();

  return (
    <AuthBoxLayout>
      <Input
        isInvalid={error.email !== undefined}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isDisabled={isLoading}
        focusBorderColor="gray.400"
        placeholder="Enter Email"
        width="80%"
        height="12%"
        m="3% 0"
      />
      <Input
        isInvalid={error.password !== undefined}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isDisabled={isLoading}
        focusBorderColor="gray.400"
        placeholder="Enter Password"
        width="80%"
        height="12%"
        type="password"
        m="3% 0"
      />
      <Input
        isInvalid={error.confirmPassword !== undefined}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        isDisabled={isLoading}
        focusBorderColor="gray.400"
        placeholder="Enter Confirm Password"
        width="80%"
        height="12%"
        type="password"
        m="3% 0"
      />
      <Button
        display="block"
        color="gray"
        m="3% auto"
        onClick={handleSignup}
        isLoading={isLoading}
      >
        Signup
      </Button>
    </AuthBoxLayout>
  );
};

export default SignupBox;
