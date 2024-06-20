import React from "react";
import styled from "styled-components";

const BoxLayout = ({ children, className }) => {
  return (
    <BoxLayoutContainer className={className}>{children}</BoxLayoutContainer>
  );
};

export default BoxLayout;

const BoxLayoutContainer = styled.div`
  background-color: white;
  width: 90%;
  min-height: 100px;
  margin: 0 auto;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.8rem;
`;
