import React from "react";
import TerminalHeader from "./TerminalHeader";
import AdminHeader from "./AdminHeader";

const Header = () => {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalHeader />;
  }

  return <AdminHeader />;
};

export default Header;
