import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthBoxLayout = ({ children, login }) => {
  return (
    <Box>
      {login ? (
        <h3
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "1.2rem",
          }}
        >
          Login
        </h3>
      ) : (
        <h3
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "1.2rem",
          }}
        >
          Signup
        </h3>
      )}
      {children}
      {login ? (
        <p style={{ fontSize: "0.8em", marginTop: "10px" }}>
          アカウントをお持ちでない方は
          <AuthNav
            to="/signup"
            style={{ textDecoration: "underLine", fontStyle: "oblique" }}
          >
            こちら
          </AuthNav>
        </p>
      ) : (
        <p style={{ fontSize: "0.8em" }}>
          すでにアカウントをお持ちの方は
          <AuthNav
            to="/"
            style={{ textDecoration: "underLine", fontStyle: "oblique" }}
          >
            こちら
          </AuthNav>
        </p>
      )}
    </Box>
  );
};

export default AuthBoxLayout;

const Box = styled.div`
  min-height: 70%;
  width: 70%;
  max-width: 300px;
  background-color: white;
  box-shadow: 13px 5px 27px -3px #777777;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
`;

const AuthNav = styled(Link)`
  text-decoration: underline;
  font-style: oblique;

  &:hover {
    opacity: 0.5;
  }
`;
