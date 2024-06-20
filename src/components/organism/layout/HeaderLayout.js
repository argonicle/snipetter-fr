import React from "react";
import styled from "styled-components";
import { FONT } from "../../../const/style/font";
import { COLOR } from "../../../const/style/color";
import Avatar from "../../atom/Avatar";
import useAuthUser from "../../../hooks/useAuthUser";

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
        <SAvatar
          src={
            process.env.REACT_APP_BACKEND_ORIGIN +
            (authUser?.profileImage || "noAvatar.png")
          }
        ></SAvatar>
      </div>
      {children}
    </Header>
  );
};

export default HeaderLayout;

const Header = styled.div`
  padding: 30px 0;
  position: fixed;
  width: 100%;
  background-color: rgb(255, 255, 255);
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
`;
