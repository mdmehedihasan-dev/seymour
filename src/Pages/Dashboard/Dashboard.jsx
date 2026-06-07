import TerminalDashboard from './TerminalDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const role = localStorage.getItem("role") || "terminal";

  if (role === "terminal") {
    return <TerminalDashboard />;
  }

  return <AdminDashboard />;
}
