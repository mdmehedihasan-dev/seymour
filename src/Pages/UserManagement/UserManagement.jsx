import React from 'react';
import ParentUserManagement from './ParentUserManagement';
import ChildUserManagement from './ChildUserManagement';

export default function UserManagementPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentUserManagement />;
  }

  return <ChildUserManagement />;
}

