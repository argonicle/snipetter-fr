import React from "react";
import styled from "styled-components";
import { COLOR } from "../../const/style/color";

const TopNav = () => {
  return (
    <NavBar>
      <NavItem>
        <NavLink href="#top">Top</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#login">LOGIN</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#about">ABOUT</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#features">FEATURES</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#support">SUPPORT</NavLink>
      </NavItem>
    </NavBar>
  );
};

export default TopNav;

const NavBar = styled.ul`
  display: flex;
  justify-content: center;
`;
const NavItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled.a`
  color: ${COLOR.LIGHT_GREY};
  font-size: 0.8em;
  display: inline;
  cursor: pointer;

  &:hover {
    color: ${COLOR.GREY};
    text-decoration: underline;
  }
`;
