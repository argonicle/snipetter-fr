import React from "react";

import HeaderLayout from "../layout/HeaderLayout";
import HomeNav from "../../molecule/HomeNav";

const HomeHeader = () => {
  return (
    <>
      <HeaderLayout>
        <HomeNav />
      </HeaderLayout>
    </>
  );
};

export default HomeHeader;
