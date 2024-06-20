import React from "react";
import styled from "styled-components";

const Avatar = ({ src, className }) => {
  return <Icon src={src} className={className} />;
};

export default Avatar;

const Icon = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;
