import React from "react";
import ParentHeader from "./ParentHeader";
import ChildHeader from "./ChildHeader";

const Header = () => {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentHeader />;
  }

  return <ChildHeader />;
};

export default Header;

