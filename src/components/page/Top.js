import React from "react";
import styled from "styled-components";
import { Navigate, Outlet } from "react-router-dom";

import { FONT } from "../../const/style/font";
import TopHeader from "../organism/header/TopHeader";
import { getAuthUserFromStorage } from "../../util/authUser";

const TopImage = process.env.REACT_APP_FRONTEND_ORIGIN + "app-image.jpg";

const Top = () => {
  const authUser = getAuthUserFromStorage();
  if (authUser) {
    return <Navigate to="/home/timeline" />;
  } else {
    return (
      <Container>
        <TopHeader />

        <Main>
          <AppImg>
            <AppImgFilter>
              <AppImgContents>Let's Share Your Snippet</AppImgContents>
            </AppImgFilter>
          </AppImg>

          <Login id="login">
            <Outlet />
          </Login>
        </Main>
      </Container>
    );
  }
};

export default Top;

const Container = styled.div``;

const Main = styled.div``;

const AppImg = styled.div`
  background-image: url(${TopImage});
  background-position: center;
  background-size: cover;
  height: 400px;
`;

const AppImgFilter = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 400px;
`;

const AppImgContents = styled.h2`
  text-align: center;
  color: white;
  line-height: 400px;
  font-family: ${FONT.STYLISH};
  font-style: italic;
`;

const Login = styled.div`
  background-color: rgb(228, 228, 228);
  height: 400px;
  position: relative;
`;
