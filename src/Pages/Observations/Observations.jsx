import React from 'react';
import ParentObservations from './ParentObservations';
import DaycareObservations from './DaycareObservations';

export default function ObservationsPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentObservations />;
  }

  return <DaycareObservations />;
}

