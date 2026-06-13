import React from "react";
import ParentSidebar from "./ParentSidebar";
import DaycareSidebar from "./DaycareSidebar";

const Sidebar = ({ closeDrawer }) => {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentSidebar closeDrawer={closeDrawer} />;
  }

  return <DaycareSidebar closeDrawer={closeDrawer} />;
};

export default Sidebar;

