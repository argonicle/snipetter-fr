import React from "react";

import HeaderLayout from "../layout/HeaderLayout";
import TopNav from "../../molecule/TopNav";

const TopHeader = () => {
  return (
    <>
      <HeaderLayout>
        <TopNav />
      </HeaderLayout>
      <div id="top" style={{ backgroundColor: "white", height: "133px" }}></div>
    </>
  );
};

export default TopHeader;
