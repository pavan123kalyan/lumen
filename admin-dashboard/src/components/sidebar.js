import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>Dashboard</li>
        <li>Manage Plans</li>
        <li>Users</li>
        <li>Analytics</li>
        <li>Discounts</li>
      </ul>
    </div>
  );
};

export default Sidebar;
