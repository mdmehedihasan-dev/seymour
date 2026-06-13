import React from 'react';
import ParentReports from './ParentReports';
import ChildReports from './ChildReports';

export default function ReportsPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentReports />;
  }

  return <ChildReports />;
}

