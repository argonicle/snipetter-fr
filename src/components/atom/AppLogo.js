import React from "react";
import styled from "styled-components";
import { FONT } from "../../const/style/font";
import { COLOR } from "../../const/style/color";

const AppLogo = ({ children }) => {
  return <Box>{children}</Box>;
};

export default AppLogo;

const Box = styled.h1`
  font-family: ${FONT.POP};
  color: ${COLOR.GREY};
`;
