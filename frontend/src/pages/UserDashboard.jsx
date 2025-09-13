// UserDashboard.jsx
import "../index.css";

export default function UserDashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>User Dashboard</h2>
        <nav>
          <a href="/user/dashboard">🏠 Home</a>
          <a href="/user/plans">📦 Browse Plans</a>
          <a href="/user/subscriptions">📜 My Subscriptions</a>
          <a href="/user/billing">💳 Billing</a>
          <a href="/user/recommendations">✨ Recommendations</a>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Welcome back, Akash 👋</h1>
        <div className="cards">
          <div className="card">
            <h2>Active Plan</h2>
            <p>Fibernet 200 Mbps</p>
            <p>₹999 / month</p>
            <p className="valid">Valid till: 30th Sep 2025</p>
            <button>Manage Plan</button>
          </div>

          <div className="card">
            <h2>Data Usage</h2>
            <p>120 GB / 200 GB used</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "60%" }}></div>
            </div>
            <p className="note">40% data remaining</p>
          </div>

          <div className="card">
            <h2>Available Offers</h2>
            <ul>
              <li>🔥 10% off on yearly plan upgrade</li>
              <li>🎁 Free 50GB add-on this month</li>
            </ul>
            <button className="offer-btn">View All Offers</button>
          </div>
        </div>
      </main>
    </div>
  );
}
