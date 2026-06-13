import React from 'react';
import ParentAIMonitoring from './ParentAIMonitoring';
import DaycareAIMonitoring from './DaycareAIMonitoring';

export default function AIMonitoringPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentAIMonitoring />;
  }

  return <DaycareAIMonitoring />;
}

