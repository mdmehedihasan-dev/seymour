import React from 'react';
import ParentSettings from './ParentSettings';
import DaycareSettings from './DaycareSettings';

export default function SettingsPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentSettings />;
  }

  return <DaycareSettings />;
}

