import React from 'react';
import TerminalUserManagement from './TerminalUserManagement';
import AdminUserManagement from './AdminUserManagement';

export default function UserManagementPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalUserManagement />;
  }

  return <AdminUserManagement />;
}
