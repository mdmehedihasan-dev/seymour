import React from "react";
import TerminalSidebar from "./TerminalSidebar";
import AdminSidebar from "./AdminSidebar";

const Sidebar = ({ closeDrawer }) => {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalSidebar closeDrawer={closeDrawer} />;
  }

  return <AdminSidebar closeDrawer={closeDrawer} />;
};

export default Sidebar;
