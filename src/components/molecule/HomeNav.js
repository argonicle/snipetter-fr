import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { COLOR } from "../../const/style/color";
import useLogout from "../../hooks/useLogout";
import useAuthUser from "../../hooks/useAuthUser";

const HomeNav = () => {
  const { handleLogout } = useLogout();
  const { authUser } = useAuthUser();
  const { pathname } = useLocation();
  const [isTimeline, setIsTimeline] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    setIsTimeline(false);
    setIsPost(false);
    setIsProfile(false);

    if (pathname.includes("timeline")) {
      setIsTimeline(true);
    } else if (pathname.includes("post")) {
      setIsPost(true);
    } else if (pathname.includes("profile")) {
      setIsProfile(true);
    }
  }, [pathname]);

  return (
    <NavBar>
      <NavItem>
        <NavTimeline isTimeline={isTimeline}>
          <Link to="/home/timeline">TIMELINE</Link>
        </NavTimeline>
      </NavItem>
      <NavItem>
        <NavPost isPost={isPost}>
          <Link to="/home/post">POST</Link>
        </NavPost>
      </NavItem>
      <NavItem>
        <NavProfile isProfile={isProfile}>
          <Link to={`/home/profile/${authUser._id}`}>PROFILE</Link>
        </NavProfile>
      </NavItem>
      <NavItem>
        <NavLink onClick={handleLogout}>LOGOUT</NavLink>
      </NavItem>
    </NavBar>
  );
};

export default HomeNav;

const NavBar = styled.ul`
  display: flex;
  justify-content: center;
`;
const NavItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled.div`
  color: ${COLOR.LIGHT_GREY};
  font-size: 0.8em;
  display: inline;
  cursor: pointer;

  &:hover {
    color: ${COLOR.GREY};
    text-decoration: underline;
  }
`;

const NavTimeline = styled(NavLink)`
  color: ${(props) => props.isTimeline && COLOR.GREY};
  text-decoration: ${(props) => props.isTimeline && "underline"};
`;

const NavPost = styled(NavLink)`
  color: ${(props) => props.isPost && COLOR.GREY};
  text-decoration: ${(props) => props.isPost && "underline"};
`;

const NavProfile = styled(NavLink)`
  color: ${(props) => props.isProfile && COLOR.GREY};
  text-decoration: ${(props) => props.isProfile && "underline"};
`;
