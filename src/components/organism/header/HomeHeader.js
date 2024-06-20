import React from "react";

import HeaderLayout from "../layout/HeaderLayout";
import HomeNav from "../../molecule/HomeNav";

const HomeHeader = () => {
  return (
    <>
      <HeaderLayout>
        <HomeNav />
      </HeaderLayout>
      <div id="top" style={{ backgroundColor: "white", height: "133px" }}></div>
    </>
  );
};

export default HomeHeader;
