import ParentDashboard from './ParentDashboard';
import DaycareDashboard from './DaycareDashboard';

export default function Dashboard() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <ParentDashboard />;
  }

  return <DaycareDashboard />;
}

