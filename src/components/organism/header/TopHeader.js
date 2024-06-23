import React from "react";

import HeaderLayout from "../layout/HeaderLayout";
import TopNav from "../../molecule/TopNav";

const TopHeader = () => {
  return (
    <>
      <HeaderLayout>
        <TopNav />
      </HeaderLayout>
    </>
  );
};

export default TopHeader;
