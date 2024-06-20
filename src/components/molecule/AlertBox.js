import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import styled from "styled-components";

const AlertBox = ({ status, title, description }) => {
  return (
    <SAlert status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </SAlert>
  );
};

export default AlertBox;

const SAlert = styled(Alert)`
  margin: 5% auto;
  width: 80%;
  max-width: 300px;
  border-radius: 10px;
`;
