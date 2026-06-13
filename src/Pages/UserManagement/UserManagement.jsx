import React from 'react';
import ParentUserManagement from './ParentUserManagement';
import DaycareUserManagement from './DaycareUserManagement';

export default function UserManagementPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentUserManagement />;
  }

  return <DaycareUserManagement />;
}

