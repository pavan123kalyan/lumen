import React from "react";
import "./topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <h3>Welcome, Admin</h3>
      <div className="topbar-right">
        <span>Notifications</span>
        <span>Profile</span>
      </div>
    </div>
  );
};

export default Topbar;
