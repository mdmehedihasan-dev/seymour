import React from 'react';
import TerminalChildren from './TerminalChildren';
import AdminChildren from './AdminChildren';

export default function ChildrenPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalChildren />;
  }

  return <AdminChildren />;
}
