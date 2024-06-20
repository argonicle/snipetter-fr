import React from "react";
import { Menu, MenuButton, MenuList, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const HamburgerMenu = ({ children }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
