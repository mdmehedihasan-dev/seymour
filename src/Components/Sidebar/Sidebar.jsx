import React from "react";
import ParentSidebar from "./ParentSidebar";
import ChildSidebar from "./ChildSidebar";

const Sidebar = ({ closeDrawer }) => {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentSidebar closeDrawer={closeDrawer} />;
  }

  return <ChildSidebar closeDrawer={closeDrawer} />;
};

export default Sidebar;

