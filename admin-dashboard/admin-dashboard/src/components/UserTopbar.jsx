import React, { useState } from "react";
import "./UserTopbar.css";

const UserTopbar = () => {
  const [notifications] = useState(3);

  return (
    <div className="user-topbar">
      <div className="topbar-left">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="topbar-right">
        <div className="notification-bell">
          <span className="bell-icon">🔔</span>
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </div>
        <div className="user-menu">
          <div className="user-avatar">JD</div>
          <div className="user-info">
            <div className="user-name">John Doe</div>
            <div className="user-plan">Premium Plan</div>
          </div>
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>
    </div>
  );
};

export default UserTopbar;


