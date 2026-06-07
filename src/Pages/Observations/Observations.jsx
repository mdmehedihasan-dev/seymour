import React from 'react';
import TerminalObservations from './TerminalObservations';
import AdminObservations from './AdminObservations';

export default function ObservationsPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalObservations />;
  }

  return <AdminObservations />;
}
