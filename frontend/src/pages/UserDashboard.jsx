import { useNavigate } from "react-router-dom";
import "../index.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>User Dashboard</h1>
      <div className="menu">
        <button>Browse Plans</button>
        <button>My Subscriptions</button>
        <button>Billing History</button>
        <button>Recommendation & Offer</button>
      </div>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}
