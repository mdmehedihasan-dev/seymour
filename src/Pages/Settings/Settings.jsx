import React from 'react';
import TerminalSettings from './TerminalSettings';
import AdminSettings from './AdminSettings';

export default function SettingsPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalSettings />;
  }

  return <AdminSettings />;
}
