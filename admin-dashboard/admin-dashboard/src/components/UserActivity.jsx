import React, { useState } from "react";
import "./UserActivity.css";

const UserActivity = () => {
  const [activities] = useState([
    { id: 1, userId: 1, userName: "User1", action: "Login", timestamp: "2024-01-15 09:30:00", details: "User logged in successfully", ipAddress: "192.168.1.100" },
    { id: 2, userId: 2, userName: "User2", action: "Logout", timestamp: "2024-01-15 10:15:00", details: "User logged out", ipAddress: "192.168.1.101" },
    { id: 3, userId: 4, userName: "User4", action: "Plan Change", timestamp: "2024-01-15 11:20:00", details: "Upgraded to Premium Plan", ipAddress: "192.168.1.103" },
    { id: 4, userId: 5, userName: "User5", action: "Payment", timestamp: "2024-01-15 12:45:00", details: "Monthly payment processed - $39.99", ipAddress: "192.168.1.104" },
    { id: 5, userId: 7, userName: "User7", action: "Login", timestamp: "2024-01-15 14:10:00", details: "User logged in successfully", ipAddress: "192.168.1.106" },
    { id: 6, userId: 9, userName: "User9", action: "Data Usage", timestamp: "2024-01-15 15:30:00", details: "Reached 80% of monthly limit (16GB/20GB)", ipAddress: "192.168.1.108" },
    { id: 7, userId: 12, userName: "User12", action: "Support", timestamp: "2024-01-15 16:00:00", details: "Contacted support for billing inquiry", ipAddress: "192.168.1.111" },
    { id: 8, userId: 16, userName: "User16", action: "Plan Change", timestamp: "2024-01-15 17:15:00", details: "Downgraded to Basic Plan", ipAddress: "192.168.1.115" },
    { id: 9, userId: 20, userName: "User20", action: "Login", timestamp: "2024-01-15 18:30:00", details: "User logged in successfully", ipAddress: "192.168.1.119" },
    { id: 10, userId: 22, userName: "User22", action: "Payment", timestamp: "2024-01-15 19:45:00", details: "Annual payment processed - $479.88", ipAddress: "192.168.1.121" },
    { id: 11, userId: 1, userName: "User1", action: "Data Download", timestamp: "2024-01-15 20:15:00", details: "Downloaded 2.5GB of data", ipAddress: "192.168.1.100" },
    { id: 12, userId: 4, userName: "User4", action: "Settings Change", timestamp: "2024-01-15 21:00:00", details: "Updated notification preferences", ipAddress: "192.168.1.103" },
    { id: 13, userId: 7, userName: "User7", action: "Logout", timestamp: "2024-01-15 21:30:00", details: "User logged out", ipAddress: "192.168.1.106" },
    { id: 14, userId: 9, userName: "User9", action: "Support", timestamp: "2024-01-15 22:00:00", details: "Submitted support ticket #12345", ipAddress: "192.168.1.108" },
    { id: 15, userId: 12, userName: "User12", action: "Data Usage", timestamp: "2024-01-15 22:30:00", details: "Reached 90% of monthly limit (18GB/20GB)", ipAddress: "192.168.1.111" }
  ]);

  const [filters, setFilters] = useState({
    action: "all",
    user: "",
    dateRange: "today"
  });

  const filteredActivities = activities.filter(activity => {
    const matchesAction = filters.action === "all" || activity.action === filters.action;
    const matchesUser = filters.user === "" || 
      activity.userName.toLowerCase().includes(filters.user.toLowerCase()) ||
      activity.userId.toString().includes(filters.user);
    
    let matchesDate = true;
    if (filters.dateRange === "today") {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = activity.timestamp.startsWith(today);
    } else if (filters.dateRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = new Date(activity.timestamp) >= weekAgo;
    }
    
    return matchesAction && matchesUser && matchesDate;
  });

  const getActionIcon = (action) => {
    const icons = {
      "Login": "🔐",
      "Logout": "🚪",
      "Plan Change": "🔄",
      "Payment": "💳",
      "Data Usage": "📊",
      "Support": "🎧",
      "Data Download": "⬇️",
      "Settings Change": "⚙️"
    };
    return icons[action] || "📝";
  };

  const getActionColor = (action) => {
    const colors = {
      "Login": "#10b981",
      "Logout": "#6b7280",
      "Plan Change": "#3b82f6",
      "Payment": "#059669",
      "Data Usage": "#f59e0b",
      "Support": "#8b5cf6",
      "Data Download": "#06b6d4",
      "Settings Change": "#64748b"
    };
    return colors[action] || "#6b7280";
  };

  const getActivityStats = () => {
    const total = activities.length;
    const today = activities.filter(a => a.timestamp.startsWith(new Date().toISOString().split('T')[0])).length;
    const logins = activities.filter(a => a.action === "Login").length;
    const payments = activities.filter(a => a.action === "Payment").length;
    
    return { total, today, logins, payments };
  };

  const stats = getActivityStats();

  return (
    <div className="user-activity">
      <div className="activity-header">
        <h2>User Activity Monitor</h2>
        <div className="activity-stats">
          <div className="stat-card">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Activities</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.today}</span>
            <span className="stat-label">Today</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.logins}</span>
            <span className="stat-label">Logins</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.payments}</span>
            <span className="stat-label">Payments</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Action Type:</label>
          <select 
            value={filters.action} 
            onChange={(e) => setFilters({...filters, action: e.target.value})}
          >
            <option value="all">All Actions</option>
            <option value="Login">Login</option>
            <option value="Logout">Logout</option>
            <option value="Plan Change">Plan Change</option>
            <option value="Payment">Payment</option>
            <option value="Data Usage">Data Usage</option>
            <option value="Support">Support</option>
            <option value="Data Download">Data Download</option>
            <option value="Settings Change">Settings Change</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>User:</label>
          <input 
            type="text" 
            placeholder="Search by user name or ID..."
            value={filters.user}
            onChange={(e) => setFilters({...filters, user: e.target.value})}
          />
        </div>
        
        <div className="filter-group">
          <label>Date Range:</label>
          <select 
            value={filters.dateRange} 
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      <div className="activities-list">
        {filteredActivities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon" style={{ backgroundColor: getActionColor(activity.action) + '20' }}>
              <span style={{ color: getActionColor(activity.action) }}>
                {getActionIcon(activity.action)}
              </span>
            </div>
            
            <div className="activity-content">
              <div className="activity-header">
                <h4>{activity.action}</h4>
                <span className="activity-time">{activity.timestamp}</span>
              </div>
              
              <div className="activity-details">
                <div className="user-info">
                  <span className="user-name">{activity.userName}</span>
                  <span className="user-id">#{activity.userId}</span>
                </div>
                <p className="activity-description">{activity.details}</p>
                <div className="activity-meta">
                  <span className="ip-address">IP: {activity.ipAddress}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredActivities.length === 0 && (
          <div className="no-activities">
            <p>No activities found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserActivity;