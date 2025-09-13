import { useNavigate } from "react-router-dom";
import "../index.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="menu">
        <button>Manage Plans</button>
        <button>Manage Users</button>
        <button>Audit Logs</button>
        <button>Billing Report</button>
        <button>Discount Management</button>
      </div>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}
