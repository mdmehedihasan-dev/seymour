import React from "react";
import ParentHeader from "./ParentHeader";
import DaycareHeader from "./DaycareHeader";

const Header = ({ showDrawer }) => {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentHeader showDrawer={showDrawer} />;
  }

  return <DaycareHeader showDrawer={showDrawer} />;
};

export default Header;

