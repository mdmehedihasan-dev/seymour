import React from 'react';
import ParentObservations from './ParentObservations';
import ChildObservations from './ChildObservations';

export default function ObservationsPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentObservations />;
  }

  return <ChildObservations />;
}

