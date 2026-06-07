import React from 'react';
import TerminalAIMonitoring from './TerminalAIMonitoring';
import AdminAIMonitoring from './AdminAIMonitoring';

export default function AIMonitoringPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalAIMonitoring />;
  }

  return <AdminAIMonitoring />;
}
