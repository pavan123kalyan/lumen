import React from "react";
import "./UserSidebar.css";

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <div className="sidebar-header">
        <h2>Lumen</h2>
        <span className="user-badge">User</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <span className="nav-icon">📊</span>
            Dashboard
          </li>
          <li className="nav-item">
            <span className="nav-icon">📋</span>
            My Plans
          </li>
          <li className="nav-item">
            <span className="nav-icon">📈</span>
            Usage Analytics
          </li>
          <li className="nav-item">
            <span className="nav-icon">⚙️</span>
            Settings
          </li>
          <li className="nav-item">
            <span className="nav-icon">💳</span>
            Billing
          </li>
          <li className="nav-item">
            <span className="nav-icon">📞</span>
            Support
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="profile-avatar">JD</div>
          <div className="profile-info">
            <div className="profile-name">John Doe</div>
            <div className="profile-email">john.doe@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;


