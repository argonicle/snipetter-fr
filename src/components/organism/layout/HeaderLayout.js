import React from "react";
import styled from "styled-components";
import { FONT } from "../../../const/style/font";
import { COLOR } from "../../../const/style/color";
import useAuthUser from "../../../hooks/useAuthUser";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";

const HeaderLayout = ({ children }) => {
  const { authUser } = useAuthUser();

  return (
    <Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <HeaderAppLogo>Snippetter</HeaderAppLogo>
        <Link to={authUser && `/home/profile/${authUser._id}`}>
          <SAvatar
            src={
              process.env.REACT_APP_BACKEND_ORIGIN +
              (authUser?.profileImage || "noAvatar.png")
            }
          ></SAvatar>
        </Link>
      </div>
      {children}
    </Header>
  );
};

export default HeaderLayout;

const Header = styled.div`
  padding: 30px 0;
  width: 100%;
  background-color: rgb(255, 255, 255);
  position: fixed;
  z-index: 10;
`;

const HeaderAppLogo = styled.h1`
  font-family: ${FONT.POP};
  color: ${COLOR.GREY};
  margin-bottom: 20px;
  font-size: 20px;
`;

const SAvatar = styled(Avatar)`
  position: absolute;
  right: 40px;
  height: 40px;
  width: 40px;
`;
