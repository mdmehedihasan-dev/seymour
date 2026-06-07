import React from 'react';
import TerminalReports from './TerminalReports';
import AdminReports from './AdminReports';

export default function ReportsPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalReports />;
  }

  return <AdminReports />;
}
