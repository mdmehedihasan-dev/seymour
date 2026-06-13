import React from 'react';
import ParentChildren from './ParentChildren';
import ChildChildren from './ChildChildren';

export default function ChildrenPage() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentChildren />;
  }

  return <ChildChildren />;
}

