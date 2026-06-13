import React from 'react';
import ParentChildren from './ParentChildren';
import DaycareChildren from './DaycareChildren';

export default function ChildrenPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentChildren />;
  }

  return <DaycareChildren />;
}

