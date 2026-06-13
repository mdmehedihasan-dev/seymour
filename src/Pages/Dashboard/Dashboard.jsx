import ParentDashboard from './ParentDashboard';
import ChildDashboard from './ChildDashboard';

export default function Dashboard() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentDashboard />;
  }

  return <ChildDashboard />;
}

