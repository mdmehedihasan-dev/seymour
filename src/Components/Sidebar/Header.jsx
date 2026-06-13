import React from "react";
import ParentHeader from "./ParentHeader";
import DaycareHeader from "./DaycareHeader";

const Header = () => {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentHeader />;
  }

  return <DaycareHeader />;
};

export default Header;

