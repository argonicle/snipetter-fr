import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import styled from "styled-components";

import HomeHeader from "../organism/header/HomeHeader";
import { COLOR } from "../../const/style/color";
import useAuthUser from "../../hooks/useAuthUser";

const Home = () => {
  const { authUser } = useAuthUser();

  if (!authUser) {
    return <Navigate to="/" />;
  }
  return (
    <HomeContainer>
      <HomeHeader />
      <Outlet />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  background-color: ${COLOR.LIGHT_GREY};
  min-height: 100vh;
`;
