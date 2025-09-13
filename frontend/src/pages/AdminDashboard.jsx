// AdminDashboard.jsx
import "../index.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <a href="/admin/dashboard">📊 Overview</a>
          <a href="/admin/plans">📦 Manage Plans</a>
          <a href="/admin/users">👥 Manage Users</a>
          <a href="/admin/logs">📝 Audit Logs</a>
          <a href="/admin/billing">💳 Billing Report</a>
          <a href="/admin/discounts">🎁 Discounts</a>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Welcome Admin 👩‍💻</h1>
        <div className="cards">
          <div className="card">
            <h2>Top Plans</h2>
            <p>Fibernet 200 Mbps – 120 users</p>
            <p>Broadband Copper – 45 users</p>
          </div>

          <div className="card">
            <h2>Subscriptions</h2>
            <p>Active: 165</p>
            <p>Cancelled: 12</p>
          </div>

          <div className="card">
            <h2>Revenue</h2>
            <p>₹1,20,000 this month</p>
            <button>View Reports</button>
          </div>
        </div>
      </main>
    </div>
  );
}
